export const play = async (playback, uri) => {
    try {
        return await playback.loadAsync({ uri: uri }, { shouldPlay: true });
    }
    catch (err) {
        console.log(err.message);
    }
}

export const pause = async (playback) => {
    try {
        return await playback.setStatusAsync({shouldPlay: false});
    }
    catch (err) {
        console.log(err.message);
    }
}

export const resume = async (playback) => {
    try {
        return await playback.playAsync();
    }
    catch (err) {
        console.log(err.message);
    }
}

export const playNext = async (playback, uri) => {
    try {
        await playback.stopAsync();
        await playback.unloadAsync();
        return await play(playback, uri);
    }
    catch (err) {
        console.log(err.message);
    }
}