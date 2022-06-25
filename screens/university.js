import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, IconButton, Colors } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import { getDatabase, ref, child, push, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export default function University({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Public");
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [data, setData] = useState({
    Name: "",
    Website: "",
    Email: "",
    contact: "",
    schoolType: "Public",
    logo: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fyarn-error-removebg-preview.1aea60d3.png?alt=media&token=c1f19939-8281-4639-8b40-1bffe0dca716",
    SchoolDetails: {
      AboutSchool: "",
      Goal: "",
      Mission: "",
      Qoute: "",
      Vission: "",
    },
    Address: {
      Barangay: "",
      City: "",
      Country: "",
      Province: "",
      Lot: "",
      Zipcode: "",
      gmap: "",
    },
  });

  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const [items, setItems] = useState([
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
  ]);

  const pickLogo = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if (result.type === "cancel") {
      return;
    }
    // setLogo(result.uri);

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    const response = await fetch(result.uri);
    const blob = await response.blob();
    setLogoFile(blob);

    const storage = getStorage();
    const picRef = storageRef(storage, "/logo/" + uniqid + ".jpeg");

    uploadBytes(picRef, blob)
      .then((snapshot) => {
        getDownloadURL(picRef).then((downloadURL) => {
          console.log(downloadURL);
          updateData(downloadURL, "logo");
        });
      })
      .catch(() => console.log("Error"));
  };

  const updateData = (value, type) => {
    setData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const updateAddress = (value, type) => {
    let Address = "Address";
    setData((prevState) => ({
      ...prevState,
      Address: { ...prevState.Address, [type]: value },
    }));
  };
  const updateSchoolDetails = (value, type) => {
    let Address = "Address";
    setData((prevState) => ({
      ...prevState,
      SchoolDetails: { ...prevState.SchoolDetails, [type]: value },
    }));
  };

  useEffect(() => {
    updateData(value, "schoolType");
  }, [value]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.padding}>
          <Text style={styles.heading}>
            Fill up the University Information/Detail Below
          </Text>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>University Details</Text>
            <TextInput
              label={"University Name"}
              style={styles.formGroupInput}
              value={data.Name}
              onChangeText={(Name) => updateData(Name, "Name")}
            />
            <TextInput
              label={"Website"}
              style={styles.formGroupInput}
              value={data.Website}
              onChangeText={(value) => updateData(value, "Website")}
            />
            <TextInput
              label={"Email"}
              style={styles.formGroupInput}
              value={data.Email}
              onChangeText={(value) => updateData(value, "Email")}
            />
            <TextInput
              label={"Contact Number"}
              style={styles.formGroupInput}
              value={data.contact}
              onChangeText={(value) => updateData(value, "contact")}
            />
            <Text style={styles.formGroupLabel}>University Type</Text>

            <DropDownPicker
              open={open}
              value={value}
              items={[
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
              ]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              theme="LIGHT"
              style={{ marginBottom: 20 }}
            />
            <Text style={styles.formGroupLabel}>University Logo</Text>
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight
                style={styles.btn}
                onPress={() => pickLogo()}
                //   onPress={() => console.log(data)}
                activeOpacity={0.4}
                underlayColor="#e7decc"
              >
                <Text style={styles.btnText}>Select Logo</Text>
              </TouchableHighlight>
            </View>

            <Image source={{ uri: data.logo }} style={styles.logo} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>Address</Text>
            <TextInput
              label={"Lot"}
              style={styles.formGroupInput}
              value={data.Address.Lot}
              onChangeText={(value) => updateAddress(value, "Lot")}
            />
            <TextInput
              label={"Barangay"}
              style={styles.formGroupInput}
              value={data.Address.Barangay}
              onChangeText={(value) => updateAddress(value, "Barangay")}
            />
            <TextInput
              label={"City/Municipality"}
              style={styles.formGroupInput}
              value={data.Address.City}
              onChangeText={(value) => updateAddress(value, "City")}
            />
            <TextInput
              label={"Province"}
              style={styles.formGroupInput}
              value={data.Address.Province}
              onChangeText={(value) => updateAddress(value, "Province")}
            />
            <TextInput
              label={"ZipCode"}
              style={styles.formGroupInput}
              value={data.Address.Zipcode}
              onChangeText={(value) => updateAddress(value, "Zipcode")}
            />
            <TextInput
              label={"Map Embedded HTML code"}
              style={styles.formGroupInput}
              value={data.Address.gmap}
              onChangeText={(value) => updateAddress(value, "gmap")}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>
              University Mission and Vission
            </Text>
            <TextInput
              label={"School Qoute"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Qoute}
              onChangeText={(value) => updateSchoolDetails(value, "Qoute")}
            />
            <TextInput
              label={"About School"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.AboutSchool}
              onChangeText={(value) =>
                updateSchoolDetails(value, "AboutSchool")
              }
            />
            <TextInput
              label={"Mission"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Mission}
              onChangeText={(value) => updateSchoolDetails(value, "Mission")}
            />
            <TextInput
              label={"Vission"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Vission}
              onChangeText={(value) => updateSchoolDetails(value, "Vission")}
            />
            <TextInput
              label={"Goals"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Goal}
              onChangeText={(value) =>
                updateSchoolDetails(value, "Goal")
              }
            />
          </View>
          <View style={styles.formGroup}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.formGroupLabel}>Programs Offered</Text>
              <IconButton
                icon="minus"
                color={Colors.red500}
                size={30}
                style={{ backgroundColor: "white", marginLeft: 50 }}
                onPress={() => console.log("Pressed")}
              />
              <IconButton
                icon="plus"
                color={Colors.green500}
                style={{ backgroundColor: "white" }}
                size={30}
                onPress={() => console.log("Pressed")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  padding: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  formGroup: {
    marginTop: 20,
    marginBottom: 20,
  },
  formGroupLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  formGroupInput: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  btn: {
    width: "50%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 99,
    padding: 0,
    marginTop: 30,
  },
});
