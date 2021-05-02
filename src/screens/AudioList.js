/*

Try to change recyclerlistview to FlatList

*/


import React, { Component } from 'react';
import { Text, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import styles from '../styles/styles';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/AudioController';
import { storeAudio } from '../misc/Helper';

export default class AudioList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
        this.currentItem = {}
    }

    static contextType = AudioContext;

    layoutProvider = new LayoutProvider((i) => "audio", (type, dimension) => {
        switch (type) {
            case "audio":
                dimension.width = Dimensions.get("window").width;
                dimension.height = 70;
                break;
            default:
                dimension.height = 0;
                dimension.width = 0;
        }
    })

    // onPlaybackStatusUpdate = async (playbackStatus) => {
    //     if (playbackStatus.isLoaded && playbackStatus.isPlaying) {}
    //     this.context.updateState(this.context, {
    //         playbackPosition: playbackStatus.positionMillis,
    //         playbackDuration: playbackStatus.durationMillis,
    //     });

    //     if (playbackStatus.didJustFinish) {
    //         const nextAudioIndex = this.context.currentAudioIndex + 1;
    //         if (nextAudioIndex >= this.context.totalCount) {
    //             this.context.playback.unloadAsync();
    //             this.context.updateState(this.context, {
    //                 sound: null,
    //                 currentAudio: this.context.audio_files[0],
    //                 isPlaying: false,
    //                 currentAudioIndex: 0,
    //                 playbackPosition: null,
    //                 playbackDuration: null,
    //             })
    //             return await storeAudio(this.context.audio_files[0], 0);
    //         }
    //         const audio = this.context.audio_files[nextAudioIndex];
    //         const status = await playNext(this.context.playback, audio.uri)
    //         this.context.updateState(this.context, {
    //             sound: status,
    //             currentAudio: audio,
    //             isPlaying: true,
    //             currentAudioIndex: nextAudioIndex,
    //         })
    //         await storeAudio(audio, nextAudioIndex);
    //     }
    // }

    handleAudio = async (audio) => {
        const {sound, playback, currentAudio, updateState, audio_files} = this.context;
        if (sound === null) {
            const playback = new Audio.Sound();
            const status = await play(playback, audio.uri);
            const index = audio_files.indexOf(audio);
            updateState( this.context, {
                currentAudio: audio, playback: playback, 
                sound: status, isPlaying: true,
                currentAudioIndex: index,
            });
            playback.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate);
            return storeAudio(audio, index);
        }

        if (sound.isLoaded && sound.isPlaying && currentAudio.id === audio.id) {
            const status = await pause(playback);
            return updateState( this.context, {
                sound: status, isPlaying: false 
            });
        }

        if (sound.isLoaded && !sound.isPlaying && currentAudio.id === audio.id) {
            const status = await resume(playback);
            return updateState(this.context, {
                sound: status, isPlaying: true 
            });
        }

        if (sound.isLoaded && currentAudio.id !== audio.id) {
            const status = await playNext(playback, audio.uri);
            const index = audio_files.indexOf(audio);
            updateState(this.context, {
                currentAudio: audio, sound: status, 
                isPlaying: true, currentAudioIndex: index
            });
            return storeAudio(audio, index);
        }
    }

    componentDidMount() {
        this.context.loadPreviousAudio();
    }

    rowRenderer = (type, item, index, extendedState) => {
        return (
            <AudioListItem
                title={item.filename} duration={item.duration}
                isPlaying={extendedState.isPlaying}
                activeListItem={this.context.currentAudioIndex === index}
                audio_press={() => this.handleAudio(item)}
                options={() => {
                    this.currentItem = item;
                    this.setState({ ...this.state, modalVisible: true })
                }}
            />
        )
    }

    render() {
        return (
            <AudioContext.Consumer>
                {({ data_provider, isPlaying }) => {
                    if (!(data_provider._data.length)) return null;
                    return (
                        <Screen style={styles.wrapper}>
                            <RecyclerListView dataProvider={data_provider}
                                layoutProvider={this.layoutProvider}
                                rowRenderer={this.rowRenderer} 
                                extendedState={{isPlaying}} />
                            <OptionModal
                                onPlay={ () => {} }
                                onPlaylist={ () => {
                                    this.context.updateState(this.context, {
                                        addToPlaylist: this.currentItem,
                                    });
                                    this.props.navigation.navigate('')} }
                                currentItem={this.currentItem}
                                closeModal={() => this.setState({ ...this.state, modalVisible: false })} 
                                visible={this.state.modalVisible} />
                        </Screen>
                    )
                }}
            </AudioContext.Consumer>
        )
    }
}