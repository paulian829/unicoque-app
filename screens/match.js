import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
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
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Stars from "react-native-stars";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { AppStateContext } from "../Context";

export default function Match({ navigation }) {
  const [searchValue, setSearchValue] = useState("");
  const [schoolData, setSchoolData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const isFocused = useIsFocused();
  const [liked, setLiked] = useState(false);
  const {account} = useContext(AppStateContext);
  const [favorite, setFavorite] = useState({});
  const scrollViewRef = useRef();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Public");
  const [items, setItems] = useState([
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
  ]);

  const [location, setLoacation] = useState("");
  const [program, setProgram] = useState("");
  const [maxRange, setMaxRange] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const UniRef = ref(db, "university/");
    onValue(UniRef, (snapshot) => {
      const allSchools = snapshot.val();
      let arr = [];
      for (let key in allSchools) {
        arr.push(allSchools[key]);
      }
      setOriginalData({...arr});

      // setSchoolData([...arr]);
    });

    setFavorite({ ...account.Favorite });
  }, [isFocused]);

  // useEffect(() => {
  //   let results = {};
  //   let search = searchValue;
  //   if (search.length === 0) {
  //     setSchoolData(originalData);
  //     return;
  //   }
  //   for (let item in originalData) {
  //     let schoolName = originalData[item].Name;
  //     schoolName = schoolName.toLowerCase();
  //     if (schoolName.includes(search.toLowerCase())) {
  //       results[item] = originalData[item];
  //     }
  //   }
  //   setSchoolData(results);
  // }, [searchValue]);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const clickSchool = (screen, key) => {
    navigation.navigate(screen, { key: key });
    // navigation.navigate('Search School', { screen: 'SchoolView', key: key });

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

  const checkIfFavorite = (uid) => {
    if (favorite[uid]) {
      return true;
    } else {
      return false;
    }
  };

  const updateFavorite = (uid) => {
    let favoriteObj = favorite;
    let status = favorite[uid];

    if (status) {
      favoriteObj[uid] = !status;
    } else {
      favoriteObj[uid] = uid;
    }

    setFavorite({ ...favoriteObj });

    const db = getDatabase();
    const updates = {};
    updates["/Account/" + account.Uid + "/Favorite/"] = favoriteObj;
    update(ref(db), updates).then(() => {
      ToastAndroid.showWithGravityAndOffset(
        "Favorites Updated!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    });
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
          <Pressable onPress={() => updateFavorite(schoolData[key].Uid)}>
            <MaterialCommunityIcons
              name={
                checkIfFavorite(schoolData[key].Uid) ? "heart" : "heart-outline"
              }
              size={32}
              color={checkIfFavorite(schoolData[key].Uid) ? "red" : "black"}
            />
          </Pressable>
        </View>

        <Paragraph>{schoolData[key].Address.City}</Paragraph>
      </Card.Content>
    </Card>
  ));

  const findMatch = () => {
    let resultObj = {};
    let allAddress = "";

    if (maxRange == 0 ){
      setMaxRange(999999999)
    }
    for (let item in originalData) {
      let uid = originalData[item].Uid;
      allAddress = JSON.stringify(originalData[item].Address);

      let programsList = [];
      let highest = 0;
      let programsOffered = originalData[item].ProgramsOffered;
      for (let programx in programsOffered) {
        programsList.push(programsOffered[programx].Field);
        let TuitionMax = programsOffered[programx].TuitionMax;
        TuitionMax
          ? (TuitionMax = TuitionMax.replace(/[^a-zA-Z0-9 ]/g, ""))
          : (TuitionMax = "0");
        TuitionMax = parseInt(TuitionMax);
        TuitionMax > highest ? (highest = TuitionMax) : highest;
      }
      let program_str = programsList.toString().toLowerCase();
      if (
        allAddress.toLocaleLowerCase().includes(location.toLowerCase()) &&
        originalData[item].schoolType === value &&
        highest <= maxRange &&
        program_str.includes(program)
      ) {
        resultObj[uid] = originalData[item];
      }
      scrollViewRef.current.scrollToEnd({ animated: true });

      setSchoolData({ ...resultObj });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.padding}>
          <Text style={styles.heading}>Find University Match</Text>
          <Text style={styles.headingOne}>School Type</Text>
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
            style={{ height: 60, fontSize: 18 }}
          />
          <Text style={styles.headingOne}>Location</Text>
          <TextInput
            style={styles.input}
            onChangeText={(location) => setLoacation(location)}
            value={location}
          />

          <Text style={styles.headingOne}>Programs</Text>
          <TextInput
            style={styles.input}
            onChangeText={(program) => setProgram(program)}
            value={program}
          />

          <Text style={styles.headingOne}>Maximum Tuition Fee (PHP)</Text>
          <TextInput
            style={styles.input}
            fontSize={30}
            onChangeText={(maxRange) =>
              setMaxRange(parseFloat(maxRange.replace(/[^0-9]/g, "")))
            }
            value={maxRange}
            keyboardType={"number-pad"}
          />
          <TouchableHighlight
            style={styles.btn}
            onPress={() => findMatch()}
            activeOpacity={0.4}
            underlayColor="#e7decc"
          >
            <Text style={styles.btnText}>FIND A MATCH</Text>
          </TouchableHighlight>
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
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  headingOne: {
    fontSize: 22,
    // fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
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
  input: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "white",
    fontSize: 16,
  },
});
