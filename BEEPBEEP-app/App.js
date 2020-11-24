import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import ScoreScreen from "./screens/ScoreScreen";
import GameScreen from "./screens/GameScreen";
import image from "./assets/img/road.gif";

export default function App() {
  return (
    <ImageBackground source={image} style={styles.img}>
      <View>
        <ScoreScreen />
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
    resizeMode: "cover",
    justifyContent: "center",
  },
});
