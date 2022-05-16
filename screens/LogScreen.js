// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Icon, Image } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function HomeScreen(props) {
  //Input
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  //CheckBox
  const [isSelected, setSelection] = useState(false);

  //Logo
  const Logo = require("../assets/Logo-Life.png");

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <Text style={styles.textSlogan}>
        Vos rappels de santé pour une vie sereine !
      </Text>
      <View style={styles.inputSection}>
        <Ionicons
          name="mail"
          size={24}
          color="#5BAA62"
          tintColors={{ true: "#5BAA62", false: "red" }}
        />
        <TextInput
          style={styles.input}
          placeholder="Your email"
          autoComplete={true}
          underlineColorAndroid="transparent"
          value={mail}
          onChangeText={(value) => setMail(value)}
        />
      </View>
      <View style={styles.inputSection}>
        <Ionicons
          name="key"
          size={24}
          color="#5BAA62"
          tintColors={{ true: "#5BAA62", false: "red" }}
        />
        <TextInput
          icon="key"
          style={styles.input}
          placeholder="Your password"
          autoCorrect={false}
          secureTextEntry
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
          tintColors={{ true: "#5BAA62", false: "yellow" }}
        />
        <Text style={styles.textCheckbox}>Se souvenir de moi</Text>
      </View>
      <Button
        type="solid"
        buttonStyle={styles.button}
        title="Se connecter"
        onPress={() =>
          props.navigation.navigate("BottomNavigator", { screen: "Dashboard" })
        }
      ></Button>
      <Button
        type="solid"
        buttonStyle={styles.button}
        title="Pas encore de compte ?"
        onPress={() =>
          props.navigation.navigate("BottomNavigator", { screen: "Dashboard" })
        }
      ></Button>
    </View>
  );
}

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBFAD5",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    size: "md",
    backgroundColor: "#5BAA62",
    width: 300,
    height: 60,
    margin: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSlogan: {
    color: "#37663B",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 37,
  },
  textCheckbox: {
    color: "#37663B",
    textAlign: "center",
  },
});

export default HomeScreen;
