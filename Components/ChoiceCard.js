import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChoiceCard = ({ player, choice: { uri, name }, isWinning, score}) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <MaterialCommunityIcons
        name="crown"
        size={35}
        color="rgb(250,250,30)"
        style={{ opacity: isWinning ? 100 : 0}}
      />
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  score: {
    width: 54,
    height: 54,
    borderRadius: 27,
    fontWeight: "600",
    fontSize: 20,
    backgroundColor: "rgb(250,250,30)",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: 10,
  },
  choiceContainer: {
    flex: 1,
    alignItems: "center",
  },
  choiceDescription: {
    fontSize: 25,
    color: "#250902",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  choiceCardTitle: {
    fontSize: 30,
    color: "#250902",
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  },
});

export default ChoiceCard;
