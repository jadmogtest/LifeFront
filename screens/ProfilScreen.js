// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; //npm install @react-native-community/datetimepicker --save
import DateTimePickerModal from "react-native-modal-datetime-picker"; //expo install react-native-modal-datetime-picker @react-native-community/datetimepicker

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COMPOSENT MODAL <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

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

  /* DropDownPicker État */
  // 6 ouvertures individuelles pour les 6 dropdown
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  // 6 valeurs individuelles pour les 6 dropdown
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);

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
        placeholder="Aucun filtre sélectionné" //Ce texte apparait si aucun filtre sélectionné
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        multiple={true} //Permet de sélectionner plusieurs options
        min={0} //Possible de ne rien sélectionner
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
          onPress={() => setModalVisible(true)}
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
          open={open1}
          value={value1}
          placeholder="À renseigner"
          items={state}
          zIndex={6}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpen1}
          setValue={setValue1}
          setItems={setState}
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
          open={open2}
          value={value2}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpen2}
          zIndex={5}
          setValue={setValue2}
          setItems={setState}
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
          open={open3}
          value={value3}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpen3}
          setValue={setValue3}
          zIndex={4}
          setItems={setState}
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
          open={open4}
          value={value4}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpen4}
          setValue={setValue4}
          setItems={setState}
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
          open={open5}
          value={value5}
          placeholder="À renseigner"
          items={state}
          multiple={false} //Permet de sélectionner une seule option
          setOpen={setOpen5}
          setValue={setValue5}
          setItems={setState}
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

      {/* Modal Vaccins obligatoires */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={modalVisible}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                {/* <Image
                  source={require("./assets/x.png")}
                  style={{ height: 30, width: 30 }}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#FFFFFF"
              onPress={() => setModalVisible(true)}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                paddingLeft: 9,
              }}
              h4
            >
              Vaccins obligatoires :
            </Text>
          </View>

          <Text
            style={{
              marginVertical: 30,
              fontSize: 17,
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            11 vaccins sont obligatoires chez les nourrissons nés après le 1er
            janvier 2018. Trois vaccins restent obligatoires chez les enfants
            nés avant cette date. Le vaccin contre la fièvre jaune l'est aussi
            pour les résidents de Guyane française. En milieu professionnel,
            selon l’activité exercée, certaines vaccinations sont exigées.
          </Text>
          <Button
            title="OK"
            style={styles.buttonModal}
            onPress={() => setModalVisible(false)}
          />
        </ModalPoup>
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
  buttonModal: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    size: "md",
    backgroundColor: "#37663B",
    width: 300,
    height: 60,
    margin: 15,
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
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#37663B",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
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
