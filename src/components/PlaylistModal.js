import React from 'react';
import { View, Text, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/styles';
import { AntDesign } from 'react-native-vector-icons';
import Color from '../misc/Color';

export default function PlaylistModal({ visible, closeModal, submitData}) {

    const [playlistName, setPlaylistName] = useState("");
    const submitList = () => {
        if (!playlistName.trim()) {
            closeModal();
        }
        else {
            submitData(playlistName);
            setPlaylistName("");
            closeModal();
        }
    }

    return (
        <Modal visible={visible} animationType='fade' transparent={true} >
            <View style={styles.modalContainer1}>
                <View style={styles.inputContainer}>
                    <Text style={styles.titleModal}>Create New Playlist</Text>
                    <TextInput style={styles.inputBox} value={playlistName} onChangeText={(text) => {setPlaylistName(text)}} />
                    <AntDesign name='check' size={24} color={Color.ACTIVE_FONT} style={styles.submitIcon} onPress={() => {submitList}}/>
                </View>
            </View>
            <TouchableWithoutFeedback>
                <View style={[StyleSheet.absoluteFillObject, styles.modalBackground]} onPress={() => {closeModal}} />
            </TouchableWithoutFeedback>
        </Modal>
    );
}