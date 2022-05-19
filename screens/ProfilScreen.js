// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; //npm install @react-native-community/datetimepicker --save
import DateTimePickerModal from "react-native-modal-datetime-picker"; //expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
//Librairie avec laquelle pas besoin de gérer le zIndex
import { Dropdown } from "react-native-element-dropdown"; //npm install react-native-element-dropdown --save

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

  /* DropDown État */
  // Pour l'ouverture individuelle des dropdown d'état
  const [open1, setOpen1] = useState(false);

  // 5  valeurs individuelles pour les 6 dropdown
  /* 
  ! À AMÉLIORER 
  */
  
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null); //Pour les vaccins ajoutés par le user

  //Valeurs DropDown état
  const [state, setState] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);

  /* Pour ouvrir un seul dropDownPicker à la fois dans le table */
  // const mySetOpenState = (i) => {
  //   let temp = [...openState]; // création copie
  //   temp = [...temp.slice(0, i), !temp[i], ...temp.slice(i + 1)];
  //   setOpenState(temp); //MAJ de l'état
  // };

  /* Les différents modals  apparaissent au clic sur les icones info */
  const modal = [
    {
      title: "Vaccins obligatoires",
      description:
        "11 vaccins sont obligatoires chez les nourrissons nés après le 1er  ",
    },
    {
      title: "Vaccins recommandés",
      description:
        "Des vaccins existent contre diverses maladies graves telles que la  ",
    },
    {
      title: "Vaccins projets personnels",
      description:
        "Si vous souhaitez réaliser un vaccin qui n'apparait pas dans la  ",
    },
  ];
  // Modal Vaccins obligatoires (VO)
  const [modalVOVisible, setModalVOVisible] = useState(false);

  // Modal Vaccins recommandés (VR)
  const [modalVRVisible, setModalVRVisible] = useState(false);

  // Modal Vaccins projets personnels (VPP)
  const [modalVPPVisible, setModalVPPVisible] = useState(false);

  /*
  TODO :
  // Click sur les icônes +
  // const addHealthCare = (e) => {};

  // const addTrip = (e) => {};

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

  /* >>>>>>>>>> Ajout d'une ligne de vaccin au clic sur l'icône + <<<<<<<<<<<<<< */
  const [vaccinesList, setVaccinesList] = useState([]); //Pour garder afficher les vaccins déja ajoutés lorsque le user reclic sur l'icône +
  const [valueVaccine, setValueVaccine] = useState(null); //Pour afficher les valeurs dans le dropDown

  //Valeurs DropDownPicker vaccins
  const [vaccinesName, setVaccinesName] = useState([
    { label: "Coqueluche", value: "Coqueluche" },
    { label: " Fièvre jaune", value: " Fièvre jaune" },
    { label: "Grippe saisonnière", value: "Grippe saisonnière" },
    { label: "Hépatite A", value: "Hépatite A" },
    { label: "Hépatite B", value: "Hépatite B" },
    {
      label: "Infections à Papillomavirus humain",
      value: "Infections à Papillomavirus humain",
    },
    { label: "Rubéole ", value: "Rubéole " },
    { label: "Varicelle", value: "Varicelle" },
  ]);

  const list = []; //Je crée un tableau vide dans lequel je vais pusher les vaccins que le user va ajouter au clic sur l'icône +

  const addVaccines = () => {
    setVaccinesList([...vaccinesList, {}]); //Copie de la liste des vaccins ajoutés
  };

  //Pour colorer la bordure du dropDown en vert lorsque le user l'ouvre pour sélectionner son choix
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);
  const [isFocus5, setIsFocus5] = useState(false);

  //Je map sur vaccinesList pour ajouter une nouvelle ligne de vaccin
  var healthCarePerso = vaccinesList.map((i, element) => {
    return (
      <View style={styles.row} key={i}>
        <Dropdown
          style={styles.dropDownPickerVaccines}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={valueVaccine}
          search //Permet au user de chercher le nom du vaccin sans avoir besoin de scroller sur la liste de nom proposée
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          items={vaccinesName}
          multiple={false} //Permet de sélectionner une seule option
          onChange={(item) => {
            setValueVaccine(item.value);
          }}
        />
        <Dropdown
          style={styles.dropDownPickerState}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={list[i]}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onChange={(item) => {
            setValue6(item.value);
            list.push(item.value); //Pour pusher la valeur du dropdown au tableau
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
    );
  });

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

      {/*>>>>>>>>>>>>>>>>>>>>> Vaccins obligatoires <<<<<<<<<<<<<<<<<<<<<< */}
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#5BAA62"
          onPress={() => setModalVOVisible(true)}
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
        {/* Pour colorer la bordure du dropdown picker */}
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value1}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue1(item.value);
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
              minimumDate={new Date(Date.now())}
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
        {/* Pour colorer la bordure du dropdown picker */}
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus1 && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value1}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={(item) => {
            setValue2(item.value);
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
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus2 && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value2}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={(item) => {
            setValue2(item.value);
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

      {/* >>>>>>>>>>>>>>>>>>>>> Vaccins recommandés <<<<<<<<<<<<<<<<<<<<<< */}
      <View></View>
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#5BAA62"
          onPress={() => setModalVRVisible(true)}
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
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus3 && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value3}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={(item) => {
            setValue3(item.value);
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
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus4 && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value4}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus4(true)}
          onBlur={() => setIsFocus4(false)}
          onChange={(item) => {
            setValue4(item.value);
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

      {/* >>>>>>>>>>>>>>>>>>>>> Examens de santé recommandés <<<<<<<<<<<<<<<<<<<<<< */}
      <View></View>
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#5BAA62"
          onPress={() => setModalVRVisible(true)}
        />
        <Text style={styles.textTitle} h4>
          Examens de santé recommandés :
        </Text>
      </View>
      <View style={styles.headrow}>
        <Text style={styles.textHeadColumn1}>Vaccin : </Text>
        <Text style={styles.textHeadColumn2}>État : </Text>
        <Text style={styles.textHeadColumn3}>Date : </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textRow}>COVID-19</Text>
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus3 && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value3}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={(item) => {
            setValue3(item.value);
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
        <Dropdown
          style={[
            styles.dropDownPickerState,
            isFocus4 && { borderColor: "#5BAA62" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={value4}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state}
          multiple={false} //Permet de sélectionner une seule option
          onFocus={() => setIsFocus4(true)}
          onBlur={() => setIsFocus4(false)}
          onChange={(item) => {
            setValue4(item.value);
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

      {/*>>>>>>>>>>>>>>>>>>>>> Vaccins/Examens projets personnels <<<<<<<<<<<<<<<<<<<<<< */}
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#5BAA62"
          onPress={() => setModalVPPVisible(true)}
        />
        <Text style={styles.textTitle} h4>
          Vaccins/Examens projets personnels :
        </Text>
      </View>

      {/*>>>>>>>>>>>>>>>>>>>>> Ajouter un vaccin/un examen <<<<<<<<<<<<<<<<<<<<<< */}
      {/* Ajout d'une ligne quand le user clic sur l'icône + */}
      {healthCarePerso}
      <View style={styles.title}>
        <AntDesign
          name="pluscircle"
          size={24}
          color="#5BAA62"
          onPress={() => {
            addVaccines();
          }}
        />
        <Text style={styles.text}>Ajouter un vaccin </Text>
      </View>

      {/*>>>>>>>>>>>>>>>>>>>>> Modal vaccins obligatoires <<<<<<<<<<<<<<<<<<<<<< */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={modalVOVisible}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setModalVOVisible(false)}
              ></TouchableOpacity>
            </View>
          </View>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#FFFFFF"
              onPress={() => setModalVOVisible(true)}
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
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
              buttonStyle={styles.buttonModal}
              onPress={() => setModalVOVisible(false)}
            />
          </View>
        </ModalPoup>
      </View>

      {/*>>>>>>>>>>>>>>>>>>>>> Modal vaccins recommandés <<<<<<<<<<<<<<<<<<<<<< */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={modalVRVisible}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setModalVRVisible(false)}
              ></TouchableOpacity>
            </View>
          </View>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#FFFFFF"
              onPress={() => setModalVRVisible(true)}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                paddingLeft: 9,
              }}
              h4
            >
              Vaccins recommandés :
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                marginVertical: 30,
                fontSize: 17,
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              Des vaccins existent contre diverses maladies graves telles que la
              tuberculose, l'hépatite A... S’ils ne sont pas obligatoires, ils
              restent la meilleure façon d’éviter ces maladies et de protéger
              les personnes fragiles (nourrissons, femmes enceintes, personnes
              âgées…).
            </Text>
            <Button
              title="OK"
              type="solid"
              buttonStyle={styles.buttonModal}
              onPress={() => setModalVRVisible(false)}
            />
          </View>
        </ModalPoup>
      </View>

      {/*>>>>>>>>>>>>>>>>>>>>> Modal vaccins projets personnels <<<<<<<<<<<<<<<<<<<<<< */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ModalPoup visible={modalVPPVisible}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setModalVPPVisible(false)}
              ></TouchableOpacity>
            </View>
          </View>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#FFFFFF"
              onPress={() => setModalVPPVisible(true)}
            />
            <Text
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                paddingLeft: 9,
              }}
              h4
            >
              Vaccins projets personnels :
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                marginVertical: 30,
                fontSize: 17,
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              Si vous souhaitez réaliser un vaccin qui n'apparait pas dans la
              liste des vaccins obligatoires et des vaccins recommandés vous
              pouvez en ajouter dans la section "Vaccins projets personnels" en
              cliquant sur
              <AntDesign
                name="pluscircle"
                size={24}
                color="#FFFFFF"
                style={{
                  paddingLeft: 15,
                }}
              />{" "}
              situé sur votre profil.
            </Text>
            <Button
              title="OK"
              type="solid"
              buttonStyle={styles.buttonModal}
              onPress={() => setModalVPPVisible(false)}
            />
          </View>
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
    width: 100,
    height: 40,
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
  DropDownPicker: { borderColor: "#37663B", marginTop: 50 },
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
    borderWidth: 0.5,
  },
  dropDownPickerVaccines: {
    height: 50,
    width: 100,
    borderColor: "transparent",
    borderRadius: 0,
    borderColor: "#EBFAD5",
    paddingRight: 0,
    borderWidth: 0.5,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
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
    backgroundColor: "#5BAA62",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 200,
    backgroundColor: "#FFFFFF",
    // paddingHorizontal: 20,
    // justifyContent: "space-between",
  },
  selectedTextStyle: {
    fontSize: 13,
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
    borderRadius: 0,
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
