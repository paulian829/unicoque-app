import React, { useState, useEffect } from "react";
import { IconButton, Colors } from "react-native-paper";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";

import { Card, Title, Paragraph } from "react-native-paper";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Welcome({ route, navigation }) {
  const { key } = route.params;
  const [schoolData, setSchoolData] = useState({
    Name: "Default name",
    SchoolDetails: {
      AboutSchool: "random",
      Goal: "random",
      Qoute: "",
      ProgramsOffered: {
        key1: {
          Field: "",
          TuitionMax: 0,
          TuitionMin: 0,
          programs: ["", "", ""],
        },
        key2: {
          Field: "",
          TuitionMax: 0,
          TuitionMin: 0,
          programs: ["", "", ""],
        },
        key3: {
          Field: "",
          TuitionMax: 0,
          TuitionMin: 0,
          programs: ["", "", ""],
        },
        key4: {
          Field: "",
          TuitionMax: 0,
          TuitionMin: 0,
          programs: ["", "", ""],
        },
      },
    },
  });
  const [programs, setPrograms] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {
    const db = getDatabase();
    const UniRef = ref(db, "university/" + key + "/");
    onValue(UniRef, (snapshot) => {
      let value = snapshot.val();
      setSchoolData(value);
      console.log(value.ProgramsOffered);
      setPrograms(value.ProgramsOffered);
    });
  }, [isFocused]);
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

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  const courses = (arr) => {
    if (!arr) return
    let newArr = arr.split(",");
    var loopData = "";
    var i;
    for (i = 0; i < newArr.length; i++) {
      console.log(newArr[i]);
      loopData +=newArr[i].replace(/^\s+/g, '') + '\n'
    }
    return loopData;
  };

  const programsList = Object.keys(programs).map((key) => (
    <Card style={styles.cards} key={key}>
      <Card.Content>
        <Title>{programs[key].Field}</Title>
        <Paragraph>{courses(programs[key].programs)}</Paragraph>
        <Paragraph style={{ marginTop:-10, fontWeight: "bold" }}>
          {programs[key].TuitionMin} - {programs[key].TuitionMax}
        </Paragraph>
      </Card.Content>
    </Card>
  ));
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.padding}>
          <Text style={styles.headingOne}>{schoolData.Name}</Text>
          <Image
            source={
              schoolData.logo
                ? {
                    uri: schoolData.logo,
                  }
                : {
                    uri: "https://www.detailingwiki.org/wp-content/uploads/2020/01/no-image.png",
                  }
            }
            style={styles.logo}
          />
          <Text style={styles.headingTwo}>
            {schoolData.SchoolDetails.Qoute}
          </Text>
          <View style={styles.section}>
            <Text style={styles.label}>About School</Text>
            <Text style={styles.sectionContent}>
              {schoolData.SchoolDetails.AboutSchool}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Goal</Text>
            <Text style={styles.sectionContent}>
              {schoolData.SchoolDetails.Goal}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Mission</Text>
            <Text style={styles.sectionContent}>
              {schoolData.SchoolDetails.Mission}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Vission</Text>
            <Text style={styles.sectionContent}>
              {schoolData.SchoolDetails.Vission}
            </Text>
          </View>
          <Image
            source={
              schoolData.preview
                ? {
                    uri: schoolData.preview,
                  }
                : {
                    uri: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/schoolPictures%2F06TQko3QkFfbL8x9DpUssL0IT3g1.jpeg?alt=media&token=24727a4c-7ca5-42d4-a710-12056b08d9a0",
                  }
            }
            style={styles.schoolImage}
          />
          <View style={styles.programs}>
            <Text style={styles.headingOne}>Programs</Text>
            {programsList}
          </View>
          <View style={styles.programs}>
            <Text style={styles.headingOne}>Admission Requirements</Text>
            <Card style={styles.cards}>
              <Card.Content>
                <Title>Cross Enrolles</Title>
                <Paragraph>Requirements Item 1</Paragraph>
                <Paragraph>Requirements Item 2</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.cards}>
              <Card.Content>
                <Title>Freshmen</Title>
                <Paragraph>Requirements Item 1</Paragraph>
                <Paragraph>Requirements Item 2</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.cards}>
              <Card.Content>
                <Title>Second Course</Title>
                <Paragraph>Requirements Item 1</Paragraph>
                <Paragraph>Requirements Item 2</Paragraph>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFB679",
    opacity: 0.8,
  },
  padding: {
    padding: 20,
    marginBottom: 30,
  },
  headingOne: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  headingTwo: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  logo: {
    marginTop: 15,
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  schoolImage: {
    marginTop: 15,
    width: "100%",
    height: 300,
    resizeMode: "contain",
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
  },
  section: {
    marginVertical: 10,
  },
  sectionContent: {
    marginTop: 5,
    fontSize: 16,
    lineHeight: 24,
  },
  programs: {
    marginVertical: 20,
  },
  cards: {
    marginVertical: 10,
  },
});
