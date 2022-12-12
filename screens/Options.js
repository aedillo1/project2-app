import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text } from "@ui-kitten/components"
import React, { useState } from "react"
import { DevSettings, Dimensions, KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native"
import RNRestart from 'react-native-restart';

export default function Options() {
    const [bold, setBold] = useState(false)
    const [italics, setItalics] = useState(false)
    const [underline, setUnderline] = useState(false)

    const saveSettings = async () => {
        await AsyncStorage.setItem("SETTINGS.bold", JSON.stringify(bold))
        await AsyncStorage.setItem("SETTINGS.italics", JSON.stringify(italics))
        await AsyncStorage.setItem("SETTINGS.underline", JSON.stringify(underline))
    }

    const restartApp = async () => {
        DevSettings.reload()
    }



	return (
		<View style={styles.container}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.bottom}>
                <Button style={StyleSheet.button} appearance={bold ? "filled" : "outline"} onPress={
                    () => setBold(!bold)
                }>
                    Enable Bold
                </Button>
                <Button style={StyleSheet.button} appearance={italics ? "filled" : "outline"} onPress={
                    () => setItalics(!italics)
                }>
                    Enable Italics
                </Button>
                <Button style={StyleSheet.button} appearance={underline ? "filled" : "outline"} onPress={
                    () => setUnderline(!underline)
                }>
                    Enable Underline
                </Button>
                <Button style = {StyleSheet.button} appearance={"filled"} onPress={saveSettings}>
                    Save Settings
                </Button>
                <Button style={StyleSheet.button} appearance={"filled"} onPress={restartApp}>
                    Restart App
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
        justifyContent: "flex-start",
		marginBottom: 36
	},
    button: {
		marginBottom: 30
        
	}
})