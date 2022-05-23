import { Calendar, LocaleConfig } from "react-native-calendars";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { connect } from "react-redux";

var moment = require("moment");

//Pour mettre le calendrier en français
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
  firstDayMonday: true,
};
LocaleConfig.defaultLocale = "fr";

function DashBoardScreen(props) {
  const [visible, setVisible] = useState(false);
  const [overlayContent, setOverlayContent] = useState([{}]);
  const [exams, setExams] = useState([]);
  const [firstName, setFirstName] = useState("");

  //Récupération des vaccins et tests médicaux en BDD
  useEffect(() => {
    async function takeExams() {
      // let privateIp = "192.168.10.131"; //Remplacer privateIp par la vôtre
      // let privateIp = "192.168.1.43"; //Remplacer privateIp par la vôtre
      let privateIp = "192.168.10.125"; //Remplacer privateIp par la vôtre
      console.log('test', props.token)
      let brutResponse = await fetch(
        `http://${privateIp}:3000/user/${props.token}`
      );
      let jsonResponse = await brutResponse.json();
      let vaccinesList = jsonResponse.vaccines;
      let medicalTestsList = jsonResponse.medicalTests;
      let firstname = jsonResponse.firstname;
      setFirstName(firstname);

      // console.log(firstname);

      //Création d'un tableau avec TOUS les examens (vaccins et test médicaux) sous forme d'objets {date: , name: }
      let temp = [];
      for (let i = 0; i < vaccinesList.length; i++) {
        let date = new Date(vaccinesList[i].endDate);

        // console.log("date 1 !!!!!!!!!!!!!!", date)
        let dateFormated = moment(date).format("YYYY-MM-DD");
        // console.log(moment(date).format('DD-MM-YYYY'))

        temp.push({
          name: vaccinesList[i].name,
          date: dateFormated,
        });
      }

      for (let i = 0; i < medicalTestsList.length; i++) {
        let date = new Date(medicalTestsList[i].endDate);

        // console.log("date 2 !!!!!!!!!!!!!!!", date)
        let dateFormated = moment(date).format("YYYY-MM-DD");
        // console.log(dateFormated)

        temp.push({
          name: medicalTestsList[i].name,
          date: dateFormated,
        });
      }

      setExams(temp);
    }
    takeExams();
  }, [overlayContent]);

  let markedDates = {};

  //Création des marqueurs de couleur sur le calendrier en fonction de l'échéance
  //Passée = rouge
  //Moins de 32 jours = orange
  //Plus de 32 jours = vert
  for (let i = 0; i < exams.length; i++) {
    let examDate = new Date(exams[i].date);
    let todayDate = new Date();

    let delta = (examDate - todayDate) / (1000 * 3600 * 24);

    if (delta < 0) {
      markedDates[exams[i].date] = { selected: true, selectedColor: "red" };
    } else if (delta < 32) {
      markedDates[exams[i].date] = { selected: true, selectedColor: "orange" };
    } else if (delta > 32) {
      markedDates[exams[i].date] = { selected: true, selectedColor: "green" };
    }
  }

  return (
    <View style={styles.container}>
      <Overlay
        overlayStyle={{ flex: 0.5, width: 300, borderRadius: 50 }}
        width="5000"
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
        }}
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 30 }}>{overlayContent[0].date}</Text>
          <Text style={{ fontSize: 30 }}>{overlayContent[0].name}</Text>
        </View>
      </Overlay>
      <Text
        style={{
          marginBottom: 30,
          fontSize: 30,
          color: "green",
          fontStyle: "italic",
        }}
      >
        Bonjour {firstName} !
      </Text>
      <Button
        buttonStyle={styles.bigButton}
        title="Profil santé"
        onPress={() =>
          props.navigation.navigate("ProfilScreen", { screen: "ProfilScreen" })
        }
      />
      <Button
        buttonStyle={styles.bigButton}
        title="Rechercher un professionnel de santé"
        onPress={() =>
          props.navigation.navigate("MapScreen", { screen: "MapScreen" })
        }
      />
      <Button buttonStyle={styles.bigButton} title="Mes lieux de santé" />
      <Calendar
        locale="fr"
        onDayPress={(day) => {
          if (visible === false) {
            let filter = exams.filter((e) => e.date === day.dateString);

            if (filter[0] !== undefined) {
              let temp = new Date(filter[0].date);
              let dateFormated = moment(temp).format("DD-MM-YYYY");
              filter[0].date = dateFormated;

              setVisible(true);
              setOverlayContent(filter);
            } else if (filter[0] === undefined) {
              filter.push({ date: day.dateString, name: "Pas d'examen prévu" });
              let temp = new Date(filter[0].date);
              let dateFormated = moment(temp).format("DD-MM-YYYY");
              filter[0].date = dateFormated;
              setVisible(true);
              setOverlayContent(filter);
            }
          } else if (visible === true) {
            setVisible(false);
          }
        }}
        style={styles.calendar}
        markedDates={markedDates}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAD5",
    alignItems: "center",
    justifyContent: "center",
  },
  bigButton: {
    backgroundColor: "#5BAA62",
    marginBottom: 10,
    borderRadius: 50,
    height: 50,
    width: 300,
  },
  calendar: {
    width: 300,
    marginTop: 30,
  },
});

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, null)(DashBoardScreen);
