import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Color from '../constants/Color'
import useBlog from '../hooks/useBlog'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const ViewScreen = ({route}) => {
    const queryClient = useQueryClient()

        const mutation = useMutation((id) => axios.delete(`https://myblog-app-api.herokuapp.com/api/blogs/delete/${id}`),
        { onSuccess: () => {
              queryClient.invalidateQueries();
            },
        } 
      ); 

      const navigation = useNavigation();

      const deleteBlog = () => {
          mutation.mutate(id)
          navigation.navigate('home')
      }

    const {id} = route.params
    const { data, isSuccess, isLoading, isError, error } = useBlog(id);
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
						<View key={data.id}>
							<Text style={styles.blogTitle}>{data.title}</Text>
							<Text style={styles.blogText}>{data.content}</Text>
						</View>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity  onPress={deleteBlog}>
                    <View style={styles.deleteBtn}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Delete</Text>
                        </View>
                            </TouchableOpacity>
                        </View>
				</>
			)}


        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    blogTitle: {
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        fontSize: 35,
        color: Color.primary,
    },
    blogText: {
        textAlign: 'center',
        fontSize:20, 
        marginVertical: 10
    },
    btnContainer: {
        shadowOffset: { width: 0, height: 2},
        backgroundColor: Color.primary,
        elevation: 5,
        borderRadius: 10,
        marginTop: 15,
        padding: 15,
        marginHorizontal: 10
    },
    deleteBtn: {
        shadowOffset: { width: 0, height: 2},
        backgroundColor: 'red',
        elevation: 5,
        borderRadius: 10,
        marginTop: 15,
        padding: 15,
        marginHorizontal: 10
    }
})

export default ViewScreen
