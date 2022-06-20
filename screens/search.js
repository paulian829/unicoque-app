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
  Pressable,
  ToastAndroid,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Stars from "react-native-stars";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { getDatabase, ref, onValue } from "firebase/database";
import { AppStateContext } from "../Context";

export default function Welcome({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [schoolData, setSchoolData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const isFocused = useIsFocused();
  const [liked, setLiked] = useState(false);
  const [account] = useContext(AppStateContext);

  useEffect(() => {
    const db = getDatabase();
    const UniRef = ref(db, "university/");
    onValue(UniRef, (snapshot) => {
      const allSchools = snapshot.val();
      let arr = [];
      for (let key in allSchools) {
        arr.push(allSchools[key]);
      }
      // allSchools.forEach(item => {console.log('test')})
      setOriginalData([...arr]);

      setSchoolData([...arr]);
      // setOriginalData(allSchools);
    });

    console.log(account);
  }, [isFocused]);

  //   const checkIfFavorite = (key) => {
  // if(account.)
  //   };

  useEffect(() => {
    let results = {};
    let search = searchValue;
    if (search.length === 0) {
      setSchoolData(originalData);
      return;
    }
    for (let item in originalData) {
      let schoolName = originalData[item].Name;
      schoolName = schoolName.toLowerCase();
      if (schoolName.includes(search.toLowerCase())) {
        results[item] = originalData[item];
      }
    }
    setSchoolData(results);
  }, [searchValue]);

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
  const clickSchool = (screen, key) => {
    navigation.navigate(screen, { key: key });
  };

  const getScore = (reviews) => {
    if (!reviews) {
      return 0;
    }
    let score = 0;
    let count = 0;
    for (let review in reviews) {
      console.log();
      score = reviews[review].rating + score;
      count++;
    }

    return score / count;
  };
  const tifOptions = Object.keys(schoolData).map((key) => (
    <Card
      style={{ marginBottom: 20 }}
      onPress={() => clickSchool("SchoolView", schoolData[key].Uid)}
      key={key}
    >
      <Card.Cover
        source={
          schoolData[key].logo
            ? { uri: schoolData[key].logo }
            : {
                uri: "https://www.detailingwiki.org/wp-content/uploads/2020/01/no-image.png",
              }
        }
      />
      <Card.Content>
        <Title>{schoolData[key].Name}</Title>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stars
            disabled={true}
            default={getScore(schoolData[key].reviews)}
            count={5}
            fullStar={
              <Icon name={"star"} size={40} style={[styles.myStarStyle]} />
            }
            emptyStar={
              <Icon
                name={"star-outline"}
                size={40}
                style={styles.myStarStyle}
              />
            }
            halfStar={
              <Icon name={"star-half"} size={40} style={[styles.myStarStyle]} />
            }
          />
          <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
            <MaterialCommunityIcons
              name={liked ? "heart" : "heart-outline"}
              size={32}
              color={liked ? "red" : "black"}
            />
          </Pressable>
        </View>

        <Paragraph>{schoolData[key].Address.City}</Paragraph>
      </Card.Content>
    </Card>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.padding}>
          <SearchBar
            placeholder="Search here..."
            value={searchValue}
            onChangeText={(value) => setSearchValue(value)}
            inputStyle={{ backgroundColor: "white", color: "black" }}
            containerStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 5,
            }}
            inputContainerStyle={{ backgroundColor: "white" }}
          />
          <View style={{ paddingVertical: 20 }}>{tifOptions}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFB679",
  },
  padding: {
    padding: 20,
    marginBottom: 30,
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
});
