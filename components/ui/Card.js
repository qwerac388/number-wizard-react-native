import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.inputContainer}>{children}</View>;
}
export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: deviceWidth < 380 ? 20 : 24,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary700, //color from contance folder component
    borderRadius: 8,
    elevation: 10, // Android shadow
    // iOS shadow properties
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
