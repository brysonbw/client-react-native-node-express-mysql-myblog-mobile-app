import React, {useState} from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import Color from '../constants/Color'

const CreateScreen = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const navigation = useNavigation();

    const queryClient = useQueryClient()

    const mutation = useMutation(
      newBlog => {
        return axios.post("https://myblog-app-api.herokuapp.com/api/blogs/create", newBlog);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("blogs");
        },
      }
    );

    const addBlog = () => {
      mutation.mutate({
        title: title,
       content: content
     })
     navigation.navigate('home')
    };

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
             <Text style={styles.blogHeader}>Create Blog</Text>
             <View>
                 <Text style={styles.label}>Title:</Text>
                    <TextInput
                     blurOnSubmit
                      autoCapitalize='none'
                     style={styles.input} value={title}
                      onChangeText={text => setTitle(text)} />
                <Text style={styles.label}>Content:</Text>
                    <TextInput blurOnSubmit
                     autoCapitalize='none'
                     style={styles.input}
                      value={content} 
                      onChangeText={text => setContent(text)} />
             </View>
             <TouchableOpacity
                onPress={addBlog}
                >
                    <View style={styles.btnContainer}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Save</Text>
            </View>
                </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20
    },
    blogHeader: {
        fontSize:30, 
        textAlign: 'center'
      },
      input: {
        fontSize: 18,
        borderWidth: 1,
        height: 40,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5,
        paddingLeft: 10
      },
      label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
      },
      btnContainer: {
        alignItems:'center',
        justifyContent: "center",
        shadowOffset: { width: 0, height: 2},
        backgroundColor: Color.primary,
        elevation: 5,
        borderRadius: 10,
        marginTop: 15,
        width: 500,
        height: 40,
        maxWidth: '50%', 
      }
})

export default CreateScreen
