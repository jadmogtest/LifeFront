// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { TextInput } from "react-native-paper"; // npm install react-native-paper

//* Connexion avec redux : npm install --save redux react-redux */
import { connect } from "react-redux";

//* Import du module AsyncStorage : npm install @react-native-async-storage/async-storage --save */
import AsyncStorage from "@react-native-async-storage/async-storage";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function HomeScreen(props) {
  //Input
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true); //Permet de cacher le password

  //CheckBox
  const [isSelected, setSelection] = useState(false);

  //Logo
  const Logo = require("../assets/Logo-Life.png");

  var connect = () => {
    props.addMail(mail);
    props.navigation.navigate("BottomNavigator", { screen: "Dashboard" });
    AsyncStorage.setItem("mail", mail);
    setMail(""); //Vide le champ mail après connexion
    setPassword(""); //Vide le champ password après connexion
    // console.log('test connect')
  };

  // *<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SIGN-IN >>>>>>>>>>>>>>>>>>>>>>>>>>*
  // J'initialise l'état pour la redirection
  const [login, setLogin] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");
  var connect = async () => {
    // console.log(signInEmail);
    /* Je vérifie dans la bdd les informations saisies par l'utilisateur */
    const rawResponse = await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `passwordFromFront=${password}&emailFromFront=${mail}`,
    });

    let response = await rawResponse.json();

    if (response.login === true) {
      //Si la bdd retrouve le user on se connecte
      setLogin(true);
      props.addToken(response.user.token); //Je récupére la valeur du token reçu
    } else {
      setErrorSignIn(
        //J'affiche un message d'erreur si l'utilisateur n'existe pas ou champs de saisies vide
        "Les champs n'ont pas été remplit correctement ou votre compte n'existe pas encore !"
      );
    }
    setPassword(""); //Je vide le champ mail si error
    setMail(""); //Je vide le champ password si error
  };

  useEffect(() => {
    AsyncStorage.getItem("mail", function (error, data) {
      if (data) {
        setMail(data);
      }
    });
  });

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //

  if (login) {
    // Si le mail et le password sont reconnus
    return <ProfilScreen />;
  } else {
    // Si le mail et le password ne sont pas reconnus
    return (
      <View style={styles.container}>
        <Image source={Logo} style={styles.image} />
        <Text style={styles.textSlogan}>
          Vos rappels de santé pour une vie sereine !
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Mail"
            style={styles.input}
            placeholder="Your email"
            // autoComplete={true}
            underlineColorAndroid="transparent"
            value={mail}
            onChangeText={(value) => setMail(value)}
            left={<TextInput.Icon name="email" color="#5BAA62" />}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            style={styles.input}
            placeholder="Your password"
            autoCorrect={false}
            secureTextEntry={passwordVisible}
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={(value) => setPassword(value)}
            left={<TextInput.Icon name="key" color="#5BAA62" />}
            right={
              <TextInput.Icon
                name={passwordVisible ? "eye" : "eye-off"}
                color="#5BAA62"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
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
            props.navigation.navigate("BottomNavigator", {
              screen: "ProfilScreen",
            })
          }
        ></Button>
        <Button
          type="solid"
          buttonStyle={styles.button}
          title="Pas encore de compte ?"
          onPress={() =>
            props.navigation.navigate("SignUpInfosScreen", {
              screen: "SignUpInfosScreen",
            })
          }
        ></Button>
        <Text>{errorSignIn}</Text>
      </View>
    );
  }

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
          props.navigation.navigate("SignUpInfosScreen", { screen: "SignUpInfosScreen" })
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
    alignSelf: "center",

    // alignItems: "center",
  },
  inputContainer: {
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

/* Je mets en place le composant conteneur qui encapsule LogScreen */
function mapDispatchToProps(dispatch) {
  return {
    addMail: function (mail, token) {
      dispatch({ type: "saveMail", mail: mail });
      dispatch({ type: "addToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
