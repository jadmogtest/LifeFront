import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";


export default function SignUpInfosScreen() {
    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 30, fontSize: 30, color: "green", fontStyle: 'italic' }}>Vos informations</Text>
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Nom"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Prénom"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Date de naissance"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Sexe"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />

            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Catégorie professionnelle"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBFAD5",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        fontStyle: "italic"
    },
})