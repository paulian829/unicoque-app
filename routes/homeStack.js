import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/intro.js'
import Login from '../screens/login.js'
import Terms from '../screens/terms.js'
const screens = {
    Home: {
        screen: Home,
        navigationOptions: { headerShown: false }
    },
    Login: {
        screen: Login,
        navigationOptions: { headerShown: false }
    },
    Terms: {
        screen: Terms,
    }
}   

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)