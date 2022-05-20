// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import Tab from "../component/Tab";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Icon,
} from "react-native";
import { AntDesign, Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Dropdown } from "react-native-element-dropdown";
import { Marker } from "react-native-maps";
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
export default function MapScreen(props) {
  //Dropdown list choix lieux de santé
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState();

  //Variable qui va stocker les coordonnées en temps réel
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLongitude, setCurrentLongitude] = useState(0);

  //Variable qui va stocker les données API
  const [listAPI, setListAPI] = useState([]);
  const temp = [];

  //Variable qui va stocker les types de professionnels de santé par rapport à l'API
  const [listType, setListType] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [text, onChangeText] = React.useState();

  //Fonction qui demande l'autorisation de géolocation à l'initialisation du composant
  useEffect(() => {
    async function askPermissions() {
      var { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 2 }, (location) => {
          //Fonction qui récupère la géolocalisation en temps réel tous les 2 mètres
          setCurrentLatitude(location.coords.latitude);
          setCurrentLongitude(location.coords.longitude);
          console.log("|| Coords ||", location);
        });
      }
    }

    //Fonction qui exploite les données API
    async function loadData() {
      var rawResponse = await fetch(
        "https://data.opendatasoft.com/api/records/1.0/search/?dataset=medecins%40public&q=&rows=5"
      );
      var response = await rawResponse.json();
      //Boucle pour poush les données API dans le tableau "temp"
      for (let item of response.records) {
        if (item.fields.coordonnees) {
          temp.push({
            latitude: item.fields.coordonnees[0],
            longitude: item.fields.coordonnees[1],
            profession: item.fields.libelle_profession,
            type: item.fields.libelle_regroupement,
            adresse: item.fields.adresse,
            tel: item.fields.column_10,
            secteur: item.fields.column_14,
          });
          console.log("|| Prof. de santé ||", temp);
        }
      }
      setListAPI(temp);
    }
    askPermissions();
    loadData();
    listCategory();
  }, []);

  //Boucle pour push les types d'établissement de santé dans le tableau "jobs" si le type n'existe pas déjà
  function listCategory() {
    for (let i = 0; i < listAPI.length; i++) {
      let found = jobs.find((element) => element == listAPI[i].type);
      if (
        !found ||
        listAPI[i].type != "none" ||
        listAPI[i].type != "None" ||
        listAPI[i].type != undefined
      ) {
        // jobs = [...jobs, { label: listAPI[i].type, value: listAPI[i].type }];
        setJobs((prevState) => [
          ...prevState,
          { label: listAPI[i].type, value: listAPI[i].type },
        ]);
        // jobs.push(listAPI[i].type);
      }
    }
  }

  //Fonction : map un nvx tableau à partir de celui de l'API pour créer un tableau de markers
  let markerlist = listAPI.map((marker, i) => {
    return (
      <Marker
        key={Math.random()}
        pinColor="blue"
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={marker.profession}
        description={`Adresse : ${marker.adresse}, Tel : ${marker.tel}, Type: ${marker.type}, Secteur: ${marker.secteur}`}
      />
    );
  });

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
          // data={jobs}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Rechercher un professionnel de santé"
          value={value}
          onChange={() => {}}
          renderLeftIcon={() => (
            <Entypo style={styles.icon} color="#5BAA62" name="leaf" size={20} />
          )}
        />
      </View>
      <View style={{ position: "relative" }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.856614, // pour centrer la carte
            longitude: 2.3522219,
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
              latitude: currentLatitude,
              longitude: currentLongitude,
            }}
          />
          {markerlist}
        </MapView>
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
    flex: 0.8,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  dropdown: {
    margin: 16,
    height: 50,
    marginTop: 80,
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
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  //   position: "absolute",
  // },
});
