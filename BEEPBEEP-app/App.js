import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import ScoreScreen from "./screens/ScoreScreen";
import GameScreen from "./screens/GameScreen";
import image from "./assets/img/roadMove.gif";

export default function App() {
  return (
    <ImageBackground source={image} style={styles.img}>
      <View>
        <GameScreen />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  img: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
