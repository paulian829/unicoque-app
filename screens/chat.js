import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat({ navigation }) {
  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:18}}>Need Help? Message Us!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBEBDA",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  headingOne: {
    fontSize: 32,
    fontWeight: "400",
    paddingVertical: 20,
  },
  headingTwo: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
