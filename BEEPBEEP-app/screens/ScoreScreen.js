import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ScoreScreen = (props) => {
  const initialItems = [
    {
      itemNo: 1,
      src: require("../assets/img/rsz_other-car1.png"),
      speed: 6,
      score: 0,
    },
    {
      itemNo: 2,
      src: require("../assets/img/rsz_other-car2.png"),
      speed: 6,
      score: 0,
    },
    {
      itemNo: 3,
      src: require("../assets/img/rsz_other-car3.png"),
      speed: 8,
      score: 0,
    },
    {
      itemNo: 4,
      src: require("../assets/img/rsz_other-car4.png"),
      speed: 4,
      score: 0,
    },
    {
      itemNo: 5,
      src: require("../assets/img/star.png"),
      speed: 8,
      score: 0,
    },
  ];
  const [playerPosition, setPlayerPosition] = useState(1);
  const [grid, setGrid] = useState([
    // Dimensions.get("window").width / 2 - 100,
    Dimensions.get("window").width / 2 - 50,
    Dimensions.get("window").width / 2,
    Dimensions.get("window").width / 2 + 50,
    // Dimensions.get("window").width / 2 + 100,
  ]);

  const [countItem, setCountItem] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [score, setScore] = useState(0);
  const [lifePoint, setLifePoint] = useState(1);
  const [collectItems, setCollectItems] = useState([]);

  const moveLeft = () => {
    if (playerPosition != 0) {
      setPlayerPosition(playerPosition - 1);
    }
  };

  const moveRight = () => {
    if (playerPosition != 2) {
      setPlayerPosition(playerPosition + 1);
    }
  };

  const gameRunning = () => {
    const generateItems = () => {
      setInterval(() => {
        generateItem(initialItems);
      }, 500);
    };

    const handleItems = () => {
      setInterval(() => {
        itemFall();
        itemDestroy();
      }, 25);
    };

    const scorePlus = () => {
      setInterval(() => {
        setScore(score + 1);
      }, 500);
    };
  };

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generateItem = (array) => {
    let index = randomInt(0, array.length - 1);
    let newItem = array[index];
    let position = randomInt(0, 6);
    newItem.pos = position;
    newItem.bottom = 350;
    newItem.no = countItem();

    setCurrentItems([...currentItems, newItem]);
    setCountItem(countItem + 1);
  };

  const itemFall = () => {
    setCurrentItems(
      currentItems.map((item) => {
        return { ...item, bottom: item.bottom - item.speed };
      })
    );
  };

  const itemDestroy = () => {
    currentItems.forEach((item) => {
      if (item.pos == playerPosition && item.bottom < 0) {
        setCollectItems([...collectItems], item.itemNo);
        setCurrentItems(currentItems.filter((ele) => ele.no != item.no));
      }
    });
    setCurrentItems(currentItems.filter((item) => item.bottom > -25));
  };

  const renderItems = () => {
    let items = [];
    currentItems.forEach((item, index) => {
      items.push(
        <View
          key={index}
          style={{
            bottom: item.bottom,
            left: grid[item.pos] - 56,
            alignSelf: "center",
            position: "absolute",
          }}
        >
          <Image
            style={{
              width: 45,
              height: 45,
            }}
            source={item.src}
          />
        </View>
      );
    });
    return items;
  };

  return (
    <View
      style={{
        marginTop: 100,
      }}
    >
      <Text
        style={{
          marginTop: -10,
          fontSize: 35,
          alignSelf: "center",
          color: "white",
        }}
      >
        {score}
      </Text>
      <View
        style={{
          width: 350,
          height: 400,
          flexDirection: "row",
          alignSelf: "center",
        }}
      ></View>
      <Image
        style={{
          width: 75,
          height: 125,
          left: grid[playerPosition] - 37.5,
        }}
        source={require("../assets/img/P1Car.gif")}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={moveLeft}
          style={{
            // borderWidth: 1,
            width: 120,
            height: 80,
            justifyContent: "center",
            paddingLeft: 20,
          }}
        >
          <Image
            style={{
              width: 90,
              height: 90,
            }}
            source={require("../assets/img/left.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={moveRight}
          style={{
            // borderWidth: 1,
            width: 120,
            height: 80,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingRight: 20,
          }}
        >
          <Image
            style={{
              width: 90,
              height: 90,
            }}
            source={require("../assets/img/right.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ScoreScreen;
