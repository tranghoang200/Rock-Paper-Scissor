import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Button from "./Components/Button";
import ChoiceCard from "./Components/ChoiceCard";
import Setting from "./Components/Setting";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CHOICES from "./assets/data";

const getRoundOutcome = (userChoice) => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === "rock") {
    result = computerChoice === "scissors" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "paper") {
    result = computerChoice === "rock" ? "Victory!" : "Defeat!";
  }
  if (userChoice === "scissors") {
    result = computerChoice === "paper" ? "Victory!" : "Defeat!";
  }

  if (userChoice === computerChoice) result = "Tie game!";
  return [result, computerChoice];
};

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];

export default function App() {
  const [gamePrompt, setGamePrompt] = useState("Choose your weapon!");
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [clickSetting, setClickSetting] = useState(false);
  const [userWin, setUserWin] = useState(false);
  const [totalGame, setTotalGame] = useState(0);

  const getResultColor = () => {
    if (gamePrompt === "Victory!") return "green";
    if (gamePrompt === "Defeat!") return "red";
    return null;
  };

  const reset = () => {
    setGamePrompt("Choose your weapon!");
    setUserChoice({});
    setComputerChoice({});
    setUserScore(0);
    setComputerScore(0);
    setUserWin(false);
    setTotalGame(0);
    setClickSetting(false);
  };

  const setting = () => {
    setClickSetting(clickSetting => !clickSetting);
  }

  const onPress = (playerChoice) => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(
      (choice) => choice.name === playerChoice
    );
    const newComputerChoice = CHOICES.find(
      (choice) => choice.name === compChoice
    );

    if (result === "Victory!") {
      setUserScore((userScore) => userScore + 1);
      setUserWin(true);
    } else if (result === "Defeat!") {
      setComputerScore((computerScore) => computerScore + 1);
      setUserWin(false);
    }

    setTotalGame((totalGame) => totalGame + 1);
    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
  };

  let tie = totalGame - userScore - computerScore;
  let winRate = totalGame == 0 ? 0: userScore / (userScore + computerScore);

  return (
    <SafeAreaView style={styles.container}>
      <Setting
        onSetting={clickSetting}
        winRate={winRate}
        totalGame={totalGame}
        win={userScore}
        lose={computerScore}
        draw={tie}
        reset={reset}
        clickSetting={setting}
      />
      <Text style={{ fontSize: 35, color: getResultColor() }}>
        {gamePrompt}
      </Text>

      <View style={styles.choicesContainer}>
        <ChoiceCard
          player="Player"
          choice={userChoice}
          isWinning={userWin}
          score={userScore}
        />
        <Text style={{ color: "#250902" }}>vs</Text>
        <ChoiceCard
          player="Computer"
          choice={computerChoice}
          isWinning={!userWin}
          score={computerScore}
        />
      </View>
      {CHOICES.map((choice) => {
        return (
          <Button key={choice.name} name={choice.name} onPress={onPress} />
        );
      })}
      <View style={{alignSelf:"flex-end", position: "absolute", bottom: 0}}>
        <TouchableOpacity style={styles.button} onPress={setting}>
          <MaterialCommunityIcons
            name="settings"
            size={32}
            color="rgb(193,6,51)"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9ebee",
  },
  button: {
    width: 54,
    height: 54,
    marginVertical: 10,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: "rgb(200,200,200)",
    backgroundColor: "rgb(250,250,30)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 20,
    shadowRadius: 5,
    paddingBottom: 20,
    borderColor: "grey",
    shadowOpacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { height: 5, width: 5 },
  },
});
