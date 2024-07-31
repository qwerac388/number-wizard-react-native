import { useState } from "react";
//ImageBackground for the image
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
// "npx expo install expo-linear-gradient" in terminal for linear gradient
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { StatusBar } from "expo-status-bar"; //to change the status bar color to either light or dark

// Keep the splash screen visible while we fetch resources

export default function App() {
  const [userNumber, setUserNumber] = useState(); //for all screen use
  const [gameIsOver, setGameIsOver] = useState(true); //for passing to the gameOverScreen
  const [guessRounds, setGuessRounds] = useState(0); //for passing to the gameOverScreen
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadResources() {
  //     try {
  //       await Font.loadAsync({
  //         "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  //         "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  //       });
  //       setFontsLoaded(true);
  //       await SplashScreen.hideAsync(); // Ensure splash screen is hidden once fonts are loaded
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   }

  //   loadResources();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null; // Avoid rendering until fonts are loaded
  // }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false); // to avoid gameover screen pop up when gamestart
  }

  // to end the game
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  //for the restart button of the gameOverScreen
  function startNewGameHandler() {
    setUserNumber(null); //reset all value
    setGuessRounds(0);
  }

  //Below condition to Switch between StartScreen to GameScreen
  //Screen is default StartScreen, but if userNumner is Truthy, screen become GameScreen
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />; // if userNumber(the user entered  numner) is truthy, it will switch to GameScreen

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  //Switch to gameOver screen if gameIsOver and userNumber is truthy
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      {/* Below to change the status bar on top of screen to either light or dark */}
      <StatusBar style="light" />
      {/* Below are the two gradient color, from constance folder color.js */}
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background3.jpg")} //All images source needs require
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage} //so that both linear gradient and background color exists
        >
          {/* Use safe area so that text content wont take up to the notch (on top of the screen) */}
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>

          {/* to switch between StartGameScreen and GameScreen */}
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, //so that the bg color take up the full screen
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
