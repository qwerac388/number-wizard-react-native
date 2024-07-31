import Title from "../components/ui/Title";
import {
  View,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
  Platform,
} from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  //adjust the landscape UI using useWindowDimensions
  const { width, height } = useWindowDimensions();

  let imageSize = 150;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 380) {
    imageSize = 50;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Spell Complete!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          {/* the above to use both style from stylesheet and object */}
          <Image
            style={styles.image}
            source={require("../assets/images/success2.jpg")}
          />
        </View>
        <View>
          {/* Nested Text : Text inside text */}
          <Text style={styles.summaryText}>
            The magical creature guessed your number (
            <Text style={styles.highlight}>{userNumber}</Text>) in{" "}
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds!
          </Text>
        </View>
        <PrimaryButton onPress={onStartNewGame}>Cast a New Spell</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

//Use Dimensions from react native
// const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center", //to center all the elements inside view container including gameover and the rounded image
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%", //100% to the image container
  },
  summaryText: {
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
    color: "white",
  },
  highlight: {
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
    color: Colors.accent500,
  },
});
