import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App({ navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [activeLogin, setActiveLogin] = useState("student");
  const [uniName, setUniName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [checked, setChecked] = useState(false);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        Keyboard.dismiss;
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const isActive = (type) => {
    if (type === activeLogin) {
      return styles.buttonActive;
    } else {
      return styles.button;
    }
  };
  const isActiveText = (type) => {
    if (type === activeLogin) {
      return styles.activetext;
    } else {
      return styles.text;
    }
  };
  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const login = () => {
    alert(`${email} ${password}`);
    // navigation.navigate("Dashboard");
  };

  const register = () => {
    alert(`${newEmail} ${newPassword} ${checked}`);
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.align}
      scrollEnabled={false}
      keyboardShouldPersistTaps={"never"}
    >
      <Image
        source={require("../assets/uniqueco-logo.png")}
        style={styles.logo}
      />
      <View style={styles.btnLoginContainer}>
        <TouchableHighlight
          style={isActive("student")}
          onPress={() => setActiveLogin("student")}
          activeOpacity={0.4}
          underlayColor="#e7decc"
        >
          <Text style={isActiveText("student")}>Student</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={isActive("university")}
          onPress={() => setActiveLogin("university")}
          activeOpacity={0.4}
          underlayColor="#e7decc"
        >
          <Text style={isActiveText("university")}>University</Text>
        </TouchableHighlight>
      </View>
      <View
        style={styles.loginFormContainer}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.largeText}>Register new {activeLogin}</Text>
        <TextInput
          style={
            activeLogin === "university"
              ? styles.input
              : styles.displayNone
          }
          value={uniName}
          onChangeText={(uniName) => setEmail(uniName)}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
          placeholder={"University name"}
        />
        <TextInput
                  style={
                    activeLogin === "student"
                      ? styles.input
                      : styles.password
                  }
          value={email}
          onChangeText={(email) => setEmail(email)}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
          placeholder={"Email"}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.password}
          secureTextEntry={true}
          placeholder={"Password"}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          value={repeatPassword}
          onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
          style={styles.password}
          secureTextEntry={true}
          placeholder={"Repeat Password"}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          value={firstname}
          onChangeText={(firstname) => setPassword(firstname)}
          style={styles.password}
          placeholder={"Firstname"}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TextInput
          value={lastname}
          onChangeText={(lastname) => setPassword(lastname)}
          style={styles.password}
          placeholder={"Lastname"}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
        />

        <View style={styles.checboxContainer}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text onPress={() => navigate("Terms")} style={{ fontSize: 16 }}>
            Accept the Terms and Conditions
          </Text>
        </View>
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => login()}
          activeOpacity={0.4}
          underlayColor="#e7decc"
        >
          <Text style={styles.loginBtnText}>REGISTER</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  align: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  logo: {
    marginTop: 10,
    width: "50%",
    height: 100,
    resizeMode: "contain",
  },
  largeImage: {
    marginTop: -130,
    width: "80%",
    resizeMode: "contain",
  },
  button: {
    paddingVertical: 10,
    width: 100,
  },
  buttonActive: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FF9829",
    color: "black",
  },
  button: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "#FF9829",
    borderWidth: 1,
  },
  activetext: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FF9829",
  },
  btnLoginContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  loginFormContainer: {
    width: "100%",
    marginTop: 20,
  },
  registerFormContainer: {
    width: "100%",
    marginTop: 20,
  },
  displayNone: {
    display: "none",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  inputReg: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  password: {
    marginTop: 20,
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  passwordReg: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  largeText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  loginBtn: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  forgotPassword: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  checboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
