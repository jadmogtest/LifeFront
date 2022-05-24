// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Platform,
} from "react-native";

import DashBoard from "./DashboardScreen";
import ProfilScreen from "./ProfilScreen";

import { Button, CheckBox } from "react-native-elements";
// import { TextInput } from "react-native-paper"; // npm install react-native-paper
import Icon from "react-native-vector-icons/Ionicons";

//* Connexion avec redux : npm install --save redux react-redux */
import { connect } from "react-redux";

//* Import du module AsyncStorage : npm install @react-native-async-storage/async-storage --save */
import AsyncStorage from "@react-native-async-storage/async-storage";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function LogScreen(props) {
  //Input
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true); //Permet de cacher le password

  //CheckBox
  const [checked, setChecked] = useState(false);

  //Logo
  const Logo = require("../assets/Logo-Life.png");

  // *<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SIGN-IN >>>>>>>>>>>>>>>>>>>>>>>>>>*
  // J'initialise l'état pour la redirection
  const [login, setLogin] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");

  //Sign-in
  const signIn = async (mail, password) => {
    /* Je vérifie dans la bdd les informations saisies par l'utilisateur */
    // let privateIp = "192.168.10.155"; //Remplacer privateIp par la vôtre
    // let privateIp = "172.20.10.3"; //Remplacer privateIp par la vôtre
    const rawResponse = await fetch(`https://life-yourapp.herokuapp.com//sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `passwordFromFront=${password}&emailFromFront=${mail}`,
    });

    let response = await rawResponse.json();
    // console.log("yooooooooooooooooooooooooooo", response.token)


    if (response.result === true) {
      //Si la bdd retrouve le user on se connecte
      setLogin(true);
      console.log("coucoucoucouc", response)
      props.tokenStore(response.token)
      props.addMail(mail);
      if (response.token) {
        props.navigation.navigate("Dashboard", {
          screen: "DashboardScreen",
        });
      }

    } else {
      setErrorSignIn(
        //J'affiche un message d'erreur si l'utilisateur n'existe pas ou champs de saisies vide
        "Les champs n'ont pas été remplit correctement ou votre compte n'existe pas encore !"
      );

      setPassword(""); //Je vide le champ mail si error
      setMail(""); //Je vide le champ password si error
    }
  };

  // *<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SIGN-UP >>>>>>>>>>>>>>>>>>>>>>>>>>*

  const signUp = async () => {
    props.navigation.navigate("SignUpInfosScreen", {
      screen: "SignUpInfosScreen",
    });
  };
  // useEffect(() => {
  //   AsyncStorage.getItem("mail", function (error, data) {
  //     if (data) {
  //       setMail(data);
  //     }
  //   });
  // });

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  if (login) {
    // Si le mail et le password sont reconnus
    return <DashBoard />;
  } else {
    // Si le mail et le password ne sont pas reconnus
    return (
      <View style={styles.container}>
        <Image source={Logo} style={styles.image} />
        <Text style={styles.textSlogan}>
          Vos rappels de santé pour une vie sereine !
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <Icon name="mail" color="#5BAA62" size={30} />
          </View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            // autoComplete={true}
            underlineColor="transparent"
            theme={{ colors: { primary: "#5BAA62" } }}
            value={mail}
            onChangeText={(value) => setMail(value)}
            leftIcon={<Icon name="mail" color="#5BAA62" size={30} />}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <Icon name="key" color="#5BAA62" size={30} />
          </View>
          <TextInput
            placeholder="Mot de passe"
            style={styles.input}
            autoCorrect={false}
            secureTextEntry={passwordVisible}
            underlineColor="transparent"
            theme={{ colors: { primary: "#5BAA62" } }}
            value={password}
            onChangeText={(value) => setPassword(value)}
            leftIcon={<Icon name="key" color="#5BAA62" size={30} />}
            rightIcon={
              <Icon
                name={passwordVisible ? "eye" : "eye-off"}
                color="#5BAA62"
                size={30}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
          <View>
            <Icon
              name={passwordVisible ? "eye" : "eye-off"}
              color="#5BAA62"
              size={30}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          </View>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            center
            status={checked ? "checked" : "unchecked"}
            value={checked}
            checked={checked}
            // color={checked ? "#5BAA62" : undefined}
            checkedColor="#5BAA62"
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.textCheckbox}>Se souvenir de moi</Text>
        </View>
        <Button
          type="solid"
          buttonStyle={styles.button}
          title="Se connecter"
          onPress={() => signIn(mail, password)}
        ></Button>
        <Button
          type="solid"
          buttonStyle={styles.button}
          title="Pas encore de compte ?"
          onPress={() => signUp()}
        ></Button>
        <Text>{errorSignIn}</Text>
      </View>
    );
  }
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
    height: 50,
    margin: 15,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    margin: 12,
    padding: 10,
    borderRadius: 5,
    width: 190,
    height: 50,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 20,
    borderRadius: 8,
    height: 50,
    width: 300,
  },
  textSlogan: {
    color: "#37663B",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 37,
  },
  textCheckbox: {
    color: "#37663B",
  },
});

/* Je mets en place le composant conteneur qui encapsule LogScreen */
function mapDispatchToProps(dispatch) {
  return {
    addMail: function (mail, token) {
      dispatch({ type: "saveMail", mail: mail });
    },

    tokenStore: function (token) {
      dispatch({ type: "addToken", token: token })
    },
    // setUserId: function (userId) {
    //   dispatch({ type: "addUserId", userId: userId });
    // },
  };
}

export default connect(null, mapDispatchToProps)(LogScreen);
