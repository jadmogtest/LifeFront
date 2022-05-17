// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; //npm install @react-native-community/datetimepicker --save
import { TouchableHighlight } from "react-native-gesture-handler";

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
  const infosObligatoire = (e) => {
    setModalVisible(true);
  };

  const infosRecommandation = (e) => {
    setModalVisible(true);
  };

  //Click sur les icônes +
  const addHealthCare = (e) => {};

  const addTrip = (e) => {};

  /* DateTimePicker */
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const handleDatePicker = () => {
    setVisible(false);
  };

  const showDatePicker = () => {
    setVisible(!visible);
  };

  // const hideDatePicker = () => {
  //   setVisible(false);
  // };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

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
      <View style={styles.row}>
        <Text style={styles.textRow}>Diphtérie :</Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}

          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        />
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => showDatePicker()}
        >
          <Text>{JSON.stringify(new Date(date))}</Text>
        </TouchableOpacity>
        {visible && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={date}
            onChange={onChange}
          />
        )} */}
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>Tétanos </Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}
          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        />
        {/* <DropDownPicker
          style={styles.dropDownPickerDate}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}
          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        /> */}
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
      <View style={styles.row}>
        <Text style={styles.textRow}>Diphtérie :</Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}

          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        />
        {/* <DropDownPicker
          style={styles.dropDownPickerDate}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}

          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        /> */}
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>Tétanos </Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}
          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        />
        {/* <DropDownPicker
          style={styles.dropDownPickerDate}
          open={openState}
          value={valueState}
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState}
          setValue={setValueState}
          setItems={setState}
          // onChangeItem={(item) => {
          //   item.label, item.value;
          // }}
        /> */}
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
      <View>
        {/* The button that used to trigger the date picker */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatePicker()}
        >
          <Text>{JSON.stringify(new Date(date))}</Text>
        </TouchableOpacity>
        {/* The date picker */}
        {visible && (
          <DateTimePicker
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            value={date}
            // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
            onChange={onChange}
            // onConfirm={handleDatePicker}
            // onCancel={hideDatePicker}
          />
        )}
      </View>
    </View>
  );
}

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 200,
    backgroundColor: "white",
    borderRadius: 0,
    justifyContent: "center",
    marginTop: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#EBFAD5",
    // marginTop: 50,
  },
  DropDownPicker: { borderColor: "#37663B" },
  dropDownPickerDate: {
    height: 50,
    width: 100,
    zIndex: 100,
    borderColor: "transparent",
    borderRadius: 0,
  },
  dropDownPickerState: {
    height: 50,
    width: 146,
    zIndex: 100,
    borderColor: "transparent",
    borderRadius: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // justifyContent: "space-between",
  },
  text: {
    marginLeft: 10, //Espace entre texte et icône
  },
  textRow: {
    height: 50,
    width: 100,
    alignContent: "center",
    backgroundColor: "white",
    padding: 20,
    marginLeft: 50,
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
