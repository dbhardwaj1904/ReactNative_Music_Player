import React from 'react';
import { View, Text } from 'react-native';
import {AntDesign} from 'react-native-vector-icons';
import Color from '../misc/Color';

export default function PlayerButton(props) {

    const {icon, size=40, color=Color.FONT, onPress} = props;

    const iconName = (type) => {
        switch(type) {
            case 'Play':
                return 'pausecircle';
            case 'Pause':
                return 'playcircle';
            case 'Next':
                return 'forward';
            case 'Prev':
                return 'banckward';
        }
    }

    return (
        <AntDesign {...props} name={iconName(icon)} color={color} size={size} onPress={() => {onPress}}/>
    );
}