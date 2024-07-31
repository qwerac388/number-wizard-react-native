import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons"; //for the + and - icon like MUI, https://icons.expo.fyi/Index
import GuessLogItem from "../components/game/GuessLogItem";

//For Computer Random Guess, exclude is the userinput
function generateRandomBetween(min, max, exclude) {
  //+min so that the random round down number is always greater than zero
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  //this keep generate random numnber as long as exclude(userInput) doesnt match
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber); //function generateRandomBetween(min, max, exclude)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]); //for the GameOver screen use
  const { width, height } = useWindowDimensions(); //to adjust the landscape UI mode inside component

  //to use the props onGameOver from App.js and
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length); //this is a function from app.js named gameOveHandler
    }
  }, [currentGuess, userNumber, onGameOver]); // put these into dependencies so that whenever they are changed, onGameOver will be called and re-executed

  //to reset the game as dependencies are empty and  so that it can be reset
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    //Condition either 'lower" or "greater"

    //In case if user lies when they are giving hits
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("No Deception!", "The wizard senses your falsehood...", [
        { text: "I Apologize", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess; //the max that computer shd guess is the user input
    } else {
      minBoundary = currentGuess + 1; //so that we won't get the same guess again
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber); //set it as new random number
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      {/* the above to put the random number into NumberContainer */}
      <Card>
        <InstructionText style={styles.instructionText}>
          Should the guess be Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          {/* wrap all button with an individual view container for fitting the flex
      direction inside a card */}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              {/* external library from Ionicons like MUI */}
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              {/* add is the icon function */}
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  //for the landscape mode set up
  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Below title and components refers to a component, not a function directly from react-native */}
      <Title>Magical Creature's Guess:</Title>
      {content}
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRounds) => (
          <Text key={guessRounds}>{guessRounds}</Text>
        ))} */}
        {/* Use flatlist (scrollable) instead of map to render the computer guess, data is the computer guess, item is the number that from computerguess(itemData), and key is a unique value that needed for react */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, // so that it takes up all the available space , instead of just space needed by the content
    padding: 40,
    alignItems: "center",
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
  },
});
