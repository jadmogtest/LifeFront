// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState, useEffect } from "react";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Icon } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign, Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Marker} from 'react-native-maps';
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
export default function MapScreen(props) {
//Dropdown list choix lieux de santé
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: "Médecins Généralistes"},
    { label: "Centres de Vaccinations"},
    { label: "Pharmacies"},
    // { label: "Nicolas", value: "Nicolas", parent: "Profil" },
  ]);

const [currentLatitude, setCurrentLatitude] = useState(0);
const [currentLongitude, setCurrentLongitude] = useState(0);

//Fonction qui demande l'autorisation de géolocation à l'initialisation du composant
  useEffect(() => {
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 2 },
          (location) => {
            setCurrentLatitude(location.coords.latitude);
            setCurrentLongitude(location.coords.longitude);
            console.log("Données de géolocalisation : ",location);
          }
          );
      }
    }
    askPermissions();
  }, []);

//Fonction qui récupère la géolocalisation en temps réel tous les 2 mètres     
    Location.watchPositionAsync({distanceInterval: 2},
      (location) => {
        console.log("Données de géolocalisation : ",location);
      }
    );
         
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <View style={styles.container}>
      <View>
        <DropDownPicker
        style={styles.DropDownPicker} 
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        theme="LIGHT"
        multiple={true} //Permet de sélectionner plusieurs options
        min={0}
        mode="BADGE"
        placeholder="Choisir un professionnel de santé"
        placeholderStyle={{
          color: "grey",
          fontStyle: "italic",
        }}
        valueStyle={{
          fontWeight: "bold",
        }}
        arrowIconStyle={{
          width: 20,
          height: 20,
          color: "#5BAA62",
        }}
        dropDownContainerStyle={{
          width: 300,
          borderWidth: 0,
          borderLeftWidth: 4,
          borderColor: "#5BAA62",
        }} //Style du menu déroulant
        badgeDotColors={[
          "#e76f51",
          "#00b4d8",
          "#e9c46a",
          "#e76f51",
          "#8ac926",
          "#00b4d8",
          "#e9c46a",
        ]}
        iconContainerStyle={<FontAwesome5 name="clinic-medical" size={20} color="#5BAA62" />}
          /> 
    </View>
      <MapView style={styles.map}
        initialRegion={{
        latitude: 48.856614,  // pour centrer la carte
        longitude: 2.3522219,
        latitudeDelta: 0.0922,  // le rayon à afficher à partir du centre
        longitudeDelta: 0.0421,
      }}>
        <Marker key={"currentPos"}
          pinColor="red"
          title="Hello"
          description="I'am here"
          // icon = {require('../assets/leaf.png') }
          // size={20}
          coordinate={{ latitude: currentLatitude, longitude: currentLongitude }}
        />
      </MapView>
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
    flex: 0.6,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  DropDownPicker: {
    marginBottom: 35,
    width: 300,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderColor: "#5BAA62",
    borderWidth: 0,
  },
 })