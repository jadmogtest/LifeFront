// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; //npm install @react-native-community/datetimepicker --save

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function ProfilScreen(props) {
  // const dim = Dimensions.get("screen").width
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

  //DropDownPicker État
  const [openState1, setOpenState1] = useState(false);
  const [openState2, setOpenState2] = useState(false);
  const [openState3, setOpenState3] = useState(false);
  const [openState4, setOpenState4] = useState(false);
  const [openState5, setOpenState5] = useState(false);

  const [valueState, setValueState] = useState(null);
  //Valeurs DropDownPicker
  const [state, setState] = useState([
    { label: "À jour du", value: "À jour" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le", value: "Programmé" },
  ]);

  /* Pour ouvrir un seul dropDownPicker à la fois dans le table */
  // const mySetOpenState = (i) => {
  //   let temp = [...openState]; // création copie
  //   temp = [...temp.slice(0, i), !temp[i], ...temp.slice(i + 1)];
  //   setOpenState(temp); //MAJ de l'état
  // };

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
  const [rowVisible, setRowVisible] = useState(false);

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

  const hideDatePicker = () => {
    setVisible(false);
  };

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
      <View style={styles.headrow}>
        <Text style={styles.textHeadColumn1}>Vaccin : </Text>
        <Text style={styles.textHeadColumn2}>État : </Text>
        <Text style={styles.textHeadColumn3}>Date : </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>Diphtérie </Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState1}
          value={valueState}
          placeholder="À renseigner"
          items={state}
          zIndex={6}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState1}
          setValue={setValueState}
          setItems={setState}
          stickyHeader={true}
          onChangeItem={(item) => {
            item.label, item.value;
          }}
        />
        <View>
          {/* Le bouton pour afficher le dateTimePicker */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker()}
          >
            {/* Affiche la date sélectionnée par le user dans le bouton */}
            <Text style={styles.textDatePicker}>
              {new Date(date).toLocaleDateString("fr-FR")}
            </Text>
          </TouchableOpacity>
          {/* Le dateTimePicker */}
          {visible && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange}
              // onConfirm={handleDatePicker}
              // onCancel={hideDatePicker}
            />
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>Tétanos </Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState2}
          value={valueState}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState2}
          zIndex={5}
          setValue={setValueState}
          setItems={setState}
          onChangeItem={(item) => {
            item.label, item.value;
          }}
        />
        <View>
          {/* Le bouton pour afficher le dateTimePicker */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker()}
          >
            {/* Affiche la date sélectionnée par le user dans le bouton */}
            <Text style={styles.textDatePicker}>
              {new Date(date).toLocaleDateString("fr-FR")}
            </Text>
          </TouchableOpacity>
          {/* Le dateTimePicker */}
          {visible && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange}
              // onConfirm={handleDatePicker}
              // onCancel={hideDatePicker}
            />
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>Rougeole </Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState3}
          value={valueState}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState3}
          setValue={setValueState}
          zIndex={4}
          setItems={setState}
          onChangeItem={(item) => {
            item.label, item.value;
          }}
        />
        <View>
          {/* Le bouton pour afficher le dateTimePicker */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker()}
          >
            {/* Affiche la date sélectionnée par le user dans le bouton */}
            <Text style={styles.textDatePicker}>
              {new Date(date).toLocaleDateString("fr-FR")}
            </Text>
          </TouchableOpacity>
          {/* Le dateTimePicker */}
          {visible && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange}
              // onConfirm={handleDatePicker}
              // onCancel={hideDatePicker}
            />
          )}
        </View>
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
      <View style={styles.headrow}>
        <Text style={styles.textHeadColumn1}>Vaccin : </Text>
        <Text style={styles.textHeadColumn2}>État : </Text>
        <Text style={styles.textHeadColumn3}>Date : </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>COVID-19</Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState4}
          value={valueState}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState4}
          setValue={setValueState}
          setItems={setState}
          onChangeItem={(item) => {
            item.label, item.value;
          }}
        />
        <View>
          {/* Le bouton pour afficher le dateTimePicker */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker()}
          >
            {/* Affiche la date sélectionnée par le user dans le bouton */}
            <Text style={styles.textDatePicker}>
              {new Date(date).toLocaleDateString("fr-FR")}
            </Text>
          </TouchableOpacity>
          {/* Le dateTimePicker */}
          {visible && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange}
              // onConfirm={handleDatePicker}
              // onCancel={hideDatePicker}
            />
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>Hépatite B </Text>
        <DropDownPicker
          style={styles.dropDownPickerState}
          open={openState5}
          value={valueState}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpenState5}
          setValue={setValueState}
          setItems={setState}
          onChangeItem={(item) => {
            item.label, item.value;
          }}
        />
        <View>
          {/* Le bouton pour afficher le dateTimePicker */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatePicker()}
          >
            {/* Affiche la date sélectionnée par le user dans le bouton */}
            <Text style={styles.textDatePicker}>
              {new Date(date).toLocaleDateString("fr-FR")}
            </Text>
          </TouchableOpacity>
          {/* Le dateTimePicker */}
          {visible && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange}
              // onConfirm={handleDatePicker}
              // onCancel={hideDatePicker}
            />
          )}
        </View>
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
          Vaccins projets personnels :
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
  button: {
    height: 50,
    width: 120,
    backgroundColor: "white",
    justifyContent: "center",
    // marginTop: 15,
    marginRight: 240,
    borderWidth: 1,
    borderColor: "#EBFAD5",
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
    borderColor: "transparent",
    borderRadius: 0,
  },
  dropDownPickerState: {
    height: 50,
    width: 146,
    borderColor: "transparent",
    borderRadius: 0,
    borderColor: "#EBFAD5",
    zIndex: 5,
  },
  headrow: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 200,
    zIndex: 1,
    // paddingHorizontal: 20,
    // justifyContent: "space-between",
  },
  text: {
    color: "#37663B",
    marginLeft: 10, //Espace entre texte et icône
  },
  textDatePicker: {
    alignContent: "center",
    padding: 20,
  },
  textHeadColumn1: {
    flexDirection: "row",
    backgroundColor: "#5BAA62",
    borderColor: "#37663B",
    width: 100,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBFAD5",
    paddingLeft: 8,
    marginLeft: 12,
  },
  textHeadColumn2: {
    flexDirection: "row",
    backgroundColor: "#5BAA62",
    borderColor: "#37663B",
    width: 146,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBFAD5",
    paddingLeft: 8,
  },
  textHeadColumn3: {
    flexDirection: "row",
    backgroundColor: "#5BAA62",
    borderColor: "#5BAA62",
    width: 107,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBFAD5",
    paddingLeft: 8,
  },
  textRow: {
    height: 50,
    width: 100,
    alignContent: "center",
    backgroundColor: "white",
    padding: 20,
    marginLeft: 50,
    borderWidth: 1,
    borderColor: "#EBFAD5",
  },
  textTitle: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#37663B",
    marginLeft: 10, //Espace entre texte et icône
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    padding: 9,
    color: "#37663B",
  },
});

export default ProfilScreen;
