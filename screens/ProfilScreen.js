// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IMPORT DES DIFFERENTES LIBRAIRIES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
import React, { useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker"; //npm install react-native-dropdown-picker
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; //npm install @react-native-community/datetimepicker --save
//Librairie avec laquelle pas besoin de gérer le zIndex
import { Dropdown } from "react-native-element-dropdown"; //npm install react-native-element-dropdown --save
import Icon from "react-native-vector-icons/Ionicons";

//* Connexion avec redux : npm install --save redux react-redux */
import { connect } from "react-redux";

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COMPOSENT MODAL INFOS ICÔNES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const ModalInfos = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COMPOSENT MODAL DÉFINITIONS VACCINS/EXAMENS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const ModalDefinitions = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FONCTION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function ProfilScreen(props) {
  //Dropdown list filtre
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    "Examen de santé",
    "Vaccin",
    "Obligatoire",
    "Recommandé",
  ]);

  const [items, setItems] = useState([
    //Profil
    { label: "Profil", value: "Profil", disabled: true }, //disabled: true => le user ne peux pas le sélectionner
    { label: "Claire", value: "Claire", parent: "Profil" },
    { label: "Mandy", value: "Mandy", parent: "Profil" },
    { label: "Jad", value: "Jad", parent: "Profil" },
    { label: "Nicolas", value: "Nicolas", parent: "Profil" },

    //Catégorie
    { label: "Catégorie", value: "Catégorie", disabled: true },
    { label: "Vaccin", value: "Vaccin", parent: "Catégorie" },
    { label: "Examen de santé", value: "Examen de santé", parent: "Catégorie" },

    //Priorité
    { label: "Priorité", value: "Priorité", disabled: true },
    { label: "Obligatoire", value: "Obligatoire", parent: "Priorité" },
    { label: "Recommandé", value: "Recommandé", parent: "Priorité" },
    { label: "Personnel", value: "Personnel", parent: "Priorité" },

    //Priorité
    { label: "Échéancé", value: "Échéancé", disabled: true },
    { label: "Mois prochain", value: "Mois prochain", parent: "Échéancé" },
    {
      label: "6 prochains mois",
      value: "6 prochains mois",
      parent: "Échéancé",
    },
    { label: "Annuelle", value: "Annuelle", parent: "Échéancé" },

    //État
    { label: "État", value: "État", disabled: true },
    { label: "À programmer", value: "À programmer", parent: "État" },
    { label: "Fait", value: "Fait", parent: "État" },
    { label: "Prévus", value: "Prévus", parent: "État" },
  ]);

  let names = ["Claire", "Mandy", "Nicolas", "Jad"];
  let tempArray = items;
  const [tempState, setTempState] = useState({});
  
  //Tableau des données des vaccins
  const [vaccines, setVaccines] = useState([
    //Vaccins obligatoires
    {
      id: 1,
      name: "Diphtérie",
      status: "Obligatoire",
      description:
        "La vaccination antidiphtérique est le seul moyen de contrôler cette infection grave. Le vaccin est composé de la toxine diphtérique purifiée et inactivée. La vaccination est obligatoire pour tous les enfants et les professionnels de santé. La primo-vaccination est maintenant obligatoire chez l’enfant à 2 et 4 mois. Le premier rappel se fait à l’âge de 11 mois et les autres rappels se font à 6 ans, 11/13 ans, 25 ans, 45 ans, 65 ans et puis tous les 10 ans. Les études de séroprévalence montrent qu’une haute proportion de sujets âgés de 50 ans et plus en France ont un titre d’anticorps non détectable ou inférieur au seuil considéré comme protecteur. Ces données soulignent l’importance de suivre les recommandations vaccinales, notamment les rappels tous les 10 ans chez les adultes âgés de plus de 65 ans.",
      date: Date.now(),
    },
    {
      id: 2,
      name: "Rougeole",
      status: "Obligatoire",
      description:
        "Tous les enfants et adultes jeunes doivent être vaccinés contre la rougeole. C’est une vaccination très efficace qui protège de la maladie dans près de 100% des cas après 2 doses de vaccin. La généralisation de la vaccination contre la rougeole a pour objectif l’élimination de la maladie. Celle-ci est possible si 95% des enfants se font vacciner avec 2 doses. Le taux de couverture vaccinale reste insuffisant en France chez les 15-35 ans et chez les nourrissons, ce qui explique que le virus continue à circuler dans le pays.",
      date: Date.now(),
    },
    {
      id: 3,
      name: "Tétanos",
      status: "Obligatoire",
      description:
        "N’importe qui peut contracter un tétanos ; tout le monde est donc concerné par cette vaccination tout au long de la vie. Cette maladie n’étant pas contagieuse, la protection par la vaccination est individuelle et dure au moins vingt ans jusqu’à 65 ans, moins longtemps au-delà. Il est donc indispensable de faire des injections de rappel tout au long de la vie (même si le vaccin n’est obligatoire que pour les nourrissons). La maladie n’est pas immunisante c'est-à-dire que le fait de l’avoir eue ne permet pas au système immunitaire de développer des anticorps garantissant une protection contre cette maladie si le corps y était à nouveau exposé. La protection n’est réalisée que par la vaccination. Le vaccin a également un intérêt en présence d’une blessure à haut risque de tétanos : chez les personnes non à jour de leur vaccination, une injection de vaccin et parfois d’immunoglobulines peuvent être réalisées. Les personnes les moins bien vaccinées en France contre le tétanos sont les personnes âgées (en particulier les femmes qui ont moins bénéficié dans leur vie adulte de rappels, ne serait-ce qu’à l’occasion du service militaire) alors que les activités de jardinage sont très fréquentes dans cette population.",
      date: Date.now(),
    },
    //Vaccins recommandés
    {
      id: 4,
      name: "COVID-19",
      status: "Recommandé",
      description:
        "En France, la vaccination contre la Covid-19 est recommandée pour tous à partir de 5 ans avec 2 doses. Un rappel vaccinal est ensuite recommandé pour toutes les personnes de 12 ans et plus. La vaccination est obligatoire pour les personnes travaillant dans les secteurs sanitaire, social et médico-social avec, depuis le 30 janvier 2022, un rappel exigé. Depuis le 14 mars 2022, il est recommandé aux personnes de 80 ans et plus, aux résidents des EHPAD et USLD et aux personnes immunodéprimées d'effectuer un deuxième rappel (4e dose le plus souvent). Celle-ci peut être faite dès 3 mois après la première dose de rappel ou une infection à la Covid-19. Depuis le 7 avril 2022, les personnes de 60 à 79 ans peuvent recevoir une seconde dose de rappel à partir de 6 mois après le dernier rappel ou une infection à la Covid-19. En France, près de 155 millions d’injections de vaccins ont été réalisées au total au 5 avril 2022 depuis le début de la campagne et actuellement aucun des effets indésirables ne remettent en cause le rapport bénéfice risque des vaccins utilisés. Le variant Omicron est retrouvé dans près de 100% des cas en France. Avec le variant Omicron, les vaccins existants restent efficaces sur les formes graves à condition que la vaccination soit complète avec un rappel. Le ministère de la santé a de nouveau souligné l’importance de la vaccination des femmes enceintes, qui, non-vaccinées, sont particulièrement à risque en cas de Covid-19, les risques concernant à la fois les femmes elles-mêmes et leurs nouveau-nés. De nouvelles études confirment que la vaccination des femmes enceintes est sûre et efficace pour les protéger, elles et leur bébé.",
      date: Date.now(),
    },
    {
      id: 5,
      name: "Hépatite B",
      status: "Recommandé",
      description:
        "La vaccination permet de se protéger très efficacement de cette infection et de diminuer la transmission. La vaccination contre l’hépatite B est obligatoire, en France, pour tous les nourrissons nés à partir du 1er janvier 2018, et recommandée chez les enfants et les adolescents jusqu’à l’âge de 15 ans : les vacciner quand ils sont petits, c’est les protéger pour plus tard lorsqu’ils rencontreront le virus. Comparée à la plupart des pays d’Afrique ou d’Asie, la France est un pays de faible incidence de l'hépatite B par an et le risque d’infection est très faible durant l’enfance. Ce sont les adolescents et surtout les jeunes adultes qui sont les plus exposés au risque d’acquisition du virus de l’hépatite B (relations sexuelles avec partenaires multiples, usage de drogues par voie intraveineuse, voyage dans les pays à risque, professions exposées au sang, etc.) Il est important de veiller à ce que les enfants soient vaccinés avant l’âge d’apparition du risque, c’est-à-dire avant 16 ans.",
      date: Date.now(),
    },
  ]);

  //Tableau des données des examens
  const [exams, setExams] = useState([
    //Examens obligatoires
    {
      id: 1,
      name: "examen1",
      status: "Obligatoire",
      description: "",
      date: Date.now(),
    },
    {
      id: 2,
      name: "examen2",
      status: "Obligatoire",
      description: "",
      date: Date.now(),
    },
    {
      id: 3,
      name: "examen3",
      status: "Obligatoire",
      description: "",
      date: Date.now(),
    },
    {
      id: 4,
      name: "examen4",
      status: "Obligatoire",
      description: "",
      date: Date.now(),
    },
    //Examens recommandés
    {
      id: 5,
      name: "Bilan sanguin",
      status: "Recommandé",
      description:
        "Un bilan sanguin regroupe un ensemble d’analyses réalisées à partir d’un prélèvement sanguin. Les paramètres à étudier sont sélectionnés par le médecin en fonction du diagnostic envisagé ou des organes suspectés. Un bilan sanguin permet de mesurer, selon les besoins, la concentration sanguine de divers éléments, tels que les globules rouges ou blancs, certaines hormones, des protéines, un agent infectieux, etc.",
      date: Date.now(),
    },
    {
      id: 6,
      name: "ECBU",
      status: "Recommandé",
      description:
        "L'ECBU, examen cytobactériologique des urines (ou cytologie urinaire), est notamment pratiqué lorsqu'une infection urinaire est suspectée. Il consiste à recueillir et à analyser les urines, pour détecter une concentration anormalement élevée de leucocytes, signe d'une infection. De nombreuses substances peuvent être analysées et détectées dans les urines. Les analyses d'urines permettent d'aider au diagnostic de certaines pathologies, mais aussi de mieux définir leur traitement. Mais elles permettent aussi de savoir si une femme est enceinte par exemple.",
      date: Date.now(),
    },
  ]);

  /* DropDownPicker État */
  // 5 ouvertures individuelles pour les 6 dropdown
  const [open1, setOpen1] = useState(false);

  // 5  valeurs individuelles pour les 6 dropdown
  /* 
  ! À AMÉLIORER 
  */

  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);
  const [value6, setValue6] = useState(null);
  const [value7, setValue7] = useState(null);
  const [value8, setValue8] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Valeurs DropDown état
  const [state1, setState1] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);
  const [state2, setState2] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);
  const [state3, setState3] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);
  const [state4, setState4] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);
  const [state5, setState5] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);
  const [state6, setState6] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);
  const [state7, setState7] = useState([
    { label: "À jour du :", value: "À jour du :" },
    { label: "À programmer", value: "À programmer" },
    { label: "Programmé le :", value: "Programmé le :" },
  ]);

  const [filters, setFilters] = useState([
    {
      label: "Vaccin",
      parent: "Catégorie",
      value: "Vaccin",
    },
    {
      label: "Examen de santé",
      parent: "Catégorie",
      value: "Examen de santé",
    },
    {
      label: "Obligatoire",
      parent: "Priorité",
      value: "Obligatoire",
    },
    {
      label: "Recommandé",
      parent: "Priorité",
      value: "Recommandé",
    },
  ]);

  /* ________________ LES DIFFÉRENTS MODALS ________________ */
  /* Les différents modals  apparaissent au clic sur les icones info */
  //Tableau des données infos
  const infos = [
    {
      title: "Vaccins obligatoires :",
      infos:
        "11 vaccins sont obligatoires chez les nourrissons nés après le 1er janvier 2018. Trois vaccins restent obligatoires chez les enfants nés avant cette date. Le vaccin contre la fièvre jaune l'est aussi pour les résidents de Guyane française. En milieu professionnel, selon l’activité exercée, certaines vaccinations sont exigées.",
    },
    {
      title: "Vaccins recommandés :",
      infos:
        "Des vaccins existent contre diverses maladies graves telles que la tuberculose, l'hépatite A... S’ils ne sont pas obligatoires, ils restent la meilleure façon d’éviter ces maladies et de protéger les personnes fragiles (nourrissons, femmes enceintes, personnes âgées…). ",
    },
    {
      title: "Vaccins projets personnels :",
      infos:
        "Si vous souhaitez réaliser un vaccin qui n'apparait pas dans la liste des vaccins obligatoires et des vaccins recommandés vous pouvez en ajouter dans la section 'Vaccins projets personnels' en cliquant sur",
    },
    {
      title: "Examens de santé obligatoires :",
      infos:
        "Si vous souhaitez réaliser un vaccin qui n'apparait pas dans la liste des vaccins obligatoires et des vaccins recommandés vous pouvez en ajouter dans la section 'Vaccins projets personnels' en cliquant sur",
    },
    {
      title: "Examens de santé recommandés :",
      infos:
        "Si vous souhaitez réaliser un vaccin qui n'apparait pas dans la liste des vaccins obligatoires et des vaccins recommandés vous pouvez en ajouter dans la section 'Vaccins projets personnels' en cliquant sur",
    },
    {
      title: "Besoins personnels :",
      infos:
        "Si vous souhaitez réaliser un vaccin ou un examen qui n'apparait pas dans la liste des vaccins/examens obligatoires et des vaccins/examens recommandés vous pouvez en ajouter dans la section 'Vaccins/examens projets personnels' en cliquant sur",
    },
  ];

  // Modal Infos Vaccins qui apparait au clic sur l'icône info
  const [modalInfosVisible, setModalInfosVisible] = useState(false);

  // Modal défition diphtérie (Diph)
  const [modalDefVisible, setModalDefVisible] = useState(false);

  // Modal date
  const [modalDate, setModalDate] = useState(false);
  const [modalDate2, setModalDate2] = useState(false);
  const [modalDate3, setModalDate3] = useState(false);
  const [modalDate4, setModalDate4] = useState(false);
  const [modalDate5, setModalDate5] = useState(false);
  const [modalDate6, setModalDate6] = useState(false);
  const [modalDate7, setModalDate7] = useState(false);
  const [modalDate8, setModalDate8] = useState(false);

  /* DateTimePicker */
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [date2, setDate2] = useState(new Date(Date.now()));
  const [date3, setDate3] = useState(new Date(Date.now()));
  const [date4, setDate4] = useState(new Date(Date.now()));
  const [date5, setDate5] = useState(new Date(Date.now()));
  const [date6, setDate6] = useState(new Date(Date.now()));
  const [date7, setDate7] = useState(new Date(Date.now()));
  const [date8, setDate8] = useState(new Date(Date.now()));

  const handleDatePicker = () => {
    setVisible(false);
  };

  const showDatePicker = () => {
    setVisible(!visible);
  };

  const hideDatePicker = () => {
    setVisible(false);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange2 = (event, value) => {
    setDate2(value2);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange3 = (event, value) => {
    setDate3(value3);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange4 = (event, value) => {
    setDate4(value4);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange5 = (event, value) => {
    setDate5(value5);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange6 = (event, value) => {
    setDate6(value6);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange7 = (event, value) => {
    setDate7(value7);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const onChange8 = (event, value) => {
    setDate8(value8);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  //Modal de définition des vaccins/examens
  const launchModal = (name, description) => {
    setName(name);
    setDescription(description);
    setModalDefVisible(true);
  };

  //Modal du dateTimePicker dans vaccins/examens
  const dateModal = (id, status) => {
    setModalDate(true);
    setTempState({ id, status });
  };

  //Pour le datePicker des vaccins obligatoires et recommandés
  const changeStateVaccines = () => {
    // console.log(tempState.date);
    let vaccinesCopy = [...vaccines];
    let index = vaccinesCopy.findIndex((vaccine) => {
      if (vaccine.id === tempState.id) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(index);
    vaccinesCopy[index].date = tempState.date;
    setTempState({});
    setVaccines(vaccinesCopy);
    setModalDate(false);
  };

  //Pour le datePicker des examens obligatoires et recommandés
  const changeStateExams = () => {
    // console.log(tempState.date);
    let examsCopy = [...exams];
    let index = examsCopy.findIndex((exam) => {
      if (exam.id === tempState.id) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(index);
    examsCopy[index].date = tempState.date;
    setTempState({});
    setExams(examsCopy);
    setModalDate(false);
  };

  //Pour le datePicker des besoins personnels
  const changeStateHealthCarePerso = (id, status) => {
    // console.log(tempState.date);
    let healthCareCopy = [...healthCare];
    let index = healthCareCopy.findIndex((exam) => {
      if (exam.id === tempState.id) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(index);
    healthCareCopy[index].date = tempState.date;
    setTempState({});
    setExams(healthCareCopy);
    setModalDate(false);
  };

  const dateModal2 = () => {
    setModalDate2(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date2}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange2}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  const dateModal3 = () => {
    setModalDate3(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date3}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange3}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  const dateModal4 = () => {
    setModalDate4(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date4}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange4}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  const dateModal5 = () => {
    setModalDate5(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date5}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange5}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  const dateModal6 = () => {
    setModalDate2(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date6}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange6}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  const dateModal7 = () => {
    setModalDate7(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date7}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange7}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  //Modal des infos des vaccins obligatoires
  const infosModal = (text) => {
    for (let item of infos) {
      console.log(item);
      if (item.title === text) {
        setName(item.title);
        setDescription(item.infos);
      }
    }
    setModalInfosVisible(true);
  };

  //liste dynamique filtre profils
  const itemSetter = () => {
    for (let i = 0; i < names.length; i++) {
      tempArray.unshift({
        label: names[i],
        value: names[i],
        parent: "Profil",
      });
    }
    tempArray.unshift({ label: "Profil", value: "Profil" });
    setItems(tempArray);
  };

  //selection tout filtres
  const setFilterCriteria = (item) => {
    if (item.length > 0) {
      let tempDropDownValuesArray = [...value];
      if (
        !tempDropDownValuesArray.find(
          (element) => element === item[item.length - 1].value
        )
      ) {
        tempDropDownValuesArray.push(item[item.length - 1].value);
      }
      setValue(tempDropDownValuesArray);
    }
  };

  useEffect(() => {
    // console.log("value useeffect", value);
  }, [value]);

  useEffect(() => {
    itemSetter();
  }, [items]);

  /* >>>>>>>>>> Ajout d'une ligne de vaccin au clic sur l'icône + <<<<<<<<<<<<<< */
  const [healthCare, setHealthCare] = useState([]); //Pour garder afficher les vaccins déja ajoutés lorsque le user reclic sur l'icône +
  const [valueVaccine, setValueVaccine] = useState(null); //Pour afficher les valeurs dans le dropDown

  //Valeurs DropDownPicker vaccins
  const [vaccinesName, setVaccinesName] = useState([
    { label: "Coqueluche", value: "Coqueluche" },
    { label: "Fièvre jaune", value: "Fièvre jaune" },
    { label: "Grippe saisonnière", value: "Grippe saisonnière" },
    { label: "Hépatite A", value: "Hépatite A" },
    { label: "Hépatite B", value: "Hépatite B" },
    {
      label: "Infections à Papillomavirus humain",
      value: "Infections à Papillomavirus humain",
    },
    { label: "Rubéole ", value: "Rubéole " },
    { label: "Varicelle", value: "Varicelle" },
  ]);

  const list = []; //Je crée un tableau vide dans lequel je vais pusher les vaccins que le user va ajouter au clic sur l'icône +
  const addHealthCare = () => {
    let val = healthCare.length;
    // console.log("added to tab", val);
    setHealthCare([...healthCare, { pos: val }]); //Copie de la liste des vaccins ajoutés
  };

  /* Fonction status pour le dropDown d'ajout de soin */
  const healthCareStatus = (item, index) => {
    let status = "A jour";
    let type = "name";
    let position = 0;
    let healthCareCopy = [...healthCare];
    healthCareCopy[index].status = item.value;
    // console.log(healthCareCopy);
  };

  /* Fonction status pour le dropDown des vaccins obligatoires */
  const mandatoryVaccinesStatus = (item, index) => {
    let status = "A jour";
    let type = "name";
    let position = 0;
    let healthCareCopy = [...healthCare];
    // healthCareCopy[index].status = item.value;
    // console.log(healthCareCopy);
  };

  /* Fonction status pour le dropDown des vaccins recommandés */
  const recommendedVaccinesStatus = (item, index) => {
    let status = "A jour";
    let type = "name";
    let position = 0;
    let healthCareCopy = [...healthCare];
    // healthCareCopy[index].status = item.value;
    // console.log(healthCareCopy);
  };

  /* Fonction status pour le dropDown des examens obligatoires */
  const mandatoryExamsStatus = (item, index) => {
    let status = "A jour";
    let type = "name";
    let position = 0;
    let healthCareCopy = [...healthCare];
    // healthCareCopy[index].status = item.value;
    // console.log(healthCareCopy);
  };

  /* Fonction status pour le dropDown des examens recommandés */
  const recommendedExamsStatus = (item, index) => {
    let status = "A jour";
    let type = "name";
    let position = 0;
    let healthCareCopy = [...healthCare];
    // healthCareCopy[index].status = item.value;
    // console.log(healthCareCopy);
  };

  /* Fonction name pour le dropDown d'ajout de soin */
  const healthCareName = (item, index) => {
    let name = "Tétanos";
    let type = "name";
    let position = 0;
    let healthCareCopy = [...healthCare];
    healthCareCopy[index].name = item.value;
    // console.log(healthCareCopy);
  };

  /* Fonction date pour le dropDown d'ajout de soin */
  const healthCareDate = (item, index) => {
    let date = "05/05/2022";
    let type = "date";
    let position = 0;
    let healthCareCopy = [...healthCare];
    healthCareCopy[index].date = item.value;
    // console.log(healthCareCopy);
  };

  //Pour colorer la bordure du dropDown en vert lorsque le user l'ouvre pour sélectionner son choix
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);
  const [isFocus5, setIsFocus5] = useState(false);
  const [isFocus6, setIsFocus6] = useState(false);
  const [isFocus7, setIsFocus7] = useState(false);

  /* Je supprime un soin de la liste en cliquant sur l'icône poubelle */
  var deleteHealthCare = (element) => {
    // console.log(state5);
    let tempo = [...healthCare];
    // console.log(tempo);
    for (let i = 0; i < tempo.length; i++) {
      tempo[i].pos = i;
    }
    tempo = tempo.filter((e) => e.pos != element); // Je fais une copie de mon tableau
    // console.log(tempo);
    setHealthCare(tempo);
    props.deleteToProfil(element);
  };

  const dateModalHealthCarePerso = () => {
    setModalDate8(true);
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date8}
      minimumDate={new Date(Date.now())}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange8}
      onConfirm={handleDatePicker}
      onCancel={hideDatePicker}
    />;
  };

  //Je map sur vaccinesList pour ajouter une nouvelle ligne de vaccin
  var healthCarePerso = healthCare.map((e, index) => {
    return (
      // Pour supprimer une ligne de soin quand on clique sur la ligne onPress={() => props.deleteHealthCare(element)}
      <View
        style={{
          flexDirection: "row",
          minWidth: 360,
          backgroundColor: "white",
        }}
        key={e}
      >
        <Dropdown
          style={styles.dropDownPickerVaccines}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={e.name}
          search //Permet au user de chercher le nom du vaccin sans avoir besoin de scroller sur la liste de nom proposée
          placeholder="Je choisis"
          labelField="label"
          valueField="value"
          items={vaccinesName}
          multiple={false} //Permet de sélectionner une seule option
          onChange={(item) => {
            healthCareName(item, index); //Pour mettre à jour le nom du soin
          }}
        />
        <Dropdown
          style={styles.dropDownPickerState}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={e.status}
          placeholder="À renseigner"
          labelField="label"
          valueField="value"
          maxHeight={165}
          data={state5}
          multiple={false} //Permet de sélectionner une seule option
          onChange={(item) => {
            healthCareStatus(item, index); //Pour mettre à jour le status du soin
          }}
        />
        <View
          key={index}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: 100,
            paddingHorizontal: 5,
          }}
        >
          {/* Le bouton pour afficher le dateTimePicker */}
          <TouchableOpacity
            key={index}
            // onPress={() => showDatePicker()}
            onPress={() => dateModalHealthCarePerso()}
          >
            {/* Affiche la date sélectionnée par le user dans le bouton */}
            <Text>{new Date(date8).toLocaleDateString("fr-FR")}</Text>
          </TouchableOpacity>
          <Icon
            key={index}
            style={{ top: -5 }}
            name="close-circle"
            color="#5BAA62"
            size={20}
            onPress={() => deleteHealthCare(index)}
          />
        </View>
      </View>
    );
  });

  const changeTempDate = (date) => {
    console.log(date);
    setTempState({ ...tempState, date });
  };

  // *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RETURN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
  return (
    <ScrollView>
      <View style={styles.container}>
        <DropDownPicker
          style={styles.DropDownPicker}
          open={open}
          placeholder="Aucun filtre sélectionné" //Ce texte apparait si aucun filtre sélectionné
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          autoScroll={true}
          closeOnBackPressed={true}
          listMode="MODAL"
          theme="LIGHT"
          multiple={true} //Permet de sélectionner plusieurs options
          min={0} //Possible de ne rien sélectionner
          // onSelectItem={(item) => setFilterCriteria(item)}
          max={10}
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
        {/*>>>>>>>>>>>>>>>>>>>>> Vaccins obligatoires <<<<<<<<<<<<<<<<<<<<<< */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* Affiche ce qui est après le '&&' que si au moins un élément des filtres est égal à Vaccin*/}
          {value.find((element) => element === "Vaccin") && (
            <View style={styles.filterView}>
              {/* Affiche ce qui est après le '&&' que si au moins un élément des filtres est égal à Obligatoire*/}
              {value.find((element) => element === "Obligatoire") && (
                <View>
                  <View style={styles.title}>
                    <Ionicons
                      name="ios-information-circle"
                      size={30}
                      color="#5BAA62"
                      onPress={() => infosModal("Vaccins obligatoires :")}
                    />
                    <Text style={styles.textTitle}>Vaccins obligatoires :</Text>
                  </View>
                  <View style={styles.headrow}>
                    <Text style={styles.textHeadColumn1}>Nom : </Text>
                    <Text style={styles.textHeadColumn2}>État : </Text>
                    <Text style={styles.textHeadColumn3}>Date : </Text>
                  </View>

                  {/* Affiche dynamiquement la liste des vaccins obligatoires  */}
                  {vaccines
                    .filter((element) => element.status === "Obligatoire")
                    .map((e, index) => (
                      <View style={{ backgroundColor: "#fff" }}>
                        <View style={styles.row} key={e}>
                          <Text
                            style={styles.textRow}
                            onPress={() => launchModal(e.name, e.description)}
                          >
                            {" "}
                            {e.name}
                          </Text>
                          {/* Pour colorer la bordure du dropdown picker */}
                          <Dropdown
                            style={[
                              styles.dropDownPickerState,
                              isFocus1 && { borderColor: "#5BAA62" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={e.status}
                            placeholder="À renseigner"
                            labelField="label"
                            valueField="value"
                            maxHeight={165}
                            data={state1}
                            multiple={false} //Permet de sélectionner une seule option
                            onFocus={() => setIsFocus1(true)}
                            onBlur={() => setIsFocus1(false)}
                            onChange={(item) => {
                              mandatoryVaccinesStatus(item, index); //Pour mettre à jour le status du soin
                            }}
                          />
                          <View style={{ minWidth: "32%" }}>
                            {/* Le bouton pour afficher le dateTimePicker */}
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => dateModal(e.id, e.status)}
                            >
                              {/* Affiche la date sélectionnée par le user dans le bouton */}
                              <Text style={styles.textDatePicker}>
                                {new Date(e.date).toLocaleDateString("fr-FR")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                </View>
              )}

              {/* >>>>>>>>>>>>>>>>>>>>> Vaccins recommandés <<<<<<<<<<<<<<<<<<<<<< */}

              {/* Affiche le haut du tableau et tout le tableau que si un élément dans les filtres est égal à Recommandé */}
              {value.find((element) => element === "Recommandé") && (
                <View>
                  <View style={styles.title}>
                    <Ionicons
                      name="ios-information-circle"
                      size={30}
                      color="#5BAA62"
                      onPress={() => infosModal("Vaccins recommandés :")}
                    />
                    <Text style={styles.textTitle}>Vaccins recommandés :</Text>
                  </View>
                  <View style={styles.headrow}>
                    <Text style={styles.textHeadColumn1}>Nom : </Text>
                    <Text style={styles.textHeadColumn2}>État : </Text>
                    <Text style={styles.textHeadColumn3}>Date : </Text>
                  </View>

                  {/* Affiche dynamiquement la liste des vaccins recommandés */}
                  {vaccines
                    .filter((element) => element.status === "Recommandé")
                    .map((e, index) => (
                      <View style={{ backgroundColor: "#fff" }}>
                        <View style={styles.row}>
                          <Text
                            style={styles.textRow}
                            onPress={() => launchModal(e.name, e.description)}
                          >
                            {" "}
                            {e.name}
                          </Text>
                          {/* Pour colorer la bordure du dropdown picker */}
                          <Dropdown
                            style={[
                              styles.dropDownPickerState,
                              isFocus4 && { borderColor: "#5BAA62" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={e.status}
                            placeholder="À renseigner"
                            labelField="label"
                            valueField="value"
                            maxHeight={165}
                            data={state4}
                            multiple={false} //Permet de sélectionner une seule option
                            onFocus={() => setIsFocus4(true)}
                            onBlur={() => setIsFocus4(false)}
                            onChange={(item) => {
                              recommendedVaccinesStatus(item, index); //Pour mettre à jour le status du soin
                            }}
                          />
                          <View style={{ minWidth: "32%" }}>
                            {/* Le bouton pour afficher le dateTimePicker */}
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => dateModal(e.id, e.status)}
                            >
                              {/* Affiche la date sélectionnée par le user dans le bouton */}
                              <Text style={styles.textDatePicker}>
                                {new Date(e.date).toLocaleDateString("fr-FR")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                </View>
              )}
            </View>
          )}

          {/* >>>>>>>>>>>>>>>>>>>>> Examens de santé recommandés <<<<<<<<<<<<<<<<<<<<<< */}

          {/* Affiche ce qui est après '&&' que si au moins élément dans le filtre est égal à Examen de santé */}
          {value.find((element) => element === "Examen de santé") && (
            <View style={styles.filterView}>
              {/* Aaffiche le haut du tableau et tout le tableau que si un élément des filtres est égal à Obligatoire */}
              {value.find((element) => element === "Obligatoire") && (
                <View>
                  <View style={styles.title}>
                    <Ionicons
                      name="ios-information-circle"
                      size={30}
                      color="#5BAA62"
                      onPress={() =>
                        infosModal("Examens de santé obligatoires :")
                      }
                    />
                    <Text style={styles.textTitle}>
                      Examens de santé obligatoires :
                    </Text>
                  </View>

                  <View style={styles.headrow}>
                    <Text style={styles.textHeadColumn1}>Nom : </Text>
                    <Text style={styles.textHeadColumn2}>État : </Text>
                    <Text style={styles.textHeadColumn3}>Date : </Text>
                  </View>
                  {/* Affiche dynamiquement la liste des examens qui sont obligatoires uniquement */}
                  {exams
                    .filter((element) => element.status === "Obligatoire")
                    .map((e, index) => (
                      <View style={{ backgroundColor: "#fff" }}>
                        <View style={styles.row}>
                          <Text
                            style={styles.textRow}
                            onPress={() => launchModal(e.name, e.description)}
                          >
                            {e.name}
                          </Text>
                          <Dropdown
                            style={[
                              styles.dropDownPickerState,
                              isFocus7 && { borderColor: "#5BAA62" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={e.status}
                            placeholder="À renseigner"
                            labelField="label"
                            valueField="value"
                            maxHeight={165}
                            data={state7}
                            multiple={false} //Permet de sélectionner une seule option
                            onFocus={() => setIsFocus7(true)}
                            onBlur={() => setIsFocus7(false)}
                            onChange={(item) => {
                              mandatoryExamsStatus(item, index); //Pour mettre à jour le status du soin
                            }}
                          />
                          <View style={{ minWidth: "32%" }}>
                            {/* Le bouton pour afficher le dateTimePicker */}
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => dateModal(e.id, e.status)}
                            >
                              {/* Affiche la date sélectionnée par le user dans le bouton */}
                              <Text style={styles.textDatePicker}>
                                {new Date(e.date).toLocaleDateString("fr-FR")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                </View>
              )}

              {/* Affiche le tableau que si  il y a un élément des filtres égal á Recommandé*/}
              {value.find((element) => element === "Recommandé") && (
                <View>
                  <View style={styles.title}>
                    <Ionicons
                      name="ios-information-circle"
                      size={30}
                      color="#5BAA62"
                      onPress={() =>
                        infosModal("Examens de santé recommandés :")
                      }
                    />
                    <Text style={styles.textTitle}>
                      Examens de santé recommandés :
                    </Text>
                  </View>

                  <View style={styles.headrow}>
                    <Text style={styles.textHeadColumn1}>Nom : </Text>
                    <Text style={styles.textHeadColumn2}>État : </Text>
                    <Text style={styles.textHeadColumn3}>Date : </Text>
                  </View>
                  {/* Affiche dynamiquement la liste des examens qui sont recommandés uniquement */}
                  {exams
                    .filter((element) => element.status === "Recommandé")
                    .map((e, index) => (
                      <View style={{ backgroundColor: "#fff" }}>
                        <View style={styles.row}>
                          <Text
                            style={styles.textRow}
                            onPress={() => launchModal(e.name, e.description)}
                          >
                            {e.name}
                          </Text>
                          <Dropdown
                            style={[
                              styles.dropDownPickerState,
                              isFocus6 && { borderColor: "#5BAA62" },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            value={value6}
                            placeholder="À renseigner"
                            labelField="label"
                            valueField="value"
                            maxHeight={165}
                            data={state6}
                            multiple={false} //Permet de sélectionner une seule option
                            onFocus={() => setIsFocus6(true)}
                            onBlur={() => setIsFocus6(false)}
                            onChange={(item) => {
                              recommendedExamsStatus(item, index); //Pour mettre à jour le status du soin
                            }}
                          />
                          <View style={{ minWidth: "32%" }}>
                            {/* Le bouton pour afficher le dateTimePicker */}
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() => dateModal(e.id, e.status)}
                            >
                              {/* Affiche la date sélectionnée par le user dans le bouton */}
                              <Text style={styles.textDatePicker}>
                                {new Date(e.date).toLocaleDateString("fr-FR")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ))}
                </View>
              )}
            </View>
          )}

          {/*>>>>>>>>>>>>>>>>>>>>> Vaccins/Examens projets personnels <<<<<<<<<<<<<<<<<<<<<< */}
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#5BAA62"
              onPress={() => infosModal("Besoins personnels :")}
            />
            <Text style={styles.textTitle}>Besoins personnels :</Text>
          </View>

          {/*>>>>>>>>>>>>>>>>>>>>> Ajouter un vaccin/un examen <<<<<<<<<<<<<<<<<<<<<< */}
          {/* Ajout d'une ligne quand le user clic sur l'icône + */}
          <View>{healthCarePerso}</View>
          <View style={styles.title}>
            <AntDesign
              name="pluscircle"
              size={24}
              color="#5BAA62"
              onPress={() => {
                addHealthCare();
              }}
            />
            <Text style={styles.text}>Ajouter un vaccin </Text>
          </View>

          {/*>>>>>>>>>>>>>>>>>>>>> Préparer un voyage <<<<<<<<<<<<<<<<<<<<<< */}
          {/* Redirecttion vers site Pasteur au clic sur globe et sur le texte (au choix) */}
          <View style={styles.title}>
            <Entypo
              name="globe"
              size={24}
              color="#5BAA62"
              onPress={() => {
                Linking.openURL(
                  "https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage?emkfid=EMF-22701181460-k--77618669180--s&gclid=EAIaIQobChMIzcO_oLvS9wIVRajVCh2S5ANiEAAYASAAEgLNrvD_BwE"
                );
              }}
            />
            <Text
              style={styles.text}
              onPress={() => {
                Linking.openURL(
                  "https://www.pasteur.fr/fr/centre-medical/preparer-son-voyage?emkfid=EMF-22701181460-k--77618669180--s&gclid=EAIaIQobChMIzcO_oLvS9wIVRajVCh2S5ANiEAAYASAAEgLNrvD_BwE"
                );
              }}
            >
              Préparer un voyage{" "}
            </Text>
          </View>

          {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LES MODALS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
          {/*>>>>>>>>>>>>>>>>>>>>> Modal d'infos de vaccin et d'examen <<<<<<<<<<<<<<<<<<<<<< */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {infos.map((info, i) => {
              return (
                <ModalInfos visible={modalInfosVisible} key={i}>
                  <View style={{ alignItems: "center" }}>
                    <View style={styles.header}>
                      <TouchableOpacity
                        onPress={() => setModalInfosVisible(false)}
                      ></TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.title}>
                    <Ionicons
                      name="ios-information-circle"
                      size={30}
                      color="#FFFFFF"
                      onPress={() => setModalInfosVisible(true)}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#FFFFFF",
                        paddingLeft: 9,
                      }}
                    >
                      {name}
                    </Text>
                  </View>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        marginVertical: 30,
                        fontSize: 17,
                        textAlign: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      {description}
                    </Text>
                    <Button
                      title="OK"
                      buttonStyle={styles.buttonModal}
                      onPress={() => setModalInfosVisible(false)}
                    />
                  </View>
                </ModalInfos>
              );
            })}
          </View>
        </View>

        {/*>>>>>>>>>>>>>>>>>>>>> Modal dateTimePicker des vaccines <<<<<<<<<<<<<<<<<<<<<< */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate}>
            <Text onPress={() => changeStateVaccines()}>Fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={tempState.date || new Date()}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={(event, lastDate) => changeTempDate(lastDate)}
              onConfirm={setDate}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>

        {/*>>>>>>>>>>>>>>>>>>>>> Modal dateTimePicker des examens <<<<<<<<<<<<<<<<<<<<<< */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate}>
            <Text onPress={() => changeStateExams()}>Fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={tempState.date || new Date()}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={(event, lastDate) => changeTempDate(lastDate)}
              onConfirm={setDate}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>

        {/*>>>>>>>>>>>>>>>>>>>>> Modal dateTimePicker des besoins personnels <<<<<<<<<<<<<<<<<<<<<< */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate}>
            <Text onPress={() => changeStateHealthCarePerso()}>Fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={tempState.date || new Date()}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={(event, lastDate) => changeTempDate(lastDate)}
              onConfirm={setDate}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate8}>
            <Text onPress={() => setModalDate8(false)}>fermer</Text>
            <DateTimePicker
              mode="date"
              style={{
                backgroundColor: "#FFF",
              }}
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date8}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange8}
              onConfirm={handleDatePicker}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate3}>
            <Text onPress={() => setModalDate3(false)}>fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date3}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange3}
              onConfirm={handleDatePicker}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate4}>
            <Text onPress={() => setModalDate4(false)}>fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date4}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange4}
              onConfirm={handleDatePicker}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate5}>
            <Text onPress={() => setModalDate5(false)}>fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date5}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange5}
              onConfirm={handleDatePicker}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate6}>
            <Text onPress={() => setModalDate6(false)}>fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date6}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange6}
              onConfirm={handleDatePicker}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDate7}>
            <Text onPress={() => setModalDate7(false)}>fermer</Text>
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
              value={date7}
              minimumDate={new Date(Date.now())}
              // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              onChange={onChange7}
              onConfirm={handleDatePicker}
              onCancel={hideDatePicker}
            />
          </ModalInfos>
        </View>

        {/* Je map sur definitionList pour dynamiser les modals de définition */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModalInfos visible={modalDefVisible}>
            <ScrollView>
              <View style={{ alignItems: "center" }}>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => setModalDefVisible(false)}
                  ></TouchableOpacity>
                </View>
              </View>
              <View style={styles.title}>
                <Ionicons
                  name="ios-information-circle"
                  size={30}
                  color="#FFFFFF"
                  onPress={() => setModalDefVisible(true)}
                />
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFFFFF",
                    paddingLeft: 9,
                  }}
                  h4
                >
                  {name} :
                </Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 17,
                    textAlign: "center",
                    color: "#FFFFFF",
                  }}
                >
                  {description}
                </Text>
                <Button
                  title="OK"
                  buttonStyle={styles.buttonModal}
                  onPress={() => setModalDefVisible(false)}
                />
              </View>
            </ScrollView>
          </ModalInfos>
        </View>
      </View>
    </ScrollView>
  );
}
// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STYLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
const styles = StyleSheet.create({
  button: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EBFAD5",
  },
  buttonPerso: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EBFAD5",
  },
  buttonModal: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    size: "md",
    backgroundColor: "#37663B",
    width: 100,
    height: 40,
    margin: 15,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#EBFAD5",
  },
  DropDownPicker: {
    borderColor: "#37663B",
    marginTop: 45,
  },
  dropDownPickerState: {
    height: 30,
    minWidth: "41%",
    borderRadius: 0,
    borderColor: "#EBFAD5",
    borderWidth: 0.5,
    paddingHorizontal: 10,
  },
  dropDownPickerVaccines: {
    height: 30,
    minWidth: "28%",
    borderRadius: 0,
    borderColor: "#EBFAD5",
    paddingLeft: 5,
    borderWidth: 0.5,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headrow: {
    flexDirection: "row",
    display: "flex",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#5BAA62",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowPerso: {
    flexDirection: "row",
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  text: {
    color: "#37663B",
    marginLeft: 10, //Espace entre texte et icône
  },
  textDatePicker: {
    alignContent: "center",
    height: 50,
    width: 116,
    paddingTop: 15,
    padding: 10,
    borderColor: "#EBFAD5",
  },
  textHeadColumn1: {
    flexDirection: "row",
    backgroundColor: "#5BAA62",
    borderColor: "#37663B",
    width: "28%",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBFAD5",
    paddingLeft: 5,
  },
  textHeadColumn2: {
    flexDirection: "row",
    backgroundColor: "#5BAA62",
    borderColor: "#37663B",
    width: "41%",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBFAD5",
    paddingLeft: 5,
  },
  textHeadColumn3: {
    flexDirection: "row",
    backgroundColor: "#5BAA62",
    borderColor: "#5BAA62",
    width: "31%",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EBFAD5",
    paddingLeft: 5,
  },
  textRow: {
    height: 30,
    width: "28%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: "#EBFAD5",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "#37663B",
    marginLeft: 10, //Espace entre texte et icône
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    padding: 9,
    color: "#37663B",
    width: 350,
  },
  filterView: {
    flexDirection: "column",
    alignItems: "center",
    padding: 9,
    color: "#37663B",
  },
});

// *>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> REDUX <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<* //
function mapDispatchToProps(dispatch) {
  return {
    addToProfil: function (newHealthCare) {
      dispatch({ type: "addHealthCare", healthCare: newHealthCare });
    },
    deleteToProfil: function (newHealthCare) {
      dispatch({
        type: "deleteHealthCare",
        healthCare: newHealthCare,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(ProfilScreen);
