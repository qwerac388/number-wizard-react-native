import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}
export default NumberContainer;

//to adjust the device width using Dimension method, window excluded the status bar, and screen include the status bar
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 20 : 24, // if deviceWidth is less than 380 pixel, padding will be 12 , otherwise padding is 24
    margin: deviceWidth < 380 ? 18 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 26 : 34, // if deviceWidth is less than 380 pixel,  padding will be 12 , otherwise padding is 24
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
  },
});
