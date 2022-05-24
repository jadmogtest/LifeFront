// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

import { connect } from "react-redux";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function DeleteAccountScreen(props) {
  // *<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< SIGN-UP >>>>>>>>>>>>>>>>>>>>>>>>>>*
  const signUp = async () => {
    props.navigation.navigate("SignUpInfosScreen", {
      screen: "SignUpInfosScreen",
    });
  };

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Votre compte a bien ÃŠtÃŠ supprimÃŠ.</Text>
      <Button
        type="solid"
        buttonStyle={styles.button}
        title="RecrÃŠer un compte parce que je suis un vrai casse-couilles et que je ne sais pas ce que je veux !!!! "
        onPress={() => signUp()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "#5BAA62",
    width: 300,
    height: 100,
    margin: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBFAD5",
  },
  text: {
    fontSize: 50,
  },
});

export default DeleteAccountScreen;
