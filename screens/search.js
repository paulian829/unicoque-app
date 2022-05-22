import React, { useState, useEffect, useRef } from 'react'
import { IconButton, Colors } from 'react-native-paper';

import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

let data = {
    randomid1: {
        Name: 'Cavite School',
        logoURL: 'https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/logo%2FOiglKaN1qIPJGo6Y5JxCg4ZMheu1.png?alt=media&token=a31a248a-68cf-4d0b-ab33-e99e89dd6e42',
        Address: {
            City: 'random city'
        }
    },
    randomid2: {
        Name: 'Rizal School',
        logoURL: 'https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/logo%2FOiglKaN1qIPJGo6Y5JxCg4ZMheu1.png?alt=media&token=a31a248a-68cf-4d0b-ab33-e99e89dd6e42',

        Address: {
            City: 'random city'
        }
    },
    randomid3: {
        Name: 'Quezon School',
        logoURL: 'https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/logo%2FOiglKaN1qIPJGo6Y5JxCg4ZMheu1.png?alt=media&token=a31a248a-68cf-4d0b-ab33-e99e89dd6e42',

        Address: {
            City: 'random city'
        }
    }
}


export default function Welcome({ navigation }) {
    const [searchValue, setSearchValue] = useState('')
    const [schoolData, setSchoolData] = useState(data)
    const [originalData, setOriginalData] = useState(data)


    useEffect(() => {

    })

    useEffect(() => {

        let results = {}
        let search = searchValue
        if (search.length === 0) {
            setSchoolData(data)
            return
        }
        for (let item in originalData) {
            let schoolName = originalData[item].Name
            schoolName = schoolName.toLowerCase()
            if (schoolName.startsWith(search.toLowerCase())) {
                results[item] = originalData[item]
            }
        }
        setSchoolData(results)


    }, [searchValue])

    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({
            headerRight: () => <View style={{ flexDirection: 'row' }}>
                <IconButton
                    icon="magnify"
                    color={Colors.red500}
                    size={30}
                    onPress={() => navigate('Search')}
                />
                <IconButton
                    icon="account"
                    color={Colors.red500}
                    size={30}
                    onPress={() => navigate('Profile')}
                />
            </View>
        });
    })

    const navigate = (screen) => {
        navigation.navigate(screen)
    }
    const clickSchool = (screen, key) => {
        navigation.navigate(screen, { key: key })
    }

    const tifOptions = Object.keys(schoolData).map(key =>

        <Card style={{ marginBottom: 20 }} onPress={() => alert('test')} key={key}>
            <Card.Cover source={{ uri: schoolData[key].logoURL }} />
            <Card.Content>
                <Title>{schoolData[key].Name}</Title>
                <Paragraph>{schoolData[key].Address.City}</Paragraph>
            </Card.Content>
        </Card>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.padding}>
                    <SearchBar
                        placeholder="Search here..."
                        value={searchValue}
                        onChangeText={(value) => setSearchValue(value)}
                        inputStyle={{ backgroundColor: 'white', color: 'black' }}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 1, borderRadius: 5 }}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                    />
                    <View style={{ paddingVertical: 20 }}>
                        {tifOptions}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFB679'
    },
    padding: {
        padding: 20,
        marginBottom: 30
    }


});
