// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, ListItem } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
//* Connexion avec redux : npm install --save redux react-redux */
import { connect } from "react-redux";
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function FavoriteScreen(props) {
  console.log("TEST :::", props.dataMedecin);
  ////FAIRE UN TABLEAU DES OBJETS SAUVEGARDES DATAMEDECIN DANS LE REDUCER CAR ON NE PEUT PAS TABLER SUR UN OBJET/////
  var listFav = props.dataMedecin.map((Fav, i) => {
    <View style={styles.container}>
      <Text>Ma page de favoris</Text>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            <Text>Profession : {Fav.Adresse}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text>Adresse : {}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <FontAwesome
          key={i}
          onPress={() => trashPOI(POI)}
          name="trash-o"
          size={20}
          color="#eb4d4b"
        />
      </ListItem>
    </View>;
  });
  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <View style={styles.bottom}>
      <View>{listFav}</View>
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
  bottom: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 70,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    size: "md",
    backgroundColor: "#5BAA62",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});

function mapStateToProps(state) {
  return { dataMedecin: state.etab };
}

export default connect(mapStateToProps, null)(FavoriteScreen);
