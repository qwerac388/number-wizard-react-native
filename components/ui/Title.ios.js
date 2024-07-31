import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}
export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Chalkduster",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    // borderColor: "white",
    padding: 12,
    maxWidth: "80%",
    width: 300,
    borderColor: Colors.accent500,
    borderWidth: 5,
    borderRadius: 15,
  },
});

//borderWidth: Platform.select({ ios: 0, android: 2 }),
