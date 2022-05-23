import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { connect } from "react-redux";
import { TextInput } from "react-native-paper";

function SignUpInfosScreen(props) {
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
    { label: "endométriose", value: "endométriose" },
    { label: "Cholestérol", value: "Cholestérol" },
  ]);

  //DropDownPicker Antécédents
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState([]);
  const [ante, setAnte] = useState([
    { label: "Diabète", value: "Diabète" },
    { label: "endométriose", value: "endométriose" },
    { label: "Cholestérol", value: "Cholestérol" },
  ]);

  //CheckBox1
  const [check, setCheck] = useState(false);

  //CheckBox1
  const [check2, setCheck2] = useState(false);

  //Fonction Click Valider => infos vers Backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sexe, setSexe] = useState("");
  const [profession, setProfession] = useState("");
  const [illnesses, setIllnesses] = useState([]);
  const [familyHistory, setFamilyHistory] = useState([]);
  const [pwdConfirmed, setPwdConfirmed] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);

  var handleSubmitSignUp = (
    email,
    password,
    firstName,
    lastName,
    birthdate,
    sexe,
    profession,
    illnesses,
    familyHistory
  ) => {
    async function addUser() {
      let privateIp = "192.168.10.125"; //Remplacer privateIp par la vôtre
      let rawRecUser = await fetch(`http://${privateIp}:3000/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `emailFromFront=${email}&passwordFromFront=${password}&firstnameFromFront=${firstName}&lastnameFromFront=${lastName}&birthdateFromFront=${birthdate}&sexFromFront=${sexe}&professionFromFront=${profession}&illnessesFromFront=${illnesses}&familyHistoryFromFront=${familyHistory}`,
      });
      var recUser = await rawRecUser.json();

      if (recUser.result === true) {
        props.tokenStore(recUser.saveUser.token);
        props.navigation.navigate("Dashboard");


      }
    }
    if (pwdConfirmed && check === true && check2 === true) {
      addUser();

    }
  };



  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 60,
            fontSize: 30,
            color: "green",
            fontStyle: "italic",
          }}
        >
          Vos informations
        </Text>
        <TextInput
          icon="key"
          style={styles.input}
          placeholder="Nom"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={lastName}
          onChangeText={(value) => setLastName(value)}
        />
        <TextInput
          icon="key"
          style={styles.input}
          placeholder="Prénom"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
        />
        <TextInput
          type="date"
          icon="key"
          style={styles.input}
          placeholder="Date de naissance MM/JJ/AAAA"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={birthdate}
          onChangeText={(value) => setBirthdate(new Date(value))}
        />

        <View>
          <DropDownPicker
            listMode="SCROLLVIEW"
            style={styles.dropDownPicker}
            dropDownContainerStyle={{ width: 300 }}
            open={open}
            value={value}
            items={sex}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setSex}
            placeholder="Sexe"
            onChangeValue={(value) => {
              setSexe(value);
            }}
          />
          <DropDownPicker
            listMode="SCROLLVIEW"
            style={styles.dropDownPicker}
            dropDownContainerStyle={{ width: 300 }}
            open={open2}
            value={value2}
            items={job}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setJob}
            onChangeValue={(value) => {
              setProfession(value);
            }}
            placeholder="Catégorie professionnelle"
          />
          <Text
            style={{
              marginTop: 30,
              fontSize: 15,
              color: "green",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Informations complémentaires de santé
          </Text>
          <DropDownPicker
            listMode="SCROLLVIEW"
            style={styles.dropDownPicker}
            dropDownDirection="BOTTOM"
            dropDownContainerStyle={{ width: 300 }}
            open={open3}
            value={value3}
            items={pathos}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setPathos}
            onChangeValue={(value) => {
              setIllnesses(value);
            }}
            placeholder="Pathologies"
            theme="LIGHT"
            multiple={true} //Permet de sélectionner plusieurs options
            min={0}
            mode="BADGE"
            valueStyle={{
              fontWeight: "bold",
            }}
          />
          <DropDownPicker
            listMode="SCROLLVIEW"
            style={styles.dropDownPicker}
            dropDownDirection="BOTTOM"
            dropDownContainerStyle={{ width: 300 }}
            open={open4}
            value={value4}
            items={ante}
            setOpen={setOpen4}
            setValue={setValue4}
            setItems={setAnte}
            onChangeValue={(value) => {
              setFamilyHistory(value);
            }}
            placeholder="Antécédents familiaux"
            theme="LIGHT"
            multiple={true} //Permet de sélectionner plusieurs options
            min={0}
            mode="BADGE"
            valueStyle={{
              fontWeight: "bold",
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 30,
            fontSize: 15,
            color: "green",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Informations de connexion
        </Text>
        <TextInput
          icon="key"
          style={styles.input}
          placeholder="email"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          type="password"
          icon="key"
          style={styles.input}
          placeholder="Mot de passe"
          autoCorrect={false}
          secureTextEntry={passwordVisible}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={(value) => setPassword(value)}
          right={
            <TextInput.Icon
              name={passwordVisible ? "eye" : "eye-off"}
              color="#5BAA62"
              size={30}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <TextInput
          icon="key"
          style={styles.input}
          placeholder="Confirmer Mot de passe"
          autoCorrect={false}
          secureTextEntry={passwordVisible2}
          underlineColorAndroid="transparent"
          value={password2}
          onChangeText={(value) => {
            setPassword2(value);
            if (value === password) {
              setPwdConfirmed(true);
            } else {
              setPwdConfirmed(false);
            }
          }}
          right={
            <TextInput.Icon
              name={passwordVisible2 ? "eye" : "eye-off"}
              color="#5BAA62"
              size={30}
              onPress={() => setPasswordVisible(!passwordVisible2)}
            />
          }
        />
        {!pwdConfirmed && (
          <Text style={{ textAlign: "center", color: "red" }}>
            Veuillez entrer le même mot de passe !
          </Text>
        )}
        <View>
          <CheckBox
            title="Je certifie sur l'honneur l'exactitude des renseignements fournis."
            checked={check}
            onPress={() => {
              if (check === false) {
                setCheck(true);
              } else if (check === true) {
                setCheck(false);
              }
            }}
          />
          <CheckBox
            title="Accepter les termes d’utilisation"
            checked={check2}
            onPress={() => {
              if (check2 === false) {
                setCheck2(true);
              } else if (check2 === true) {
                setCheck2(false);
              }
            }}
          />
          {(!check || !check2) && (
            <Text style={{ textAlign: "center", color: "red" }}>
              Veuillez cocher les cases !
            </Text>
          )}
        </View>
        <Button
          buttonStyle={styles.smallButton}
          title="Valider"
          onPress={() =>
            handleSubmitSignUp(
              email,
              password,
              firstName,
              lastName,
              birthdate,
              sexe,
              profession,
              illnesses,
              familyHistory
            )
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAD5",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    fontStyle: "italic",
  },

  dropDownPicker: {
    width: 300,
    marginVertical: 5,
    zIndex: -1,
  },
  smallButton: {
    backgroundColor: "#5BAA62",
    marginTop: 10,
    borderRadius: 50,
    height: 50,
    width: 150,
    marginBottom: 10,
  },
});
function mapDispatchToProps(dispatch) {
  return {
    tokenStore: function (token) {
      dispatch({ type: "addToken", token: token });
    },

  };
}
export default connect(null, mapDispatchToProps)(SignUpInfosScreen);
