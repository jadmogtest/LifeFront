// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
export default function MapScreen() {
    //Dropdown list choix lieux de santé
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([
      "Médecins généralistes",
      "Centres de vaccinations",
      "Pharmacie",
    ]);
    const [items, setItems] = useState([
      //Profil
      { label: "Profil", value: "Profil" },
      { label: "Claire", value: "Claire", parent: "Profil" },
      { label: "Mandy", value: "Mandy", parent: "Profil" },
      { label: "Jad", value: "Jad", parent: "Profil" },
      { label: "Nicolas", value: "Nicolas", parent: "Profil" },
    ]);
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
        <MapView style={styles.map} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})