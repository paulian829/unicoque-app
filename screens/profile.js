import React, { useState, useEffect, useRef,useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton, Colors } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { DocumentPicker, ImagePicker } from 'expo';
import * as DocumentPicker from "expo-document-picker";
import { AppStateContext } from "../Context";


export default function Profile({ navigation }) {
  const [data, setData] = useState({
    email: "name@email.com",
    name: "Juan Dela Cruz",
    age: "29",
    address: "Random address here",
    profileImage:
      "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
  });

  const [account, setAccount] = useContext(AppStateContext);


  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      return;
    }
    updateData(result.uri, "profileImage");
  };

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
    console.log(account)
    // Get 

  }, []); 

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  const updateData = (value, type) => {
    setData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 30, paddingTop: 20 }}>
          <TouchableHighlight
            onPress={() => pickDocument()}
            activeOpacity={0.4}
            style={styles.logo}
          >
            <Image
              source={{ uri: data.profileImage }}
              onPress={() => pickDocument()}
              style={styles.logo}
            />
          </TouchableHighlight>
          <View style={styles.headingContainer}>
            <Text style={styles.heading1}>My Profile</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={data.email}
            style={styles.input}
            onChangeText={(email) => updateData(email, "email")}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={"Email"}
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={data.name}
            style={styles.input}
            onChangeText={(name) => updateData(name, "name")}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={"Age"}
          />
          <Text style={styles.label}>Age</Text>
          <TextInput
            value={data.age}
            style={styles.input}
            onChangeText={(age) => updateData(age, "age")}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={"Email"}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={data.address}
            style={styles.input}
            onChangeText={(address) => updateData(address, "address")}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={"Email"}
          />
          <TouchableHighlight
            style={styles.btn}
            onPress={() => console.log(data)}
            activeOpacity={0.4}
            underlayColor="#e7decc"
          >
            <Text style={styles.btnText}>SAVE</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFB679",
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 99,
    padding: 0,
  },
  heading1: {
    textAlign: "center",
    fontSize: 18,
    color: "#5F5E5E",
  },
  headingContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  input: {
    height: 50,
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 10,
  },
  btn: {
    marginTop: 20,
    marginBottom: 50,
    width: "100%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
