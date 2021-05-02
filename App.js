import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AudioProvider from './src/context/AudioProvider';
import Color from './src/misc/Color';

const theme={
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Color.ACTIVE_BG,
    }
}

export default function App() {
    return (
        <AudioProvider>
            <NavigationContainer theme={theme}>
                <AppNavigator />
            </NavigationContainer>
        </AudioProvider>
    );
}