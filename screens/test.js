// {/* <View style={styles.title}>
//   <Ionicons
//     name="ios-information-circle"
//     size={30}
//     color="#5BAA62"
//     onPress={() => infosModal()}
//   />
//   <Text style={styles.textTitle}>Vaccins obligatoires :</Text>
// </View>
//   <View style={styles.headrow}>
//     <Text style={styles.textHeadColumn1}>Nom : </Text>
//     <Text style={styles.textHeadColumn2}>État : </Text>
//     <Text style={styles.textHeadColumn3}>Date : </Text>
//   </View>
//   <View style={{ backgroundColor: "#fff" }}>
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         Diphtérie
//                   {/* {vaccine.name} */}
//       </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus1 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value1}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state1}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus1(true)}
//         onBlur={() => setIsFocus1(false)}
//         onChange={(item) => {
//           setValue1(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           // onPress={() => showDatePicker()}
//           onPress={() => dateModal()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>

//   </View>

//   <View style={{ backgroundColor: "#fff" }}>
//     {/* {mandatoryVaccines.map((vaccine, i) => {
//             return ( */}
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         Tétanos
//               {/* {vaccine.name} */}
//       </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus2 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value2}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state2}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus2(true)}
//         onBlur={() => setIsFocus2(false)}
//         onChange={(item) => {
//           setValue2(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => dateModal2()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date2).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//     {/* );
//           })} */}
//   </View>
//   <View style={{ backgroundColor: "#fff" }}>
//     {/* {mandatoryVaccines.map((vaccine, i) => {
//             return ( */}
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         Poliomélyte
//               {/* {vaccine.name} */}
//       </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus3 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value3}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state3}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus3(true)}
//         onBlur={() => setIsFocus3(false)}
//         onChange={(item) => {
//           setValue3(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => dateModal3()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date3).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//     {/* );
//           })} */}
//   </View>
//         {/* >>>>>>>>>>>>>>>>>>>>> Vaccins recommandés <<<<<<<<<<<<<<<<<<<<<< */ }
// <View style={styles.title}>
//   <Ionicons
//     name="ios-information-circle"
//     size={30}
//     color="#5BAA62"
//     onPress={() => infosModal(name, description)}
//   />
//   <Text style={styles.textTitle}>Vaccins recommandés :</Text>
// </View>
//   <View style={styles.headrow}>
//     <Text style={styles.textHeadColumn1}>Nom : </Text>
//     <Text style={styles.textHeadColumn2}>État : </Text>
//     <Text style={styles.textHeadColumn3}>Date : </Text>
//   </View>
//   <View style={{ backgroundColor: "#fff" }}>
//     {/* {mandatoryVaccines.map((vaccine, i) => {
//             return ( */}
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         COVID-19
//               {/* {vaccine.name} */}
//       </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus4 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value4}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state4}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus4(true)}
//         onBlur={() => setIsFocus4(false)}
//         onChange={(item) => {
//           setValue4(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => dateModal4()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date4).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//     {/* );
//           })} */}
//   </View>
//   <View style={{ backgroundColor: "#fff" }}>
//     {/* {mandatoryVaccines.map((vaccine, i) => {
//             return ( */}
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         Hépatite B{/* {vaccine.name} */}
//       </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus5 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value5}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state5}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus5(true)}
//         onBlur={() => setIsFocus5(false)}
//         onChange={(item) => {
//           setValue5(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => dateModal5()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date5).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//     {/* );
//           })} */}
//   </View>
//         {/* >>>>>>>>>>>>>>>>>>>>> Examens de santé recommandés <<<<<<<<<<<<<<<<<<<<<< */ }
// <View style={styles.title}>
//   <Ionicons
//     name="ios-information-circle"
//     size={30}
//     color="#5BAA62"
//     onPress={() => setModalVRVisible(true)}
//   />
//   <Text style={styles.textTitle}>Examens de santé recommandés :</Text>
// </View>
//   <View style={styles.headrow}>
//     <Text style={styles.textHeadColumn1}>Nom : </Text>
//     <Text style={styles.textHeadColumn2}>État : </Text>
//     <Text style={styles.textHeadColumn3}>Date : </Text>
//   </View>
//   <View style={{ backgroundColor: "#fff" }}>
//     {/* {mandatoryVaccines.map((vaccine, i) => {
//             return ( */}
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         Bilan sanguin
//             </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus6 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value6}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state6}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus6(true)}
//         onBlur={() => setIsFocus6(false)}
//         onChange={(item) => {
//           setValue5(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => dateModal6()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date6).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
//   <View style={{ backgroundColor: "#fff" }}>
//     {/* {mandatoryVaccines.map((vaccine, i) => {
//             return ( */}
//     <View style={styles.row}>
//       <Text
//         style={styles.textRow}
//         onPress={() => launchModal(name, description)}
//       >
//         Bilan urinaire{/* {vaccine.name} */}
//       </Text>

//       {/* Pour colorer la bordure du dropdown picker */}
//       <Dropdown
//         style={[
//           styles.dropDownPickerState,
//           isFocus7 && { borderColor: "#5BAA62" },
//         ]}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         value={value7}
//         placeholder="À renseigner"
//         labelField="label"
//         valueField="value"
//         maxHeight={165}
//         data={state7}
//         multiple={false} //Permet de sélectionner une seule option
//         onFocus={() => setIsFocus7(true)}
//         onBlur={() => setIsFocus7(false)}
//         onChange={(item) => {
//           setValue7(item.value);
//         }}
//       />
//       <View>
//         {/* Le bouton pour afficher le dateTimePicker */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => dateModal7()}
//         >
//           {/* Affiche la date sélectionnée par le user dans le bouton */}
//           <Text style={styles.textDatePicker}>
//             {new Date(date7).toLocaleDateString("fr-FR")}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
//         {/*>>>>>>>>>>>>>>>>>>>>> Vaccins/Examens projets personnels <<<<<<<<<<<<<<<<<<<<<< */ }
// <View style={styles.title}>
//   <Ionicons
//     name="ios-information-circle"
//     size={30}
//     color="#5BAA62"
//     onPress={() => setModalVPPVisible(true)}
//   />
//   <Text style={styles.textTitle}>
//     Vaccins/Examens projets personnels :
//           </Text>
// </View>
// {/*>>>>>>>>>>>>>>>>>>>>> Ajouter un vaccin/un examen <<<<<<<<<<<<<<<<<<<<<< */ }
// {/* Ajout d'une ligne quand le user clic sur l'icône + */ }
// { healthCarePerso }
// <View style={styles.title}>
//   <AntDesign
//     name="pluscircle"
//     size={24}
//     color="#5BAA62"
//     onPress={() => {
//       addVaccines();
//     }}
//   />
//   <Text style={styles.text}>Ajouter un vaccin </Text>
// </View>
// {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LES MODALS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */ }
// {/*>>>>>>>>>>>>>>>>>>>>> Modal d'infos de vaccin et d'examen <<<<<<<<<<<<<<<<<<<<<< */ }
// <View
//   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
// >
//   {infos.map((info, i) => {
//     return (
//       <ModalInfos visible={modalVOVisible}>
//         <View style={{ alignItems: "center" }}>
//           <View style={styles.header}>
//             <TouchableOpacity
//               onPress={() => setModalVOVisible(false)}
//             ></TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.title}>
//           <Ionicons
//             name="ios-information-circle"
//             size={30}
//             color="#FFFFFF"
//             onPress={() => setModalVOVisible(true)}
//           />
//           <Text
//             style={{
//               textAlign: "center",
//               color: "#FFFFFF",
//               paddingLeft: 9,
//             }}
//             h4
//           >
//             {info.title}
//           </Text>
//         </View>
//         <View
//           style={{ justifyContent: "center", alignItems: "center" }}
//         >
//           <Text
//             style={{
//               marginVertical: 30,
//               fontSize: 17,
//               textAlign: "center",
//               color: "#FFFFFF",
//             }}
//           >
//             {info.infos}
//           </Text>
//           <Button
//             title="OK"
//             buttonStyle={styles.buttonModal}
//             onPress={() => setModalVOVisible(false)}
//           />
//         </View>
//       </ModalInfos>
//     );
//   })}
// </View>
//       </View >

//   {/*>>>>>>>>>>>>>>>>>>>>> Modal dateTimePicker <<<<<<<<<<<<<<<<<<<<<< */ }
//   < View style = {{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate}>
//       <Text onPress={() => setModalDate(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//       </View >

//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate2}>
//       <Text onPress={() => setModalDate2(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date2}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange2}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//   </View>

//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate3}>
//       <Text onPress={() => setModalDate3(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date3}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange3}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//   </View>
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate4}>
//       <Text onPress={() => setModalDate4(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date4}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange4}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//   </View>
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate5}>
//       <Text onPress={() => setModalDate5(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date5}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange5}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//   </View>
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate6}>
//       <Text onPress={() => setModalDate6(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date6}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange6}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//   </View>
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <ModalInfos visible={modalDate7}>
//       <Text onPress={() => setModalDate7(false)}>fermer</Text>
//       <DateTimePicker
//         mode="date"
//         display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
//         value={date7}
//         minimumDate={new Date(Date.now())}
//         // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
//         onChange={onChange7}
//         onConfirm={handleDatePicker}
//         onCancel={hideDatePicker}
//       />
//     </ModalInfos>
//   </View>

//       {/* Je map sur definitionList pour dynamiser les modals de définition */ }
// <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//   <ModalInfos visible={modalDiphVisible}>
//     <ScrollView>
//       <View style={{ alignItems: "center" }}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => setModalDiphVisible(false)}
//           ></TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.title}>
//         <Ionicons
//           name="ios-information-circle"
//           size={30}
//           color="#FFFFFF"
//           onPress={() => setModalDiphVisible(true)}
//         />
//         <Text
//           style={{
//             textAlign: "center",
//             color: "#FFFFFF",
//             paddingLeft: 9,
//           }}
//           h4
//         >
//           {name} :
//               </Text>
//       </View>
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <Text
//           style={{
//             marginVertical: 30,
//             fontSize: 17,
//             textAlign: "center",
//             color: "#FFFFFF",
//           }}
//         >
//           {description}
//         </Text>
//         <Button
//           title="OK"
//           buttonStyle={styles.buttonModal}
//           onPress={() => setModalDiphVisible(false)}
//         />
//       </View>
//     </ScrollView>
//   </ModalInfos> */}