import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from "../../../../assets/images/Logo.svg"; // Make sure to replace this path with the correct path to your user icon
import Microphone from "../../../../assets/images/microphone.svg";

const ChatBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Logo width={35} height={35} style={styles.userIcon} />
                <View style={styles.messageContent}>
                    <View style={styles.messageTextContainer}>
                        <Text style={styles.sender}>Athlea</Text>
                        <Text style={styles.message}>Welcome to your personal trainer app! ...

                        <TouchableOpacity>
                            <Text style={styles.seeMore}>See more</Text>
                        </TouchableOpacity>
                        </Text>

                    </View>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask Athlea ..."
                />
                <TouchableOpacity>
                    <Microphone height={20} width={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginTop:15
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIcon: {
        marginRight: 12,
    },
    messageContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopRightRadius:13,
        borderBottomRightRadius:13,
        borderTopLeftRadius:13,
        borderBottomLeftRadius:5,
        borderWidth:1,
        borderColor:'#E3EAF8',
        padding:5,
        backgroundColor:'#F6F9FF'
    },
    messageTextContainer: {
        flex: 1,
    },
    sender: {
        fontWeight: 'bold',
        color: '#333',
        fontSize:15
    },
    message: {
        color: '#333',
        fontSize:12
    },
    seeMore: {
        color: '#007bff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 18,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
});

export default ChatBox;
