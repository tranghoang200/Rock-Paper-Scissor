import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class ModalSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  container = (onSetting) => {
    return {
      backgroundColor: "#fff",
      width: "70%",
      height: "30%",
      position: "absolute",
      zIndex: this.props.onSetting ? 1 : -1,
      borderRadius: 20,
      padding: 20,
      borderColor: "rgb(193,6,51)",
      borderWidth: 3,
      opacity: onSetting ? 100 : 0,
    };
  };
  render() {
    const winRate = Math.floor(this.props.winRate * 100);
    return (
      <View style={this.container(this.props.onSetting)}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="settings"
            size={32}
            color="rgb(193,6,51)"
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={this.props.clickSetting}
          >
            <MaterialCommunityIcons
              name="window-close"
              size={32}
              color="rgb(193,6,51)"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.message}>Total games: {this.props.totalGame}</Text>
        <Text style={styles.message}>
          Win: {this.props.win} - Tie: {this.props.draw} - Lose:{" "}
          {this.props.lose}
        </Text>
        <Text style={styles.message}>Your winrate: {winRate}%</Text>
        <TouchableOpacity style={styles.button} onPress={this.props.reset}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "400" }}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgb(193,6,51)",
    marginTop: 20,
  },
  message: {
    fontSize: 18,
    alignSelf: "center",
    color: "rgb(193,6,51)",
    marginVertical: 3,
  },
  buttonClose: {},
});
