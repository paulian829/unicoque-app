import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';


export default function Terms({ navigation }) {

  const navigate = (screen) => {
    navigation.navigate(screen)
  }

  return (
    <View style={styles.container}>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254,136,9,0.8)",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },

});
