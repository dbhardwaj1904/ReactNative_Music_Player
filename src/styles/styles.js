import { Dimensions, Modal, StatusBar, StyleSheet } from 'react-native';
import Color from '../misc/Color';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    permissionMessageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    permissionMessageText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'red',
    },

    wrapper: {
        flex: 1,
    },

    container1: {
        flexDirection: "row",
        alignSelf: "center",
        width: Dimensions.get("window").width - 80,
    },

    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    
    thumbnail: {
        height: 50,
        flexBasis: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    
    thumbnailText: {
        fontSize: 22,
        fontWeight: "bold",
        color: Color.FONT
    },

    titleContainer: {
        width: Dimensions.get("window").width - 180,
        paddingLeft: 10,
    },

    rightContainer: {
        flexBasis: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    titleText: {
        fontSize: 60,
        color: Color.FONT,
    },

    seperator: {
        width: Dimensions.get("window") - 80,
        opacity: 0.3,
        height: 0.5,
        alignSelf: "center",
        marginTop: 10,
        backgroundColor: "#333",
    },

    timeText: {
        fontSize: 14,
        color: Color.FONT_LIGHT,
    },

    screenContainter: {
        flex: 1,
        backgroundColor: Color.APP_BG,
        paddingTop: StatusBar.currentHeight,
    },

    modalContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },

    modalOptionContainer: {
        padding: 20,
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: Color.FONT_MEDIUM,
    },

    modalOption: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.FONT,
        paddingVertical: 10,
        letterSpacing: 1,
    },

    modalBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: Color.MODAL_BG,
    },

    containerPlayer: {
        flex: 1,
    },

    audioCount: {
        textAlign: 'right',
        padding: 15,
        color: Color.FONT_LIGHT,
        fontSize: 14,
    },

    midBannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    audioPlayerContainer: {},

    audioTitle: {
        fontSize: 16,
        color: Color.FONT,
        padding: 50
    },

    sliderPlayer: {
        width: Dimensions.get('window').width,
        height: 40,
    },

    audioControllers: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },

    containerScroll: {
        padding: 20,
    },

    audioSongs: {
        marginTop: 3,
        opacity: 0.5,
        fontSize: 14,
    },

    playListBanner: {
        padding: 5,
        borderRadius: 5,
        marginBottom: 15,
    },

    playListBanner2: {
        marginTop: 15,
    },

    playListButton: {
        color: Color.ACTIVE_BG,
        letterSpacing: 1,
        fontWeight: 'bold',
        fontSize: 14,
        padding: 5,
    },

    modalContainer1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    inputContainer: {
        width: Dimensions.get('window').width - 20,
        height: 200,
        borderRadius: 10,
        backgroundColor: Color.ACTIVE_FONT,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputBox: {
        width: Dimensions.get('window').width,
        borderBottomWidth: 1,
        borderBottomColor: Color.ACTIVE_BG,
        fontSize: 18,
        paddingVertical: 5,
    },

    submitIcon: {
        padding: 10,
        backgroundColor: Color.ACTIVE_BG,
        borderRadius: 50,
        marginTop: 15,
    },

    modalBackground: {
        backgroundColor: Color.MODAL_BG,
        zIndex: -1,
    },

    titleModal: {
        color: Color.ACTIVE_BG,
    },
})

export default styles;