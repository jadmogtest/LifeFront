// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import Tab from "../component/Tab";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Modal,
  Pressable,
  Icon,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-element-dropdown";
//* Connexion avec redux : npm install --save redux react-redux */
import { connect } from "react-redux";
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function MapScreen(props) {
  //Variables pour la liste Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState();

  //Variables qui vont stocker les données du modèle HCProfessionnal afin de les enregistrer en BDD
  const [profession, setProfession] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [tel, setTel] = useState("");
  const [category, setCategory] = useState("");
  const [secteur, setSecteur] = useState("");

  //Variable qui va stocker les coordonnées en temps réel
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);

  // //Variable qui va stocker les données API
  // const [listAPI, setListAPI] = useState([]);
  // const temp = [];

  //Variable qui va stocker les types de professionnels de santé par rapport à l'API
  const [listType, setListType] = useState([]);
  const [jobs, setJobs] = useState([]);
  // const jobs = [];

  //Variable qui va changer les markers en fonctions du type professionnel de santé
  const [markerCategory, setMarkerCategory] = useState([]);

  const [text, onChangeText] = React.useState();

  //Variable qui va rendre visible ou non le modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  //Fonction qui demande l'autorisation de géolocation à l'initialisation du composant
  useEffect(() => {
    // console.log("CHRISTIAN:::", props.route.params);
    async function askPermissions() {
      var { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          //Fonction qui récupère la géolocalisation en temps réel tous les 2 mètres
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
          // console.log("|| Coords ||", location);
        });
      }
    }

    // //Fonction qui exploite les données API
    // async function loadData() {
    //   var rawResponse = await fetch(
    //     "https://data.opendatasoft.com/api/records/1.0/search/?dataset=medecins%40public&q=&rows=150"
    //   );
    //   var response = await rawResponse.json();
    //   //Boucle pour poush les données API dans le tableau "temp"
    //   for (let item of response.records) {
    //     if (
    //       item.fields.coordonnees &&
    //       item.fields.libelle_regroupement != "none" &&
    //       item.fields.libelle_regroupement != "None" &&
    //       item.fields.libelle_regroupement != undefined
    //     ) {
    //       temp.push({
    //         latitude: item.fields.coordonnees[0],
    //         longitude: item.fields.coordonnees[1],
    //         profession: item.fields.libelle_profession,
    //         categorie: item.fields.libelle_regroupement,
    //         adresse: item.fields.adresse,
    //         ville: item.fields.commune,
    //         tel: item.fields.column_10,
    //         secteur: item.fields.column_14,
    //       });
    //     }
    //   }
    //   console.log("|| Prof. de santé ||", temp.length);
    //   setListAPI(temp);
    // }
    askPermissions();
    // loadData();
    listCategory();
    console.log("JOBS::::", jobs);
  }, []);

  //Boucle pour supprimer les catégories en doublon et les push dans le tableau "jobs"
  function listCategory() {
    for (let i = 0; i < props.route.params.listAPI.length; i++) {
      //push dans le tableau ttes les catégories
      jobs.push({
        label: props.route.params.listAPI[i].categorie,
        value: props.route.params.listAPI[i].categorie,
      });
      //exploiter le tableau d'objets
      let jsonObject = jobs.map(JSON.stringify);
      let uniqSet = new Set(jsonObject);
      //créé un nouveau tableau d'objets uniques !
      let newArr = Array.from(uniqSet).map(JSON.parse);
      setJobs(newArr.sort());
    }
    // console.log("|| Catégories ||", jobs);
  }

  //Variable qui capture la valeur sélectionnée du dropdown
  const [catMap, setcatMap] = useState("");
  //Fonction : map un nvx tableau à partir de celui de l'API pour créer un tableau de markers et en fonction de la catégorie sélectionnée
  let tab = props.route.params.listAPI;
  console.log("TEST ::::", tab[0]);
  let markerlist = tab
    .filter((el) => el.categorie == catMap.label || !catMap)
    .map((marker, i) => {
      let infos = {
        Profession: marker.profession.toUpperCase(),
        Adresse: marker.adresse.toLowerCase(),
        Ville: marker.ville,
        Tel: marker.tel,
        Secteur: marker.secteur,
      };
      return (
        <Marker
          key={Math.random()}
          pinColor="blue"
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
            props.pushInfos(infos);
            // setProfession(marker.profession);
            // setAdresse(marker.adresse);
            // setVille(marker.ville);
            // setTel(marker.tel);
            // setSecteur(marker.secteur);
            // setCategory(listAPI.categorie);
            // console.log("TEST :::", );
          }}
        />
      );
    });

  // let newHCPro = (profession, adresse, ville, tel, category, secteur) => {
  //   async function addHCPro() {
  //     //Remplacer privateIp par la vôtre
  //     let privateIp = "172.20.10.3"; //Remplacer privateIp par la vôtre
  //     let fetchRouteAddhcpro = await fetch(
  //       `http://${privateIp}:3000/addhcpro`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //         body: `professionFromFront=${profession}&adresseFromFront=${adresse}&villeFromFront=${ville}&telFromFront=${tel}&categoryFromFront=${category}&secteurFromFront=${secteur}`,
  //       }
  //     );
  //   }
  // };

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <View style={styles.container}>
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={jobs}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Rechercher un professionnel de santé"
          value={value}
          onChange={(item) => setcatMap(item)}
          onPress={() => {
            mapCategory();
          }}
          renderLeftIcon={() => (
            <Entypo style={styles.icon} color="#5BAA62" name="leaf" size={20} />
          )}
        />
      </View>
      <View style={{ position: "relative" }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 43.604652, // pour centrer la carte
            longitude: 1.444209,
            latitudeDelta: 0.0922, // le rayon à afficher à partir du centre
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            key={"currentPos"}
            pinColor="green"
            title="Hello"
            description="I'am here"
            // icon = {require('../assets/leaf.png') }
            // size={20}
            coordinate={{
              latitude: 43.604652,
              longitude: 1.444209,
            }}
            draggable
          />
          {markerlist}
        </MapView>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#5BAA62",
                  marginBottom: 8,
                }}
              >
                {props.dataMedecin.Profession}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setModalVisible2(!modalVisible2);
                    // newHCPro(
                    //   profession,
                    //   adresse,
                    //   ville,
                    //   tel,
                    //   category,
                    //   secteur
                    // );
                  }}
                >
                  <Ionicons name="add-circle" size={20} color="green" />
                </Pressable>
                <Text style={{ fontStyle: "italic", fontSize: 12 }}>
                  Ajouter en favori
                </Text>
              </View>
              <Text style={styles.modalText}>
                Adresse : {props.dataMedecin.Adresse}
                {"\n"}
                Ville : {props.dataMedecin.Ville}
                {"\n"}
                Tel : {props.dataMedecin.Tel}
                {"\n"}
                Secteur : {props.dataMedecin.Secteur}
              </Text>
              <View style={styles.align}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View>
                    <Ionicons name="close" size={20} color="red" />
                  </View>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible2);
            }}
          >
            <View style={styles.modalView2}>
              <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#ffff",
                    marginBottom: 2,
                    textAlign: "center",
                  }}
                >
                  Le professionnel de santé a bien été ajouté à votre carnet
                  d'adresses !
                </Text>
              </Pressable>
            </View>
          </Modal>
        </View>
        {/* <Tab /> */}
      </View>
    </View>
  );
}

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAD5",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  dropdown: {
    margin: 16,
    height: 50,
    marginTop: 170,
    width: 300,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderColor: "#5BAA62",
    borderWidth: 0,
    backgroundColor: "white",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderBottomtWidth: 4,
    borderColor: "#5BAA62",
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "justify",
    fontSize: 12,
  },
  modalView2: {
    backgroundColor: "#5BAA62",
    padding: 15,
    marginLeft: 30,
    marginTop: 350,
    width: 300,
    heigth: 100,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  //   position: "absolute",
  // },
});

function mapDispatchToProps(dispatch) {
  return {
    pushInfos: function (infos) {
      dispatch({ type: "AddSoin", datas: infos });
    },
  };
}

function mapStateToProps(state) {
  return { dataMedecin: state.etab };
}
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
