import { Calendar, LocaleConfig } from 'react-native-calendars';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';



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

export default function DashBoard(props) {

    const [visible, setVisible] = useState(false)
    const [overlayContent, setOverlayContent] = useState([{}])



    let exams = [
        { name: "Prise de sang", date: '2022-05-13' },
        { name: "Détartrage", date: '2022-05-26' },
        { name: "Vaccin covid", date: '2022-05-31' },
        { name: "Ophtalmo", date: '2022-06-29' },
    ]
    let markedDates = {}




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

    return (
        <View style={styles.container}>
            <Overlay
                overlayStyle={{ flex: 0.5, width: 300, borderRadius: 50 }}
                width="5000"
                isVisible={visible}
                onBackdropPress={() => { setVisible(false) }}
            >
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 30 }}>{overlayContent[0].date}</Text>
                    <Text style={{ fontSize: 30 }}>{overlayContent[0].name}</Text>
                </View>

            </Overlay>
            <Text style={{ marginBottom: 30, fontSize: 30, color: "green", fontStyle: 'italic' }}>Bonjour Marie !</Text>
            <Button
                buttonStyle={styles.bigButton}
                title="Profil santé"
            />
            <Button
                buttonStyle={styles.bigButton}
                title="Rechercher un professionnel de santé"
            />
            <Button
                buttonStyle={styles.bigButton}
                title="Mes lieux de santé"
                onPress={() =>
                    props.navigation.navigate("MapScreen", { screen: "MapScreen" })}
            />
            <Calendar
                locale="fr"
                onDayPress={day => {
                    if (visible === false) {

                        let filter = exams.filter(e => e.date === day.dateString)

                        if (filter[0] !== undefined) {
                            setVisible(true)
                            setOverlayContent(filter)
                        } else if (filter[0] === undefined) {
                            filter.push({ date: day.dateString, name: "Pas d'examen prévu" })
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
