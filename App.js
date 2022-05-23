// CODES DÉSACTIVATION WARNING SUR MOBILE
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(["Disconnected from Metro."]);
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
import FavoriteScreen from "./screens/FavoriteScreen";
import SignUpInfosScreen from "./screens/SignUpInfosScreen";

// NAVIGATION
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// <<<<<<<<<<<<<<<<<<<< J'INITIALISE LE STORE >>>>>>>>>>>>>>>>>>>>>>
/* J'importe les reducers */
import mail from "./reducers/mail";
import userId from "./reducers/userId";
import etab from "./reducers/etablissementsdesante";
import token from "./reducers/token";

/* J'importe le Provider */
import { Provider } from "react-redux";
/* J'importe le Store */
import { createStore, combineReducers } from "redux";
/* Je crée le store */
const store = createStore(combineReducers({ mail, etab, userId, token })); //J'appelle les reducers

// FONCTION TABBAR
function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Profil") {
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
      <Tab.Screen name="Profil" component={ProfilScreen} />
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
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
          <Stack.Screen
            name="SignUpInfosScreen"
            component={SignUpInfosScreen}
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
