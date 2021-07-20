
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, TextInput
} from 'react-native';
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

Icon.loadFont();


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [enteredDate, setDate] = useState("")
  const [formattedDate, setFormattedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();

    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();

    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
    if (currentDate < 10) { currentDate = '0' + currentDate; }

    let sdate = date.getFullYear() + "-" + currentMonth + "-" + currentDate;
    setDate(sdate)

    setFormattedDate(moment(sdate).format('yyyy-MM-DDT13:00:00.000Z'))

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <DateTimePickerModal
        style={{ width: 300, alignSelf: "center" }}
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.rowTextStyle}>Select Date</Text>

      <Card
        style={styles.cardStyle}
        elevation={0.8}
        cornerRadius={2}>

        <TextInput
          value={enteredDate} placeholderTextColor={"grey"} editable={false}
          placeholder="Select Date" style={styles.textStyle}
        />
        <Icon
          onPress={showDatePicker} name="calendar" size={20} color="#337AB7" style={styles.iconStyle} />

      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, backgroundColor: "lightgrey", opacity: 0.9
  },
  rowTextStyle: {
    width: "92%", alignSelf: "center",
    fontWeight: "bold", marginRight: 5, fontSize: 18, color: "#337AB7", marginTop: "3%", marginLeft: 2,
  },
  cardStyle:{
    width: "92%", alignSelf: "center", paddingLeft: 10, paddingRight: 10, marginTop: 5, height: '6%', marginBottom: 5, flexDirection: "row"
  },
  textStyle:{
    width: "90%", fontSize: 15, alignSelf: "center", color: 'black', alignItems: "center",
  },
  iconStyle:{
    marginLeft: 10, alignSelf: "center", alignItems: "center",
  }
});

export default App;
