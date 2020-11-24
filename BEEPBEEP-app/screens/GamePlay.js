import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import GameScreen from "../screens/GameScreen";
import image from "../assets/img/roadMove.gif";

export default function GamePlay() {
  return (
    <ImageBackground source={image} style={styles.img}>
      <View>
        <GameScreen />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
