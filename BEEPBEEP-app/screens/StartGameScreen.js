import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import GamePlay from "../screens/GamePlay";
import image from "../assets/img/road.gif";
import ostsfx from "../assets/sound/ost.wav";

const ost = new Audio(ostsfx);
const playSound = (audioFile) => {
  audioFile.play();
};

export default function StartGameScreen({ navigation }) {
  playSound(ost);
  return (
    <ImageBackground source={image} style={styles.img}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            flex: 1,
            width: 230,
            height: 287,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={require("../assets/img/icon.png")}
        />
        <TouchableOpacity
          style={{
            width: 200,
            height: 80,
            backgroundColor: "#ff002b",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("GamePlay");
          }}
        >
          <Text style={{ fontSize: 35, color: "#fff" }}>Start</Text>
        </TouchableOpacity>
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
