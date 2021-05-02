import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import { Entypo } from 'react-native-vector-icons'
import Color from '../misc/Color';

const getText = (filename) => {
    return filename[0];
}

const time = (minutes) => {
    if (minutes) {
        const hrs = minutes / 60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].splice(0, 2));
        const sec = Math.ceil((60 * percent) / 100);

        if (parseInt(minute) < 10 && sec < 10) {
            return `0${minute}:0${sec}`;
        }

        if (parseInt(minute) < 10) {
            return `0${minute}:${sec}`;
        }

        if (sec < 10) {
            return `${minute}:0${sec}`;
        }

        return `${minute}:${sec}`;
    }
}

const playPauseIcon = (isPlaying) => {
    if (isPlaying) {
        return (<Entypo name="controller-paus" size={24} color={Color.ACTIVE_FONT} />)
    }
    return (<Entypo name="controller-play" size={24} color={Color.ACTIVE_FONT} />)
}

export default function AudioListItem({ title, duration,
    options, audio_press,
    isPlaying, activeListItem }) {
    return (
        <>
            <View style={styles.container1}>

                <TouchableWithoutFeedback onPress={() => {audio_press}}>

                    <View style={styles.leftContainer}>
                        <View style={[styles.thumbnail, {backgroundColor: activeListItem ? Color.ACTIVE_BG : Color.FONT_LIGHT}]}>
                            <Text style={styles.thumbnailText}>
                                {activeListItem ? playPauseIcon(isPlaying) : getText(title)}
                            </Text>
                        </View>

                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
                            <Text numberOfLines={1} style={styles.timeText}>{time(duration)}</Text>
                        </View>
                    </View>

                </TouchableWithoutFeedback>

                <View style={styles.rightContainer}>
                    <Entypo name="dots-three-vertical"
                        size={20} color={Color.FONT_MEDIUM}
                        onPress={() => {options}}
                        style={{ padding: 10 }} />
                </View>
            </View>
            <View style={styles.seperator} />
        </>
    )
}