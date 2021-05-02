import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import Screen from '../components/Screen';
import styles from '../styles/styles';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Color from '../misc/Color';
import Slider from '@react-native-community/slider'
import PlayerButton from '../components/PlayerButton';
import AudioContext from '../context/AudioProvider';
import { useEffect } from 'react';
import { play, playNext } from '../misc/AudioController';
import { storeAudio } from '../misc/Helper';

export default function Player() {

    const context = useContext(AudioContext);

    const { playbackPosition, playbackDuration } = context;

    const calculateSeekBar = () => {
        if (playbackPosition !== null && playbackDuration !== null) {
            return (playbackPosition / playbackDuration);
        }
        return 0;
    }

    const playPause = async () => {
        if (context.sound === null) {
            const audio = context.currentAudio;
            const status = await play(context.playback, audio.uri);
            context.playback.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
            return context.updateState(context, {
                sound: status,
                currentAudio: audio,
                isPlaying: true,
                currentAudioIndex: context.currentAudioIndex
            })
        }

        if (context.sound && context.sound.isPlaying) {
            const status = await pause(context.playback)
            return context.updateState(context, {
                sound: status,
                isPlaying: false,
            })
        }

        if (context.sound && !context.sound.isPlaying) {
            const status = await resume(context.playback)
            return context.updateState(context, {
                sound: status,
                isPlaying: true,
            })
        }
    }

    const handleNext = async () => {
        const { isLoaded } = await context.playback.getStatusAsync();
        const isLastAudio = context.currentAudioIndex + 1 === context.totalCount;
        let audio = context.audio_files[context.currentAudioIndex + 1];
        let index;
        let status;

        if (!isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1;
            const status = await play(context.playback, audio.uri);
        }

        if (isLoaded && !isLastAudio) {
            index = context.currentAudioIndex + 1;
            const status = await playNext(context.playback, audio.uri);
        }

        if (isLastAudio) {
            index = 0;
            audio = context.audio_files[index];
            if (isLoaded) {
                const status = await playNext(context.playback, audio.uri);
            }
            else {
                const status = await play(context.playback, audio.uri);
            }
        }
        context.updateState(context, {
            currentAudio: audio,
            playback: context.playback,
            sound: status,
            isPlaying: true,
            currentAudioIndex: index,
            playbackDuration: null,
            playbackPosition: null,
        });
        storeAudio(audio, index);
    }

    const handlePrev = async () => {
        const { isLoaded } = await context.playback.getStatusAsync();
        const isFirstAudio = context.currentAudioIndex <= 0;
        let audio = context.audio_files[context.currentAudioIndex - 1];
        let index;
        let status;

        if (!isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1;
            const status = await play(context.playback, audio.uri);
        }

        if (isLoaded && !isFirstAudio) {
            index = context.currentAudioIndex - 1;
            const status = await playNext(context.playback, audio.uri);
        }

        if (isFirstAudio) {
            index = context.totalCount - 1;
            audio = context.audio_files[index];
            if (isLoaded) {
                const status = await playNext(context.playback, audio.uri);
            }
            else {
                const status = await play(context.playback, audio.uri);
            }
        }
        context.updateState(context, {
            currentAudio: audio,
            playback: context.playback,
            sound: status,
            isPlaying: true,
            currentAudioIndex: index,
            playbackDuration: null,
            playbackPosition: null,
        });
        storeAudio(audio, index);
    }

    useEffect(() => {
        context.loadPreviousAudio();
    })

    if (!(context.currentAudio)) return null;

    return (
        <Screen>
            <View style={styles.containerPlayer}>
                <Text style={styles.audioCount}> {`${context.currentAudioIndex + 1}/${context.totalCount}`} </Text>
                <View style={styles.midBannerContainer}>
                    <MaterialCommunityIcons name="music-circle" color={300} color={context.isPlaying ? Color.ACTIVE_BG : Color.FONT_MEDIUM} />
                </View>
                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.filename}</Text>
                    <Slider style={styles.sliderPlayer}
                        minimumValue={0}
                        maximumValue={1}
                        value={calculateSeekBar()}
                        minimumTrackTintColor={Color.FONT_MEDIUM}
                        minimumTrackTintColor={Color.ACTIVE_BG} />

                    <View style={styles.audioControllers}>
                        <PlayerButton icon='Prev' onPress={() => { handlePrev() }}/>
                        <PlayerButton style={{ marginHorizontal: 25 }} icon={context.isPlaying ? 'Play' : 'Pause'} onPress={() => { playPause() }} />
                        <PlayerButton icon='Next' onPress={() => { handleNext() }} />
                    </View>
                </View>
            </View>
        </Screen>
    );
}