{
  /* Le bouton pour afficher le dateTimePicker */
}
<TouchableOpacity style={styles.button} onPress={() => showDatePicker()}>
  {/* Affiche la date sélectionnée par le user dans le bouton */}
  <Text style={styles.textDatePicker}>
    {new Date(date).toLocaleDateString("fr-FR")}
  </Text>
</TouchableOpacity>;
{
  /* Le dateTimePicker */
}
{
  visible && (
    <DateTimePicker
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"} //Version du dateTimePicker adapté aux versions androïd(default) et ios
      value={date}
      // minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
      onChange={onChange}
      // onConfirm={handleDatePicker}
      // onCancel={hideDatePicker}
    />
  );
}
