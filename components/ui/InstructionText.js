import { Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/colors";

//Children refers to the content of the instruction text in the StartGameScreen
//Style below means the default style from parent component wont override the incoming style, can rearrange and change the order
function InstructionText({ children, style }) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}
export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
    textAlign: "center",
  },
});
