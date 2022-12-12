import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"
import { Button, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { useEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native"
import Options from './Options';

export default function CreateNote() {
    const [bold, setBold] = useState(false)
    const [italics, setItalics] = useState(false)
    const [underline, setUnderline] = useState(false)
	const [ note, setNote ] = useState("")
	const navigation = useNavigation()

	const saveNote = async () => {
		const value = await AsyncStorage.getItem("NOTES")
		const n = value ? JSON.parse(value) : []
		n.push(note)
        await AsyncStorage.setItem("NOTES", JSON.stringify(n))
            .then(() => navigation.navigate("AllNotes"))
		setNote("")
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const getBold = await AsyncStorage.getItem("SETTINGS.bold")
            setBold(JSON.parse(getBold))

            const getItalics = await AsyncStorage.getItem("SETTINGS.italics")
            setItalics(JSON.parse(getItalics))

            const getUnderline = await AsyncStorage.getItem("SETTINGS.underline")
            setUnderline(JSON.parse(getUnderline))
        } catch (err) { }
    }
    
	return (
		<View style={styles.container}>
			<TextInput
                value={note}
                placeholder="Type here to begin writing!"
                placeholderTextColor={'white'}
				onChangeText={setNote}
                style={{
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: bold ? 'bold' : 'normal',
                    fontStyle: italics ? 'italic' : 'normal',
                    textDecorationLine: underline ? 'underline' : 'none'
                }}
				multiline={true}
				autoFocus
				selectionColor="#fff"
			/>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
                <Button style={StyleSheet.button} appearance="filled" onPress={saveNote}>
					Create Note
                </Button>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#222B45",
		color: "white",
		padding: 30,
		paddingTop: 80,

		width: Dimensions.get("window").width
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: 36
	},
    button: {
		marginBottom: 30
	}
})