import { Text, View, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/colors";

function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Magical Creature's Guess: {guess}</Text>
    </View>
  );
}
export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4, //for andriod
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },

  itemText: {
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
    color: "white",
    fontSize: Platform.select({
      ios: 16,
      android: 14,
    }),
  },
});
