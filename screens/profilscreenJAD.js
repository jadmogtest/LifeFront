
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  {/* JAD N'affiche ce qui est après le '&&' que si au moins un élément des filtres est égal à Vaccin*/}
  {value.find((element) => element === "Vaccin") && (
    <View style={styles.filterView}>
      {/* JAD N'affiche ce qui est après le '&&' que si au moins un élément des filtres est égal à Obligatoire*/}
      {value.find((element) => element === "Obligatoire") && (
        <View style={styles.filterView}>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#5BAA62"
              onPress={() => infosModal()}
            />
            <Text style={styles.textTitle}>Vaccins obligatoires :</Text>
          </View>
          <View style={styles.headrow}>
            <Text style={styles.textHeadColumn1}>Nom : </Text>
            <Text style={styles.textHeadColumn2}>État : </Text>
            <Text style={styles.textHeadColumn3}>Date : </Text>
          </View>

          {/* JAD Affiche dynamiquement la liste des vaccins qui sont obligatoires uniquement */}
          {vaccines
            .filter((element) => element.status === "Obligatoire")
            .map((vaccine) => (
              <View style={styles.row}>
                <Text style={styles.textRow}>{vaccine.name}</Text>
                {/* Pour colorer la bordure du dropdown picker */}
                <Dropdown
                  style={[
                    styles.dropDownPickerState,
                    isFocus && { borderColor: "#5BAA62" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  value={value1}
                  placeholder="À renseigner"
                  labelField="label"
                  valueField="value"
                  maxHeight={165}
                  data={state}
                  multiple={false} //Permet de sélectionner une seule option
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue1(item.value);
                  }}
                />
                <View>
                  {/* Le bouton pour afficher le dateTimePicker */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => showDatePicker()}
                  >
                    {/* Affiche la date sélectionnée par le user dans le bouton */}
                    <Text style={styles.textDatePicker}>
                      {new Date(date).toLocaleDateString("fr-FR")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      )}

      {/* >>>>>>>>>>>>>>>>>>>>> Vaccins recommandés <<<<<<<<<<<<<<<<<<<<<< */}

      {/* JAD N'affiche le haut du tableau et tout le tableau que si un élément dans les filtres est égal à Recommandé */}
      {value.find((element) => element === "Recommandé") && (
        <View style={styles.filterView}>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#5BAA62"
              onPress={() => setModalVRVisible(true)}
            />
            <Text style={styles.textTitle} h4>
              Vaccins recommandés :
            </Text>
          </View>
          <View style={styles.headrow}>
            <Text style={styles.textHeadColumn1}>Vaccin : </Text>
            <Text style={styles.textHeadColumn2}>État : </Text>
            <Text style={styles.textHeadColumn3}>Date : </Text>
          </View>

          {/* JAD Affiche dynamiquement la liste des vaccins qui sont recommandés uniquement */}
          {vaccines
            .filter((element) => element.status === "Recommandé")
            .map((vaccine) => (
              <View style={styles.row}>
                <Text style={styles.textRow}>{vaccine.name}</Text>
                <Dropdown
                  style={[
                    styles.dropDownPickerState,
                    isFocus3 && { borderColor: "#5BAA62" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  value={value3}
                  placeholder="À renseigner"
                  labelField="label"
                  valueField="value"
                  maxHeight={165}
                  data={state}
                  multiple={false} //Permet de sélectionner une seule option
                  onFocus={() => setIsFocus3(true)}
                  onBlur={() => setIsFocus3(false)}
                  onChange={(item) => {
                    setValue3(item.value);
                  }}
                />
                <View>
                  {/* Le bouton pour afficher le dateTimePicker */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => showDatePicker()}
                  >
                    {/* Affiche la date sélectionnée par le user dans le bouton */}
                    <Text style={styles.textDatePicker}>
                      {new Date(date).toLocaleDateString("fr-FR")}
                    </Text>
                  </TouchableOpacity>
                  {/* Le dateTimePicker */}
                  {visible && (
                    <DateTimePicker
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
                      value={date}
                      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
                      onChange={onChange}
                      // onConfirm={handleDatePicker}
                      // onCancel={hideDatePicker}
                    />
                  )}
                </View>
              </View>
            ))}
        </View>
      )}
    </View>
  )}

  {/* >>>>>>>>>>>>>>>>>>>>> Examens de santé recommandés <<<<<<<<<<<<<<<<<<<<<< */}

  {/* JAD N'affiche ce qui est après '&&' que si au moins élément dans le filtre est égal à Examen de santé */}
  {value.find((element) => element === "Examen de santé") && (
    <View style={styles.filterView}>
      {/* JAD N'affiche le haut du tableau et tout le tableau que si un élément des filtres est égal à Obligatoire */}
      {value.find((element) => element === "Obligatoire") && (
        <View style={styles.filterView}>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#5BAA62"
              onPress={() => setModalVRVisible(true)}
            />
            <Text style={styles.textTitle} h4>
              Examens de santé obligatoires :
            </Text>
          </View>

          <View style={styles.headrow}>
            <Text style={styles.textHeadColumn1}>Examen : </Text>
            <Text style={styles.textHeadColumn2}>État : </Text>
            <Text style={styles.textHeadColumn3}>Date : </Text>
          </View>

          {/* JAD Affiche dynamiquement la liste des examens qui sont obligatoires uniquement */}
          {exams
            .filter((element) => element.status === "Obligatoire")
            .map((exam) => (
              <View style={styles.row}>
                <Text style={styles.textRow}>{exam.name}</Text>
                <Dropdown
                  style={[
                    styles.dropDownPickerState,
                    isFocus3 && { borderColor: "#5BAA62" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  value={value3}
                  placeholder="À renseigner"
                  labelField="label"
                  valueField="value"
                  maxHeight={165}
                  data={state}
                  multiple={false} //Permet de sélectionner une seule option
                  onFocus={() => setIsFocus3(true)}
                  onBlur={() => setIsFocus3(false)}
                  onChange={(item) => {
                    setValue3(item.value);
                  }}
                />
                <View>
                  {/* Le bouton pour afficher le dateTimePicker */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => showDatePicker()}
                  >
                    {/* Affiche la date sélectionnée par le user dans le bouton */}
                    <Text style={styles.textDatePicker}>
                      {new Date(date).toLocaleDateString("fr-FR")}
                    </Text>
                  </TouchableOpacity>
                  {/* Le dateTimePicker */}
                  {visible && (
                    <DateTimePicker
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
                      value={date}
                      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
                      onChange={onChange}
                      // onConfirm={handleDatePicker}
                      // onCancel={hideDatePicker}
                    />
                  )}
                </View>
              </View>
            ))}
        </View>
      )}

      {/* JAD N'affiche le tableau que si  il y a un élément des filtres égal á Recommandé*/}
      {value.find((element) => element === "Recommandé") && (
        <View style={styles.filterView}>
          <View style={styles.title}>
            <Ionicons
              name="ios-information-circle"
              size={30}
              color="#5BAA62"
              onPress={() => setModalVRVisible(true)}
            />
            <Text style={styles.textTitle} h4>
              Examens de santé recommandés :
            </Text>
          </View>

          <View style={styles.headrow}>
            <Text style={styles.textHeadColumn1}>Examen : </Text>
            <Text style={styles.textHeadColumn2}>État : </Text>
            <Text style={styles.textHeadColumn3}>Date : </Text>
          </View>

          {/* JAD Affiche dynamiquement la liste des examens qui sont recommandés uniquement */}
          {exams
            .filter((element) => element.status === "Recommandé")
            .map((exam) => (
              <View style={styles.row}>
                <Text style={styles.textRow}>{exam.name}</Text>
                <Dropdown
                  style={[
                    styles.dropDownPickerState,
                    isFocus3 && { borderColor: "#5BAA62" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  value={value3}
                  placeholder="À renseigner"
                  labelField="label"
                  valueField="value"
                  maxHeight={165}
                  data={state}
                  multiple={false} //Permet de sélectionner une seule option
                  onFocus={() => setIsFocus3(true)}
                  onBlur={() => setIsFocus3(false)}
                  onChange={(item) => {
                    setValue3(item.value);
                  }}
                />
                <View>
                  {/* Le bouton pour afficher le dateTimePicker */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => showDatePicker()}
                  >
                    {/* Affiche la date sélectionnée par le user dans le bouton */}
                    <Text style={styles.textDatePicker}>
                      {new Date(date).toLocaleDateString("fr-FR")}
                    </Text>
                  </TouchableOpacity>
                  {/* Le dateTimePicker */}
                  {visible && (
                    <DateTimePicker
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
                      value={date}
                      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
                      onChange={onChange}
                      // onConfirm={handleDatePicker}
                      // onCancel={hideDatePicker}
                    />
                  )}
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
      onPress={() => setModalVPPVisible(true)}
    />
    <Text style={styles.textTitle} h4>
      Vaccins/Examens projets personnels :
    </Text>
  </View>

  {/*>>>>>>>>>>>>>>>>>>>>> Ajouter un vaccin/un examen <<<<<<<<<<<<<<<<<<<<<< */}
  {/* Ajout d'une ligne quand le user clic sur l'icône + */}
  {healthCarePerso}
  <View style={styles.title}>
    <AntDesign
      name="pluscircle"
      size={24}
      color="#5BAA62"
      onPress={() => {
        addVaccines();
      }}
    />
    <Text style={styles.text}>Ajouter un vaccin </Text>
  </View>

  {/*>>>>>>>>>>>>>>>>>>>>> Modal vaccins obligatoires <<<<<<<<<<<<<<<<<<<<<< */}
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ModalPoup visible={modalVOVisible}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setModalVOVisible(false)}
          ></TouchableOpacity>
        </View>
      </View>
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#FFFFFF"
          onPress={() => setModalVOVisible(true)}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            paddingLeft: 9,
          }}
          h4
        >
          Vaccins obligatoires :
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
          11 vaccins sont obligatoires chez les nourrissons nés après le 1er
          janvier 2018. Trois vaccins restent obligatoires chez les enfants nés
          avant cette date. Le vaccin contre la fièvre jaune l'est aussi pour
          les résidents de Guyane française. En milieu professionnel, selon
          l’activité exercée, certaines vaccinations sont exigées.
        </Text>
        <Button
          title="OK"
          buttonStyle={styles.buttonModal}
          onPress={() => setModalVOVisible(false)}
        />
      </View>
    </ModalPoup>
  </View>

  {/*>>>>>>>>>>>>>>>>>>>>> Modal vaccins recommandés <<<<<<<<<<<<<<<<<<<<<< */}
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ModalPoup visible={modalVRVisible}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setModalVRVisible(false)}
          ></TouchableOpacity>
        </View>
      </View>
      <View style={styles.title}>
        <Ionicons
          name="ios-information-circle"
          size={30}
          color="#FFFFFF"
          onPress={() => setModalVRVisible(true)}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#FFFFFF",
            paddingLeft: 9,
          }}
          h4
        >
          Vaccins recommandés :
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
          Des vaccins existent contre diverses maladies graves telles que la
          tuberculose, l'hépatite A... S’ils ne sont pas obligatoires, ils
          restent la meilleure façon d’éviter ces maladies et de protéger les
          personnes fragiles (nourrissons, femmes enceintes, personnes âgées…).
        </Text>
        <Button
          title="OK"
          type="solid"
          buttonStyle={styles.buttonModal}
          onPress={() => setModalVRVisible(false)}
        />
      </View>
    </ModalPoup>
  </View>
</View>;