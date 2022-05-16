// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function ProfilScreen(props) {
  //Dropdown list filtre
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

  const vaccines = [
    {
      name: "Diphtérie",
      status: "À jour",
      date: "12/02/2021",
    },
    {
      name: "Tétanos",
      status: "À programmer",
      date: "choisir une date",
    },
    {
      name: "Poliomélyte",
      status: "Programmer",
      date: "12/05/2023",
    },
  ];

  //DropDownPicker table
  const [openState, setOpenState] = useState([false, false, false]);
  const [valueState, setValueState] = useState(null);
  //Valeurs DropDownPicker
  const [state, setState] = useState([
    { label: "À jour", value: "À jour" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé", value: "Programmé" },
  ]);

  /* Pour ouvrir un seul dropDownPicker à la fois dans le table */
  const mySetOpenState = (i) => {
    let temp = [...openState]; // création copie
    temp = [...temp.slice(0, i), !temp[i], ...temp.slice(i + 1)];
    setOpenState(temp); //MAJ de l'état
  };

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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nom du vaccin</DataTable.Title>
          <DataTable.Title>État</DataTable.Title>
          <DataTable.Title numeric>Fait / Prévu le</DataTable.Title>
        </DataTable.Header>
        {vaccines.map((u, i) => {
          return (
            <DataTable.Row key={i} style={styles.table}>
              <DataTable.Cell>{u.name}</DataTable.Cell>
              <DataTable.Cell>
                <DropDownPicker
                  style={styles.dropDownPicker}
                  open={openState[i]}
                  value={valueState}
                  items={state}
                  multiple={false} //Permet de sélectionner une seule option
                  setOpen={(i) => mySetOpenState(i)}
                  setValue={setValueState}
                  setItems={setState}
                  onChangeItem={(item) => {
                    item.label, item.value;
                  }}
                />
              </DataTable.Cell>
              <DataTable.Cell numeric>{u.date}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>

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
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Nom du vaccin</DataTable.Title>
          <DataTable.Title>État</DataTable.Title>
          <DataTable.Title numeric>Fait / Prévu le</DataTable.Title>
        </DataTable.Header>
        {vaccines.map((u, i) => {
          return (
            <DataTable.Row key={i} style={styles.table}>
              <DataTable.Cell>{u.name}</DataTable.Cell>
              <DataTable.Cell>
                <DropDownPicker
                  style={styles.dropDownPicker}
                  open={openState[i]}
                  value={valueState}
                  items={state}
                  multiple={false} //Permet de sélectionner une seule option
                  setOpen={(i) => mySetOpenState(i)}
                  setValue={setValueState}
                  setItems={setState}
                  onChangeItem={(item) => {
                    item.label, item.value;
                  }}
                />
              </DataTable.Cell>
              <DataTable.Cell numeric>{u.date}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
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
    // marginTop: 50,
  },
  DropDownPicker: { borderColor: "#37663B" },
  dropDownPicker: {
    height: 10,
    width: 100,
    zIndex: -1,
    borderColor: "#37663B",
  },
  text: {
    marginLeft: 10, //Espace entre texte et icône
  },
  table: {
    // margin: 10,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10, //Espace entre texte et icône
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    padding: 9,
  },
});

export default ProfilScreen;
