import React, { useState, useEffect, useRef, useContext } from "react";
import { IconButton, Colors } from "react-native-paper";

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

export default function Welcome({ navigation }) {
  const [user, setUser] = useContext(AppStateContext);
  const [account, setAccount] = useContext(AppStateContext);
  const [type, setType] = useContext(AppStateContext);
  const [university, setUniversity] = useContext(AppStateContext);

  const nav = useNavigation();
  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="magnify"
            color={Colors.red500}
            size={30}
            onPress={() => navigate("Search")}
          />
          <IconButton
            icon="account"
            color={Colors.red500}
            size={30}
            onPress={() => navigate("Profile")}
          />
        </View>
      ),
    });
  });

  useEffect(() => {
    // Get account information on Firebase
    console.log(user.uid);

    const db = getDatabase();
    const dataRef = ref(db, "Account/" + user.uid);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setAccount(data);
      setType(data.type);
      if (data.type == "university") {
        downloadUniData();
      }
    });
    // Get
  }, []);

  const downloadUniData = () => (event) => {
    const db = getDatabase();
    const UniRef = ref(db, "University/" + user.uid);
    onValue(UniRef, (snapshot) => {
      const data = snapshot.val();
      setUniversity(data);
    });
  };

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 30 }}>
          <Image
            source={require("../assets/bg-image-large.png")}
            style={styles.logo}
          />
          <Text style={styles.heading1}>Welcome!{user.displayName}</Text>
          <Text style={styles.heading2}>
            Find your perfect school to study for college!{" "}
          </Text>
          <Text style={styles.paragraph}>
            We provide list of schools in Quezon Province to help you in your
            college search process.
          </Text>

          <View style={styles.btnContainerCenter}>
            <TouchableHighlight
              style={styles.btn}
              onPress={() => alert("Search!")}
              activeOpacity={0.4}
              underlayColor="#e7decc"
            >
              <Text style={styles.btnText}>Search University</Text>
            </TouchableHighlight>
          </View>
        </View>
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
  },
  heading1: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  heading2: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  paragraph: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  btn: {
    marginTop: 20,
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF9829",
    textAlign: "center",
  },
  btnContainerCenter: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
