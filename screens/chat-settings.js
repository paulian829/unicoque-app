import React, { useContext, useState, useEffect, useRef } from "react";
import { Switch, TextInput, IconButton, Colors } from 'react-native-paper';

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    ToastAndroid

} from "react-native";
import { AppStateContext } from "../Context";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import {
    getDatabase,
    ref,
    onValue,
} from "firebase/database";


export default function chatSettings({ navigation, route }) {
    const isFocused = useIsFocused();
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const { user, setUser } = useContext(AppStateContext);
    const [QnA, setQnA] = useState({});
    const scrollViewRef = useRef();



    const [data, setData] = useState({})
    useEffect(() => {
        const db = getDatabase();
        const dataRef = ref(db, "university/" + user.Uid);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data.helpChat)
            if (data.helpChat) {
                setData({ ...data.helpChat });
                setQnA({ ...data.helpChat.QnA })
            }
        });


    }, [isFocused]);

    const RenderList = Object.keys(QnA).map((key) => (
        <View key={key} style={{ marginBottom: 20, backgroundColor: "#FBFAF9", padding: 15, borderRadius: 10 }}>
            <View style={styles.topContainer}>
                <IconButton
                    icon="minus-circle"
                    color={Colors.red500}
                    size={30}
                    onPress={() => console.log('test')}
                />
                <Text style={styles.label}>Remove Q&A</Text>
            </View>
            <TextInput
                label="Question"
                multiline
                numberOfLines={3}
            />
            <TextInput
                style={{ marginTop: 10 }}
                label="Answer"
                multiline
                numberOfLines={3}
            />
        </View>
    ))
    const addRow = () => {
        let random =
            Math.random().toString(36).substring(2) +
            new Date().getTime().toString(36);

        let QnAList = QnA
        QnAList[random] = {
            question: "Question goes here",
            answer: "This is a response",
        }
        setQnA({ ...QnAList })
        scrollViewRef.current.scrollToEnd({ animated: true })
        ToastAndroid.showWithGravityAndOffset(
            "Added new Item",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer} ref={scrollViewRef}>
                <Text style={styles.headingOne}>Help Chat Settings</Text>
                <View style={styles.topContainer}>
                    <Switch value={data.chatState} onValueChange={onToggleSwitch} />
                    <Text style={styles.label}>Toggle Help Chat visibility</Text>
                </View>
                <TextInput
                    label="Introductory Message"
                    multiline
                    numberOfLines={3}
                    value={data.introMessage}
                    onChangeText={(text) => setData({ introMessage: text })}

                />
                <View style={styles.topContainer}>
                    <Text style={styles.label}>Question and Answers</Text>
                    <IconButton
                        icon="plus-circle"
                        color={Colors.green400}
                        size={30}
                        onPress={() => addRow()}
                    />
                </View>
                {RenderList}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
        backgroundColor: "#F0F0F0",
    },
    innerContainer: {
        padding: 10
    },
    topContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10
    },
    headingOne: {
        fontSize: 24,
        fontWeight: "bold",
    },
    label: {
        fontSize: 18,
    }
});
