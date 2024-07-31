import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
//Primary Button is a custom button = View + TextInput + Pressable
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  //to set size dynamically for different screen orientations
  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  //Error Handling and the Alert Msg
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber); // TextInput default as String, so need convert it into number by using parseInt
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!", // title of the alert msg
        "Number has to be number between 1 to 99", // description text
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      ); // button content text = Okay, destructive text turn it to red text, and it will trigger the resetInputHandler
      return;
    }
    onPickNumber(chosenNumber); //this will pass the chosenNumber to the App.js for userNumber
  }

  const marginTopDistance = height < 380 ? 30 : 100;

  //below to add the margintop styling using useWindowDimension() API
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Number Wizard</Title>
          <Card>
            <InstructionText>
              Think of a number between 1 and 99
            </InstructionText>
            {/* TextInput default as String, so need another function to convert it into number by using parseInt */}
            <TextInput
              style={styles.numberInput}
              maxLength={2} //user input maxLength to limit number into 2 digit
              keyboardType="number-pad" // to control the keyboard we get
              autoCapitalize="none" // auto capitalized user character input
              autoCorrect={false} //autoCorrect user input
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>
                  Clear the Mind
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Begin the Spell
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get("window").height; //for auto rotate screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1, //so that it take up space as much as possible
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 24,
    borderBottomColor: Colors.accent500, //color from contance folder component
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
