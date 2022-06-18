import React, { useState, useEffect, useRef } from 'react'
import { IconButton, Colors } from 'react-native-paper';

import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { useNavigation, useIsFocused } from '@react-navigation/native'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { getDatabase, ref, onValue } from "firebase/database";


export default function Welcome({ navigation }) {
    const [searchValue, setSearchValue] = useState('')
    const [schoolData, setSchoolData] = useState([])
    const [originalData, setOriginalData] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log("Running test")
        const db = getDatabase();
        const UniRef = ref(db, "university/");
        onValue(UniRef, (snapshot) => {
            const allSchools = snapshot.val();
            console.log(typeof(allSchools))
            let arr =[]
            for (let key in allSchools){
                arr.push(allSchools[key])
            }
            // allSchools.forEach(item => {console.log('test')})

            setSchoolData([...arr]);
            // setOriginalData(allSchools);
        });

    }, [isFocused])

    useEffect(() => {

        let results = {}
        let search = searchValue
        if (search.length === 0) {
            setSchoolData(originalData)
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

        <Card style={{ marginBottom: 20 }} onPress={() => clickSchool('SchoolView')} key={key}>
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
