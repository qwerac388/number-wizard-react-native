import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/colors";

//below is a props destructuring for custom button
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      {/* Pressable shd always put inside View container so that the ripple effect won't exceeded the container */}
      {/* Whenever the button is pressed inside below function, it will trigger the effect */}
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.primary600 }} //from the color component
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500, //from the color component
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: Platform.select({
      ios: "Chalkduster",
      android: "serif",
    }),
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
