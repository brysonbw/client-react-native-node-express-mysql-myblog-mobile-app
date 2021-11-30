import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button} from 'react-native'
import Color from '../constants/Color';
import { useBlogs } from '../hooks/useBlogs';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading, isSuccess, isError, error } = useBlogs();
    return (
        <View style={styles.screen}>
          {isLoading && (
                <>
                    <Text>Loading...</Text>
                </>
            )}


            {isError && (
                <>
                    <Text>Could not fetch data: {error.message}</Text>
                </>
            )}


          {isSuccess && (
                <>
                    <Text style={styles.blogHeader}>All Blogs</Text>
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                                <View style={styles.cardContainer}>
                                    <Text style={styles.blogText}>
                                      {item.title}
                                    </Text>
                                    <Text style={styles.blogText}>
                                      {item.content.substring(0, 25)}...
                                    </Text>
                                    <TouchableOpacity
                                     onPress={() => {
                                      /* 1. Navigate to the Details route with params */
                                      navigation.navigate('view blog', {
                                        id: item.id
                                      });
                                    }}
                                    >
                                      <Text style={styles.view}>View</Text>
                                    </TouchableOpacity>
                                </View>
                        )}
                    />
                </>
            )}
      </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        padding: 20
    },
    cardContainer: {
      alignItems: 'flex-start',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      backgroundColor: Color.primary,
      elevation: 5,
      padding: 40,
      borderRadius: 10,
      marginVertical: 15
  },
  blogText: {
    color:'white',
    fontSize:20,
    padding: 5
  },
  blogHeader: {
    fontSize:30, 
    textAlign: 'center'
  },
  view: {
    textDecorationLine: 'underline',
    color: Color.accent1,
    marginLeft:5,
    marginVertical: 5,
    fontSize:20
  }
})

export default HomeScreen