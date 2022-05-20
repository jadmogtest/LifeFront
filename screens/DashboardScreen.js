import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';


//Pour mettre le calendrier en français
LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui",
    firstDayMonday: true
};
LocaleConfig.defaultLocale = 'fr';



function DashBoardScreen(props) {

    const [visible, setVisible] = useState(false)
    const [overlayContent, setOverlayContent] = useState([{}])
    const [exams, setExams] = useState([])


    //Récupération des vaccins et tests médicaux en BDD
    useEffect(() => {
        async function takeExams() {
            let privateIp = "192.168.10.131"  //Remplacer privateIp par la vôtre
            let brutResponse = await fetch(`http://${privateIp}:3000/exams/${props.userId}`);
            let jsonResponse = await brutResponse.json();
            let vaccinesList = jsonResponse.vaccines
            let medicalTestsList = jsonResponse.medicalTests



            //Création d'un tableau avec TOUS les examens (vaccins et test médicaux) sous forme d'objets {date: , name: }
            let temp = []
            for (let i = 0; i < vaccinesList.length; i++) {
                let date = new Date(vaccinesList[i].endDate)
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();

                if (month < 10)
                    month = '0' + month;
                if (day < 10)
                    day = '0' + day;

                temp.push({
                    name: vaccinesList[i].name,
                    date: `${year}-${month}-${day}`
                })
            }

            for (let i = 0; i < medicalTestsList.length; i++) {
                let date = new Date(medicalTestsList[i].endDate)
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();

                if (month < 10)
                    month = '0' + month;
                if (day < 10)
                    day = '0' + day;

                temp.push({
                    name: medicalTestsList[i].name,
                    date: `${year}-${month}-${day}`
                })
            }
            setExams(temp)
        }
        takeExams()

    }, [overlayContent])

    let markedDates = {}

    //Création des marqueurs de couleur sur le calendrier en fonction de l'échéance
    //Passée = rouge
    //Moins de 32 jours = orange
    //Plus de 32 jours = vert
    for (let i = 0; i < exams.length; i++) {
        let examDate = new Date(exams[i].date)
        let todayDate = new Date()

        let delta = (examDate - todayDate) / (1000 * 3600 * 24)

        if (delta < 0) {
            markedDates[exams[i].date] = { selected: true, selectedColor: 'red' }
        } else if (delta < 32) {
            markedDates[exams[i].date] = { selected: true, selectedColor: 'orange' }
        }
        else if (delta > 32) {
            markedDates[exams[i].date] = { selected: true, selectedColor: 'green' }
        }

    }
    // console.log("Premier", exams)

    // console.log(exams)

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
          Bonjour Marie !
        </Text>
        <Button
          buttonStyle={styles.bigButton}
          title="Profil santé"
          onPress={() =>
            props.navigation.navigate("ProfilScreen", {
              screen: "ProfilScreen",
            })
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
            <Text style={{ marginBottom: 30, fontSize: 30, color: "green", fontStyle: 'italic' }}>Bonjour Marie !</Text>
            <Button
                buttonStyle={styles.bigButton}
                title="Profil santé"
            />
            <Button
                buttonStyle={styles.bigButton}
                title="Rechercher un professionnel de santé"
                onPress={() =>
                    props.navigation.navigate("MapScreen", { screen: "MapScreen" })}
            />
            <Button
                buttonStyle={styles.bigButton}
                title="Mes lieux de santé"

            />
            <Calendar
                locale="fr"
                onDayPress={day => {
                    if (visible === false) {


                        let filter = exams.filter(e => e.date === day.dateString)

                        if (filter[0] !== undefined) {
                            let temp = new Date(filter[0].date)
                            let yy = temp.getFullYear();
                            let mm = temp.getMonth() + 1;
                            let dd = temp.getDate();

                            if (mm < 10)
                                mm = '0' + mm;
                            if (dd < 10)
                                dd = '0' + dd;

                            filter[0].date = `${dd}-${mm}-${yy}`

                            setVisible(true)
                            setOverlayContent(filter)



                        } else if (filter[0] === undefined) {
                            filter.push({ date: day.dateString, name: "Pas d'examen prévu" })
                            let temp = new Date(filter[0].date)
                            let yy = temp.getFullYear();
                            let mm = temp.getMonth() + 1;
                            let dd = temp.getDate();

                            if (mm < 10)
                                mm = '0' + mm;
                            if (dd < 10)
                                dd = '0' + dd;

                            filter[0].date = `${dd}-${mm}-${yy}`
                            setVisible(true)
                            setOverlayContent(filter)
                        }


                    } else if (visible === true) {
                        setVisible(false)
                    }


                }}
                style={styles.calendar}
                markedDates={markedDates}
            />
        </View>
    )
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
        width: 300
    },
    calendar: {
        width: 300,
        marginTop: 30,

    }
})

function mapStateToProps(state) {
    return { userId: state.userId }
}

export default connect(mapStateToProps, null)(DashBoardScreen);