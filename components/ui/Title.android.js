import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
//seperating andriod.js and ios.js, reactnative will automatically detect and pickup the respective file and styling

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}
export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "serif",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    padding: 12,
    maxWidth: "80%",
    width: 300,
    borderColor: Colors.accent500,
    borderWidth: 3,
    fontWeight: "bold",
    marginTop: 10,
  },
});

//borderWidth: Platform.select({ ios: 0, android: 2 }),
