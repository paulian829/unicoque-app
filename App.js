import Home from "./screens/intro";
import Login from "./screens/login";
import Terms from "./screens/terms";
import ForgotPassword from "./screens/forgotPassword";
import Welcome from "./screens/welcome";
import Profile from "./screens/profile";
import Search from "./screens/search";
import SchoolView from "./screens/schoolView";
import Register from "./screens/register";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Image, Button, View } from "react-native";
import { IconButton, Colors } from "react-native-paper";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function navigate(screen) {
  navigation.navigate("Profile");
}

function headerLogo() {
  let options = {
    headerTitle: (
      props // App Logo
    ) => (
      <Image
        style={{ width: 150, height: 50 }}
        source={require("./assets/uniqueco-logo.png")}
        resizeMode="contain"
      />
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
        options={headerLogo()}
        // <Drawer.Screen name="Welcome" component={Welcome}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={headerLogo()}
      />
      <Drawer.Screen name="Search" component={Search} options={headerLogo()} />
      <Drawer.Screen
        name="SchoolView"
        component={SchoolView}
        options={headerLogo()}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
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
  );
}
