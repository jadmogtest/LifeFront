// CODES DÉSACTIVATION WARNING SUR MOBILE
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
import { ViewPropTypes } from "deprecated-react-native-prop-types";

// IMPORT DES DIFFERENTES LIBRAIRIES
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

// IMPORT DES DIFFERENTS COMPOSANTS NAVIGATION
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// IMPORT DES DIFFERENTS COMPOSANTS SCREEN
import DashboardScreen from "./screens/DashboardScreen";
import LogScreen from "./screens/LogScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SettingsScreen from "./screens/SettingsScreen";
import MapScreen from "./screens/MapScreen";
import AddressBookScreen from "./screens/AddressBookScreen";
import SignUpInfoScreen from "./screens/SignUpInfoScreen";
import AddProfileScreen from "./screens/AddProfileScreen";
import DeleteAccountScreen from "./screens/DeleteAccountScreen";

// NAVIGATION
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// <<<<<<<<<<<<<<<<<<<< J'INITIALISE LE STORE >>>>>>>>>>>>>>>>>>>>>>
/* J'importe les reducers */
import mail from "./reducers/mail";
import userId from "./reducers/userId";
import etab from "./reducers/healthcarepro";
import token from "./reducers/token";
import list from "./reducers/list";

/* J'importe le Provider */
import { Provider } from "react-redux";
/* J'importe le Store */
import { createStore, combineReducers } from "redux";
/* Je crée le store */
const store = createStore(combineReducers({ etab, list, mail, userId, token })); //J'appelle les reducers

// FONCTION TABBAR
function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "ProfilScreen") {
            iconName = "user";
          } else if (route.name === "Settings") {
            iconName = "gear";
          }
          return <FontAwesome name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#B6E5BB",
        inactiveTintColor: "#FFFFFF",
        activeBackgroundColor: "#5BAA62",
        inactiveBackgroundColor: "#B6E5BB",
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ProfilScreen" component={ProfilScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// FONCTION NAVIGATION
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LogScreen" component={LogScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="SignUpInfoScreen" component={SignUpInfoScreen} />
          {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
          <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
          <Stack.Screen
            name="AddressBookScreen"
            component={AddressBookScreen}
          />
          <Stack.Screen name="AddProfileScreen" component={AddProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="DeleteAccountScreen"
            component={DeleteAccountScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAD5",
    alignItems: "center",
    justifyContent: "center",
  },
});
