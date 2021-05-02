import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import PlaylistModal from '../components/PlaylistModal';
import { AudioContext } from '../context/AudioProvider';
import styles from '../styles/styles';

export default function PlayList() {

    const [visible, setVisible] = useState(false);

    const context = useContext(AudioContex);
    const { playlist, addToPlaylist, updateState } = context;

    const createPlaylist = async (playlist) => {
        const result = await AsyncStorage.getItem('playlist');
        if (result !== null) {
            const audio = [];
            if (addToPlaylist) {
                audio.push(addToPlaylist);
            }
            const newList = {
                id: Date.now(),
                title: playlist,
                audio: audio
            }
            const updateList = [...playlist, newList];
            updateState(context, { addToPlaylist: null, playlist: updateList });
            await AsyncStorage.setitem('playlist', JSON.stringify(updateList));
        }
        setVisible(false);
    }

    const renderPlaylist = async () => {
        const result = await AsyncStorage.getItem('playlist');
        if (result === null) {
            const defaultPlaylist = {
                id: Date.now(),
                title: 'My Favorite',
                audio: [],
            }
            const newPlaylist = [...playlist, defaultPlaylist];
            updateState(context, { playlist: [...newPlaylist] });
            return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlaylist]));
        }
        updateState(context, { playlist: JSON.parse(result) });
    }

    const playlistBanner = async (playlist) => {
        if (addToPlaylist) {
            const result = await AsyncStorage.getItem('playlist');
            let oldlist = [];
            let sameAudio = false;
            let updatedlist = [];
            if (result !== null) {
                oldlist = JSON.parse(result);
                updatedlist = oldlist.filter((list) => {
                    if (list.id === playlist.id) {
                        for (let i of list.audio) {
                            if (audio.id === addToPlaylist.id) {
                                sameAudio = true;
                                return;
                            }
                        }
                        list.audio = [...list.audio, addToPlaylist];
                    }
                    return (list);
                })
            }
            if (sameAudio) {
                Alert.alert("File already exists");
                sameAudio = false;
                return updateState(context, {addToPlaylist: null});
            }
            updateState(context, {addToPlaylist: null, playlist: [...updatedlist]});
            return (AsyncStorage.setItem('playlist', JSON.stringify([...updatedlist])));
        }

        

    }

    useEffect(() => {
        if (playlist.length) {
            renderPlaylist();
        }
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.containerScroll}>
            {playlist.length ? playlist.map((item) => {
                <TouchableOpacity style={styles.playListBanner} key={item.id.toString()} onPress={() => playlistBanner(item)}>
                    <Text> {item.title} </Text>
                    <Text style={styles.audioSongs}> {item.audio.length > 1 ? `${item.audio.length} Songs` : `${item.audio.length} Song`} </Text>
                </TouchableOpacity>
            }) : null}
            <TouchableOpacity style={styles.playListBanner2} onPress={() => {
                setVisible(true)
            }}>
                <Text style={styles.playListButton}>  </Text>
            </TouchableOpacity>
            <PlaylistModal visible={visible} closeModal={() => setVisible(false)} submitData={(playlist) => { createPlaylist(playlist) }} />
        </ScrollView>
    );
}