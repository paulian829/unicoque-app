import React, { useContext, useState, useEffect } from "react";

import {
    StyleSheet,
    SafeAreaView,
    ScrollView,

} from "react-native";



export default function chatSettings({ navigation, route }) {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "#EFB679",
    },
});
