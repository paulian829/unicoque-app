import Home from "./screens/intro";
import Login from "./screens/login";
import Terms from "./screens/terms";
import ForgotPassword from "./screens/forgotPassword";
import Welcome from "./screens/welcome";
import Profile from "./screens/profile";
import Search from "./screens/search";
import SchoolView from "./screens/schoolView";
import Register from "./screens/register";
import { IconButton, Colors } from "react-native-paper";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Image, Button, View, TouchableHighlight} from "react-native";
import AppStateProvider from "./Context";
import Review from "./screens/review";
import ArticlesList from "./screens/articles-list";
import Article from "./screens/article";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function navigate(screen) {
  navigation.navigate("Profile");
}

function headerLogo(navigation) {
  let options = {
    headerTitle: (
      props // App Logo
    ) => (
      <TouchableHighlight onPress={() => navigation.navigate("Welcome")} underlayColor={false}>
        <Image
          style={{ width: 150, height: 50 }}
          source={require("./assets/uniqueco-logo.png")}
          resizeMode="contain"
        />
      </TouchableHighlight>
    ),
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon="magnify"
          color={Colors.red500}
          size={30}
          onPress={() => navigation.navigate("Search")}
        />
        <IconButton
          icon="account"
          color={Colors.red500}
          size={30}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    ),
  };

  return options;
}

function Dashboard() {
  return (
    <Drawer.Navigator initialRouteName="Welcome">
      <Drawer.Screen
        name="Welcome"
        component={Welcome}
        options={({ navigation }) => headerLogo(navigation)}
        // <Drawer.Screen name="Welcome" component={Welcome}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => headerLogo(navigation)}
      />
      <Drawer.Screen
        name="Search School"
        component={SchoolViewGroup}
        options={({ navigation }) => headerLogo(navigation)}
      />
    </Drawer.Navigator>
  );
}

function SchoolViewGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Stack.Screen
        name="SchoolView"
        component={SchoolView}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Stack.Screen
        name="ArticlesList"
        component={ArticlesList}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{
          drawerItemStyle: { height: 0 },
          headerShown: false,
          swipeEdgeWidth: 0,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              swipeEdgeWidth: "100%",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
}
