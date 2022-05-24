// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown"; //npm install react-native-element-dropdown --save
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";

import { connect } from "react-redux";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COMPOSENT MODAL INFOS ICÔNES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const ModalDelete = ({ visible, children }) => {
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
function SettingScreen(props) {
  //DropDownPicker Sexe
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [sex, setSex] = useState([
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
  ]);

  //DropDownPicker Job
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [job, setJob] = useState([
    { label: "Militaire", value: "Militaire" },
    { label: "Médical", value: "Médical" },
    { label: "Autre", value: "Autre" },
  ]);

  //DropDownPicker Pathos
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState([]);
  const [pathos, setPathos] = useState([
    { label: "Diabète", value: "Diabète" },
    { label: "Endométriose", value: "Endométriose" },
    { label: "Cholestérol", value: "Cholestérol" },
  ]);

  //DropDownPicker Antécédents
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [ante, setAnte] = useState([
    { label: "Diabète", value: "Diabète" },
    { label: "Endométriose", value: "Endométriose" },
    { label: "Cholestérol", value: "Cholestérol" },
  ]);

  //Fonction Click Valider => infos vers Backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sexe, setSexe] = useState("");
  const [profession, setProfession] = useState("");
  const [illnesses, setIllnesses] = useState([]);
  const [familyHistory, setFamilyHistory] = useState([]);
  const [pwdConfirmed, setPwdConfirmed] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  /* Fonctions pour boutons à la fin du formulaire */
  const [logout, setLogout] = useState(false);
  const [sup, setSup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

  //Bouton déconnection
  const deconnectAccount = () => {
    setLogout(true);
    //Le user est redirigé ver le LogScreen s'il choisi de se déconnecter
    props.navigation.navigate("LogScreen", {
      screen: "LogScreen",
    });
  };

  //Bouton suppression
  const deleteButton = () => {
    setSup(true);
    setModalDeleteVisible(true);
  };

  //Bouton valider dans modal de suppression de compte
  const deleteAccount = () => {
    setModalDeleteVisible(false);
    props.navigation.navigate("DeleteAccountScreen", {
      screen: "DeleteAccountScreen",
    });
  };

  //CheckBox
  const [checked, setChecked] = useState(false);

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 60,
            fontSize: 30,
            color: "#37663B",
          }}
        >
          Vos informations
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Dupont"
            editable={false}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Marie"
            editable={false}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            type="date"
            style={styles.input}
            placeholder="12/05/1982"
            editable={false}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            value={birthdate}
            onChangeText={(value) => setBirthdate(new Date(value))}
          />
        </View>

        <View>
          <View style={styles.row}>
            <Dropdown
              style={styles.dropDownPicker}
              placeholder="Sexe"
              value={value}
              data={sex}
              labelField="label"
              valueField="value"
              maxHeight={100}
              setOpen={setOpen}
              onChangeValue={(value) => {
                setSexe(value);
              }}
            />
            <Dropdown
              style={styles.dropDownPicker}
              placeholder="Catégorie professionnelle"
              value={value2}
              data={job}
              labelField="label"
              valueField="value"
              maxHeight={100}
              setOpen={setOpen2}
              onChangeValue={(value) => {
                setProfession(value);
              }}
            />
          </View>
        </View>

        <Text
          style={{
            marginTop: 30,
            fontSize: 15,
            color: "#37663B",
            textAlign: "center",
          }}
        >
          Informations complémentaires de santé
        </Text>
        <View>
          <Dropdown
            style={styles.dropDownPicker}
            placeholder="Pathologies"
            value={value3}
            data={pathos}
            labelField="label"
            valueField="value"
            maxHeight={100}
            setOpen={setOpen3}
            onChangeValue={(value) => {
              setIllnesses(value);
            }}
          />
          <Dropdown
            style={styles.dropDownPicker}
            placeholder="Antécédents familiaux"
            open={open4}
            value={value4}
            data={ante}
            labelField="label"
            valueField="value"
            maxHeight={100}
            setOpen={setOpen4}
            onChangeValue={(value) => {
              setFamilyHistory(value);
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 30,
            fontSize: 15,
            color: "#37663B",
            textAlign: "center",
          }}
        >
          Informations de connexion
        </Text>
        <View style={styles.inputContainer}>
          <View>
            <Icon name="mail" color="#5BAA62" size={30} />
          </View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            underlineColor="transparent"
            theme={{ colors: { primary: "#5BAA62" } }}
            value={email}
            onChangeText={(value) => setEmail(value)}
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
        <Button
          buttonStyle={styles.deconnectButton}
          title="Se Déconnecter"
          onPress={() => deconnectAccount()}
        />
        <Button
          buttonStyle={styles.deleteButton}
          title="Supprimer mon compte"
          onPress={() => deleteButton()}
        />
      </View>

      {/*>>>>>>>>>>>>>>>>>>>>> Modal Suppression de compte <<<<<<<<<<<<<<<<<<<<<< */}
      <ModalDelete visible={modalDeleteVisible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setModalDeleteVisible(false)}
            ></TouchableOpacity>
          </View>
        </View>
        <View style={styles.title}>
          <Ionicons
            name="warning"
            size={100}
            color="#FFFFFF"
            onPress={() => setModalDeleteVisible(true)}
          />
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
            Vous êtes sur le point de supprimer votre compte utilisateur. Sa
            suppression est irréversible et entrainera la suppression de
            l'intégralité des informations que vous avez saisie.{" "}
          </Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              center
              status={checked ? "checked" : "unchecked"}
              value={checked}
              checked={checked}
              checkedColor="#FFFFFF"
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.textCheckbox}>
              Je confirme la suppression définitive de mon compte
            </Text>
          </View>
          <Button
            title="Valider"
            buttonStyle={styles.buttonModal}
            onPress={() => deleteAccount()}
          />
        </View>
      </ModalDelete>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBFAD5",
  },
  deconnectButton: {
    backgroundColor: "#5BAA62",
    borderRadius: 40,
    width: 180,
    height: 50,
    marginTop: 20,
  },
  deleteButton: {
    borderRadius: 40,
    backgroundColor: "#5BAA62",
    width: 250,
    height: 50,
    margin: 10,
  },
  dropDownPicker: {
    height: 30,
    width: 300,
    borderRadius: 0,
    borderColor: "#EBFAD5",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#FFF",
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
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#5BAA62",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  row: {
    alignItems: "center",
  },
  textCheckbox: {
    color: "#FFF",
    justifyContent: "center",
  },
  title: {
    justifyContent: "center",
  },
});
function mapDispatchToProps(dispatch) {
  return {
    tokenStore: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    setUserId: function (userId) {
      dispatch({ type: "addUserId", userId: userId });
    },
  };
}
export default connect(null, mapDispatchToProps)(SettingScreen);
