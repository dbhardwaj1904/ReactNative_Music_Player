import React from 'react';
import { View } from 'react-native';
import styles from '../styles/styles';

export default function Screen({children}) {
    return(
        <View style={styles.screenContainter}>
            {children}
        </View>
    )
}