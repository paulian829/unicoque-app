import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TextInput, TouchableHighlight, Keyboard } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function App({navigation}) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [activeLogin, setActiveLogin] = useState('login')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [newEmail, setNewEmail] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [checked, setChecked] = useState(false)


    const navigate = (screen) => {
        navigation.navigate(screen)
      }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
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
            return styles.buttonActive
        }
        else {
            return styles.button
        }
    }
    const isActiveText = (type) => {
        if (type === activeLogin) {
            return styles.activetext
        }
        else {
            return styles.text
        }
    }
    const goToForgotPassword = () => {
        alert('ttest')
    }
    const login = () => {
        alert(email)
    }

    const register = () => {
        alert(`${newEmail} ${newPassword} ${checked}`)
    }
    return (
        <KeyboardAwareScrollView style={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.align} scrollEnabled={false} keyboardShouldPersistTaps={'always'}>
            <Image source={require("../assets/uniqueco-logo.png")} style={styles.logo} />
            <Image source={require("../assets/bg-image-large.png")} style={styles.largeImage} />
            <View style={styles.btnLoginContainer}>
                <TouchableHighlight style={isActive('login')} onPress={() => setActiveLogin('login')} activeOpacity={0.4}
                    underlayColor="#e7decc">
                    <Text style={isActiveText('login')} >Login</Text>
                </TouchableHighlight>
                <TouchableHighlight style={isActive('register')} onPress={() => setActiveLogin('register')} activeOpacity={0.4}
                    underlayColor="#e7decc">
                    <Text style={isActiveText('register')} >Register</Text>
                </TouchableHighlight>
            </View>
            <View style={activeLogin === 'login' ? styles.loginFormContainer : styles.displayNone} keyboardShouldPersistTaps={'handled'}>
                <Text style={styles.largeText}>Login Existing Account</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    onBlur={Keyboard.dismiss}
                    onSubmitEditing={Keyboard.dismiss}
                    placeholder={'Email'}



                />
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    style={styles.password}
                    secureTextEntry={true}
                    placeholder={'Password'}
                    onBlur={Keyboard.dismiss}
                    onSubmitEditing={Keyboard.dismiss}

                />
                <TouchableHighlight style={styles.loginBtn} onPress={() => login()} activeOpacity={0.4}
                    underlayColor="#e7decc">
                    <Text style={styles.loginBtnText} >LOGIN</Text>
                </TouchableHighlight>

                <Text style={styles.forgotPassword} onPress={() => goToForgotPassword()}>Forgot Password?</Text>
            </View>
            <View style={activeLogin === 'register' ? styles.registerFormContainer : styles.displayNone}>
                <Text style={styles.largeText}>Register New Account</Text>
                <Text>Email</Text>
                <TextInput
                    style={styles.inputReg}
                    value={newEmail}
                    onChangeText={(newEmail) => setNewEmail(newEmail)}


                />
                <Text style={{ marginTop: 10 }}>Password</Text>
                <TextInput
                    style={styles.passwordReg}
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}

                />
                <View style={styles.checboxContainer}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                    />
                <Text onPress={()=> navigate('Terms') }>Accept the Terms and Conditions</Text>
                </View>

                <Pressable style={styles.loginBtn} onPress={() => register()} >
                    <Text style={styles.loginBtnText} >REGISTER</Text>
                </Pressable>

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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    logo: {
        marginTop: 10,
        width: '50%',
        height: 100,
        resizeMode: 'contain'
    },
    largeImage: {
        marginTop: -130,
        width: '80%',
        resizeMode: 'contain'
    },
    button: {
        paddingVertical: 10,
        width: 100
    },
    buttonActive: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FF9829',
        color: 'black'
    },
    button: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: '#FF9829',
        borderWidth: 1
    },
    activetext: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#FF9829',

    },
    btnLoginContainer: {
        marginTop: -80,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    loginFormContainer: {
        width: '100%',
        marginTop: 20,

    },
    registerFormContainer: {
        width: '100%',
        marginTop: 20,
    },
    displayNone: {
        display: 'none'
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        fontSize: 20
    },
    inputReg: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        fontSize: 20
    },
    password: {
        marginTop: 10,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        fontSize: 20
    },
    passwordReg: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        fontSize: 20

    },
    largeText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    loginBtn: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#FF9829',
        paddingVertical: 10,
        borderRadius: 5

    },
    loginBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    forgotPassword: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
    },
    checboxContainer:{
        flexDirection:'row',
        alignItems:'center'

    }
});
