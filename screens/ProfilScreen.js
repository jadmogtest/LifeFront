// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Ionicons } from "@expo/vector-icons";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function ProfilScreen(props) {
  //Dropdown list
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    "Profil",
    "Catégorie",
    "Priorité",
    "Échéancé",
    "État",
  ]);
  const [items, setItems] = useState([
    //Profil
    { label: "Profil", value: "Profil" },
    { label: "Claire", value: "Claire", parent: "Profil" },
    { label: "Mandy", value: "Mandy", parent: "Profil" },
    { label: "Jad", value: "Jad", parent: "Profil" },
    { label: "Nicolas", value: "Nicolas", parent: "Profil" },

    //Catégorie
    { label: "Catégorie", value: "Catégorie" },
    { label: "Vaccin", value: "Vaccin", parent: "Catégorie" },
    { label: "Examen de santé", value: "Examen de santé", parent: "Catégorie" },

    //Priorité
    { label: "Priorité", value: "Priorité" },
    { label: "Obligatoire", value: "Obligatoire", parent: "Priorité" },
    { label: "Recommandé", value: "Recommandé", parent: "Priorité" },
    { label: "Personnel", value: "Personnel", parent: "Priorité" },

    //Priorité
    { label: "Priorité", value: "Échéancé" },
    { label: "Mois prochain", value: "Mois prochain", parent: "Échéancé" },
    {
      label: "6 prochains mois",
      value: "6 prochains mois",
      parent: "Échéancé",
    },
    { label: "Annuelle", value: "Annuelle", parent: "Échéancé" },

    //État
    { label: "État", value: "État" },
    { label: "À programmer", value: "À programmer", parent: "État" },
    { label: "Fait", value: "Fait", parent: "État" },
    { label: "Prévus", value: "Prévus", parent: "État" },
  ]);

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  //Click sur les icônes informations
  let infosObligatoire = (e) => {
    setModalVisible(true);
  };

  let infosRecommandation = (e) => {
    setModalVisible(true);
  };

  //Click sur les icônes +
  let addHealthCare = (e) => {};

  let addTrip = (e) => {};

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <View style={styles.container}>
      <DropDownPicker
        style={styles.DropDownPicker}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        multiple={true} //Permet de sélectionner plusieurs options
        min={0}
        mode="BADGE"
        valueStyle={{
          fontWeight: "bold",
        }}
        badgeDotColors={[
          "#e76f51",
          "#00b4d8",
          "#e9c46a",
          "#e76f51",
          "#8ac926",
          "#00b4d8",
          "#e9c46a",
        ]}
      />

      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#5BAA62"
          onPress={() => {
            infosObligatoire();
            // console.log("click détecté", infosObligatoireClick);
          }}
        />
        <Text style={styles.textTitle} h4>
          Vaccins obligatoires :
        </Text>
      </View>
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#5BAA62"
          onPress={() => {
            infosRecommandation();
            // console.log("click détecté", infosRecommandésClick);
          }}
        />
        <Text style={styles.textTitle} h4>
          Vaccins recommandés :
        </Text>
      </View>
      <View style={styles.title}>
        <AntDesign
          name="pluscircle"
          size={24}
          color="#5BAA62"
          onPress={() => {
            addHealthCare();
            // console.log("click détecté", addHealthCareClick);
          }}
        />
        <Text style={styles.text}>Ajouter un vaccin ou un examen de santé</Text>
      </View>
      <View style={styles.title}>
        <AntDesign
          name="pluscircle"
          size={24}
          color="#5BAA62"
          onPress={() => {
            addTrip();
            // console.log("click détecté", addTrip);
          }}
        />
        <Text style={styles.text}>Préparer un voyage</Text>
      </View>
    </View>
  );
}

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#EBFAD5",
  },
  DropDownPicker: {},
  text: {
    marginLeft: 10, //Espace entre texte et icône
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10, //Espace entre texte et icône
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfilScreen;