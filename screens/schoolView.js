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
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.padding}>
                    <Text style={styles.headingOne}>MSEUF - Lucena Chapter</Text>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/logo%2F06TQko3QkFfbL8x9DpUssL0IT3g1.png?alt=media&token=34daa016-dc3c-46cb-a7ee-b8ecc23ad668' }} style={styles.logo} />
                    <Text style={styles.headingTwo}>Random Qoute here</Text>
                    <View style={styles.section}>
                        <Text style={styles.label}>About School</Text>
                        <Text style={styles.sectionContent}>Culpa quis exercitation velit magna mollit fugiat consectetur excepteur laboris ea fugiat ullamco eiusmod deserunt. Enim nulla mollit in est non occaecat est laboris pariatur nisi sunt. Do commodo do ea occaecat qui incididunt voluptate irure consequat reprehenderit nulla. Irure nostrud ipsum dolore Lorem labore veniam qui Lorem ad consectetur nulla occaecat. Sunt sit aliqua sunt voluptate magna ad commodo amet velit voluptate amet incididunt duis.</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Goal</Text>
                        <Text style={styles.sectionContent}>Culpa quis exercitation velit magna mollit fugiat consectetur excepteur laboris ea fugiat ullamco eiusmod deserunt. Enim nulla mollit in est non occaecat est laboris pariatur nisi sunt. Do commodo do ea occaecat qui incididunt voluptate irure consequat reprehenderit nulla. Irure nostrud ipsum dolore Lorem labore veniam qui Lorem ad consectetur nulla occaecat. Sunt sit aliqua sunt voluptate magna ad commodo amet velit voluptate amet incididunt duis.</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Mission</Text>
                        <Text style={styles.sectionContent}>Culpa quis exercitation velit magna mollit fugiat consectetur excepteur laboris ea fugiat ullamco eiusmod deserunt. Enim nulla mollit in est non occaecat est laboris pariatur nisi sunt. Do commodo do ea occaecat qui incididunt voluptate irure consequat reprehenderit nulla. Irure nostrud ipsum dolore Lorem labore veniam qui Lorem ad consectetur nulla occaecat. Sunt sit aliqua sunt voluptate magna ad commodo amet velit voluptate amet incididunt duis.</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Vission</Text>
                        <Text style={styles.sectionContent}>Culpa quis exercitation velit magna mollit fugiat consectetur excepteur laboris ea fugiat ullamco eiusmod deserunt. Enim nulla mollit in est non occaecat est laboris pariatur nisi sunt. Do commodo do ea occaecat qui incididunt voluptate irure consequat reprehenderit nulla. Irure nostrud ipsum dolore Lorem labore veniam qui Lorem ad consectetur nulla occaecat. Sunt sit aliqua sunt voluptate magna ad commodo amet velit voluptate amet incididunt duis.</Text>
                    </View>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/schoolPictures%2F06TQko3QkFfbL8x9DpUssL0IT3g1.jpeg?alt=media&token=24727a4c-7ca5-42d4-a710-12056b08d9a0' }} style={styles.schoolImage} />
                    <View style={styles.programs}>
                        <Text style={styles.headingOne}>Programs</Text>
                        <Card style={styles.cards} >
                            <Card.Content>
                                <Title>Program Name</Title>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph style={{ marginTop: 10, fontWeight: 'bold' }}>20000-40000</Paragraph>
                            </Card.Content>
                        </Card>
                        <Card style={styles.cards} >
                            <Card.Content>
                                <Title>Program Name</Title>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph style={{ marginTop: 10, fontWeight: 'bold' }}>20000-40000</Paragraph>
                            </Card.Content>
                        </Card>
                        <Card style={styles.cards} >
                            <Card.Content>
                                <Title>Program Name</Title>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph>Course 1</Paragraph>
                                <Paragraph style={{ marginTop: 10, fontWeight: 'bold' }}>20000-40000</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.programs}>
                        <Text style={styles.headingOne}>Admission Requirements</Text>
                        <Card style={styles.cards} >
                            <Card.Content>
                                <Title>Cross Enrolles</Title>
                                <Paragraph>Requirements Item 1</Paragraph>
                                <Paragraph>Requirements Item 2</Paragraph>
                            </Card.Content>
                        </Card>
                        <Card style={styles.cards} >
                            <Card.Content>
                                <Title>Freshmen</Title>
                                <Paragraph>Requirements Item 1</Paragraph>
                                <Paragraph>Requirements Item 2</Paragraph>
                            </Card.Content>
                        </Card>
                        <Card style={styles.cards} >
                            <Card.Content>
                                <Title>Second Course</Title>
                                <Paragraph>Requirements Item 1</Paragraph>
                                <Paragraph>Requirements Item 2</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFB679',
        opacity: 0.8
    },
    padding: {
        padding: 20,
        marginBottom: 30
    },
    headingOne: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'

    },
    headingTwo: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600'
    },
    logo: {
        marginTop: 15,
        width: 200,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    schoolImage: {
        marginTop: 15,
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    label: {
        fontSize: 18
    },
    section: {
        marginVertical: 10
    },
    sectionContent: {
        marginTop: 5,
        fontSize: 16,
        lineHeight: 24
    },
    programs: {
        marginVertical: 20,
    },
    cards: {
        marginVertical: 10
    }

});
