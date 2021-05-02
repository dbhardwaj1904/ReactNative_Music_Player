/*

Add an option to open settings for granting permisson to the app so that
permission_error can be set to true from settings directly....

Try to change recyclerlistview to FlatList

*/

import React, { Component, createContext } from 'react';
import { Text, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import styles from '../styles/styles';
import { DataProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Audio from 'expo-av';
import { storeAudio } from '../misc/Helper';

export const AudioContext = createContext();

export default class AudioProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audio_files = [],
            playlist: [],
            addToPlaylist: null,
            permission_error: false,
            data_provider = new DataProvider((row_1, row_2) => row_1 != row_2),
            playback: null,
            sound: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
        }
        this.totalCount = 0;
    }

    getFiles = async () => {

        const { data_provider, audio_files } = this.state;

        let media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            first = media.totalCount,
        });
        this.totalCount = media.totalCount;
        this.setState({...this.state, data_provider: data_provider.cloneWithRows([...audio_files, ...media.assets]), audio_files: [...audio_files, media.assets]});
    }

    permissionAlert = () => {
        Alert.alert("Permission Required", "This app needs to read audio files...", [{
            text: "I am ready",
            onPress: () => this.getPermission(),
        },
        {
            text: "Cancel",
            onPress: () => this.permissionAlert(),
        }]);
    }

    loadPreviousAudio = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio');
        let currentAudio;
        let currentAudioIndex;

        if (previousAudio === null) {
            currentAudio = this.state.audio_files[0];
            currentAudioIndex = 0;
        }
        else {
            previousAudio = JSON.parse(previousAudio);
            currentAudio = previousAudio.audio;
            currentAudioIndex = previousAudio.index;
        }

        this.setState({...this.state, currentAudio, currentAudioIndex});
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync();
        if (permission.granted) {
            this.getFiles();
        }

        if (!permission.canAskAgain && !permission.granted) {
            this.setState({...this.state, permission_error: true});
        }

        if (!permission.granted && permission.canAskAgain) {
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
            if (status === "denied" && canAskAgain) {
                this.permissionAlert();
            }

            if (status === "granted") {
                this.getFiles();
            }
            if (status === "denied" && !canAskAgain) {
                this.setState({...this.state, permission_error: true});
            }
        }
    }

    onPlaybackStatusUpdate = async (playbackStatus) => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying) {}
        this.updateState(this, {
            playbackPosition: playbackStatus.positionMillis,
            playbackDuration: playbackStatus.durationMillis,
        });

        if (playbackStatus.didJustFinish) {
            const nextAudioIndex = this.state.currentAudioIndex + 1;
            if (nextAudioIndex >= this.totalCount) {
                this.state.playback.unloadAsync();
                this.updateState(this, {
                    sound: null,
                    currentAudio: this.state.audio_files[0],
                    isPlaying: false,
                    currentAudioIndex: 0,
                    playbackPosition: null,
                    playbackDuration: null,
                })
                return await storeAudiodio(this.state.audio_files[0], 0);
            }
            const audio = this.state.audio_files[nextAudioIndex];
            const status = await playNext(this.state.playback, audio.uri)
            this.updateState(this, {
                sound: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: nextAudioIndex,
            })
            await storeAudio(audio, nextAudioIndex);
        }
    }

    componentDidMount() {
        this.getPermission();
        if (this.state.playback === null ) {
            this.setState({...this.state, playback: new Audio.Sound()});
        }
    }

    updateState = (prev_state, new_state = {}) => {
        this.setState({...prev_state,  ...new_state })
    }

    render() {

        const { audio_files, data_provider, 
            permission_error, playback, 
            sound, currentAudio, 
            isPlaying, currentAudioIndex, 
            playbackPosition, playbackDuration,
            playlist, addToPlaylist} = this.state;

        if (permission_error) {
            return (
                <View style={styles.permissionMessageView}>
                    <Text style={styles.permissionMessageText}>
                        Please provide permission to access the audio files.
                    </Text>
                </View>
            );
        }
        return (
            <AudioContext.Provider value={{ audio_files, 
                                            playlist,
                                            addToPlaylist,
                                            data_provider, 
                                            playback, 
                                            sound, 
                                            currentAudio,
                                            isPlaying,
                                            currentAudioIndex,
                                            playbackPosition, 
                                            playbackDuration,
                                            totalCount : this.totalCount,
                                            updateState: this.updateState,
                                            loadPreviousAudio : this.loadPreviousAudio,
                                            onPlaybackStatusUpdate: this.onPlaybackStatusUpdate
                                            }}>
                {this.props.childern}
            </AudioContext.Provider>
        )
    }
}