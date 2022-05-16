import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { CheckBox, Button } from 'react-native-elements'
import DropDownPicker from "react-native-dropdown-picker";



export default function SignUpInfosScreen() {

    //DropDownPicker Sexe
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [sex, setSex] = useState([
        { label: "Homme", value: "Homme" },
        { label: "Femme", value: "Femme" },
    ]);

    //DropDownPicker Job
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [job, setJob] = useState([
        { label: "Militaire", value: "Militaire" },
        { label: "Médical", value: "Médical" },
        { label: "Autre", value: "Autrel" },
    ]);

    //DropDownPicker Pathos
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [pathos, setPathos] = useState([
        { label: "Diabète", value: "Diabète" },
        { label: "endométriose", value: "endométriose" },
        { label: "Cholestérol", value: "Cholestérol" },
    ]);

    //DropDownPicker Antécédents
    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const [ante, setAnte] = useState([
        { label: "Diabète", value: "Diabète" },
        { label: "endométriose", value: "endométriose" },
        { label: "Cholestérol", value: "Cholestérol" },
    ]);

    //CheckBox1
    const [check, setCheck] = useState(false)


    //CheckBox1
    const [check2, setCheck2] = useState(false)



    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 30, fontSize: 20, color: "green", fontStyle: 'italic' }}>Vos informations</Text>
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Nom"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Prénom"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />
            <TextInput
                icon="key"
                style={styles.input}
                placeholder="Date de naissance JJ/MM/AAAA"
                autoCorrect={false}
                secureTextEntry
                underlineColorAndroid="transparent"
            // value={password}
            // onChangeText={(value) => setPassword(value)}
            />
            <View>
                <DropDownPicker
                    style={styles.dropDownPicker}
                    dropDownContainerStyle={{ width: 300 }}
                    // dropDownDirection="TOP"
                    open={open}
                    value={value}
                    items={sex}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setSex}
                    placeholder="Sexe"

                />
                <DropDownPicker
                    style={styles.dropDownPicker}
                    dropDownContainerStyle={{ width: 300 }}
                    open={open2}
                    value={value2}
                    items={job}
                    setOpen={setOpen2}
                    setValue={setValue2}
                    setItems={setJob}
                    placeholder="Catégorie professionnelle"
                />
                <Text style={{ marginTop: 30, fontSize: 15, color: "green", fontStyle: 'italic', textAlign: "center" }}>Informations complémentaires de santé</Text>
                <DropDownPicker
                    style={styles.dropDownPicker}
                    dropDownDirection="BOTTOM"
                    dropDownContainerStyle={{ width: 300 }}
                    open={open3}
                    value={value3}
                    items={pathos}
                    setOpen={setOpen3}
                    setValue={setValue3}
                    setItems={setPathos}
                    placeholder="Pathologies"


                />
                <DropDownPicker
                    style={styles.dropDownPicker}
                    dropDownDirection="BOTTOM"
                    dropDownContainerStyle={{ width: 300 }}
                    open={open4}
                    value={value4}
                    items={ante}
                    setOpen={setOpen4}
                    setValue={setValue4}
                    setItems={setAnte}
                    placeholder="Antécédents familiaux"

                />
            </View>
            <View>
                <CheckBox
                    title="Je certifie sur l'honneur l'exactitude des renseignements fournis."
                    checked={check}
                    onPress={() => {
                        if (check === false) {
                            setCheck(true)
                        } else if (check === true) {
                            setCheck(false)
                        }
                    }
                    }
                />
                <CheckBox

                    title="Accepter les termes d’utilisation"
                    checked={check2}
                    onPress={() => {
                        if (check2 === false) {
                            setCheck2(true)
                        } else if (check2 === true) {
                            setCheck2(false)
                        }
                    }
                    }
                />

            </View>
            <Button
                buttonStyle={styles.smallButton}
                title="Valider"

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
    input: {
        height: 40,
        width: 300,
        margin: 12,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        fontStyle: "italic"
    },

    dropDownPicker: {
        width: 300,
        marginVertical: 5,
        zIndex: -1,
    },
    smallButton: {
        backgroundColor: "#5BAA62",
        marginTop: 10,
        borderRadius: 50,
        height: 50,
        width: 100

    }


})