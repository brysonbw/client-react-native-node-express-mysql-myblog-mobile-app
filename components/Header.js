import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Color from '../constants/Color'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({title}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Ionicons name="ios-home-outline" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('create blog')}>
            <MaterialIcons name="post-add" size={28} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        height: '13%',
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30,
    },
    headerText: {
        color: 'white',
        fontSize: 18
    }
    });
    
export default Header