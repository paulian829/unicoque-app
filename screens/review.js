import React, { useState, useEffect, useRef, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppStateContext } from "../Context";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Review({ navigation }) {

  const nav = useNavigation();
  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>TEst</Text>
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
  logo: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  }
});
