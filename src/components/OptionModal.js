import React from 'react';
import { View, Text, Modal, StatusBar, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';

export default function OptionModal({ currentItem, closeModal, visible, onPlay, onPlaylist }) {

    const { filename } = currentItem

    return (
        <>
            <StatusBar hidden={true} />
            <Modal animationType='slide' visible={visible} transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle} numberOfLines={2}>{filename}</Text>
                    <View style={styles.modalOptionContainer}>
                        <TouchableWithoutFeedback onPress={() => {onPlay}} >
                            <Text style={styles.modalOption}></Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {onPlaylist}}>
                            <Text style={styles.modalOption}></Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => {closeModal}}>
                    <View style={styles.modalBackground}></View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}