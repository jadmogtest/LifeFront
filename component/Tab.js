import TabBar from "react-native-nav-tabbar";
import { Text, View, Icon, StyleSheet } from "react-native";
import { AntDesign, Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";

export default function Tab(props) {
  return (
    <View style={styles.container}>
      <View style={styles.onglet}>
        <FontAwesome
          name="home"
          size={24}
          color="white"
          onPress={() => {
            // Navigation();
            props.navigation.navigate("Dashboard", {
              screen: "DashboardScreen",
            });
            console.log("click détecté");
          }}
        />
        <Text style={styles.textContent}>Dashboard</Text>
      </View>
      <View style={styles.onglet}>
        <FontAwesome name="user" size={24} color="white" />
        <Text style={styles.textContent}>Profil</Text>
      </View>
      <View style={styles.onglet}>
        <Ionicons name="settings-sharp" size={24} color="white" />
        <Text style={styles.textContent}>Settings</Text>
      </View>
    </View>
  );
}

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5BAA62",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 50,
    padding: 14,
    paddingBottom: 6,
  },
  onglet: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    color: "white",
    fontSize: 11,
  },
});
