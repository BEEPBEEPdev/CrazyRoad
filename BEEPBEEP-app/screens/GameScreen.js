import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
import image from "../assets/img/roadMove.gif";
import hornsfx from "../assets/sound/horn.wav";
import ostsfx from "../assets/sound/ost.wav";
import turnsfx from "../assets/sound/turn.wav";
import dingsfx from "../assets/sound/ding.wav";
import explotionsfx from "../assets/sound/explotion.wav";
import splatsfx from "../assets/sound/splat.wav";

const turn = new Audio(turnsfx);
const ding = new Audio(dingsfx);
const explotion = new Audio(explotionsfx);
const splat = new Audio(splatsfx);
const horn = new Audio(hornsfx);
const ost = new Audio(ostsfx);
const playSound = audioFile => {
  audioFile.play();
}
const pauseSound = audioFile => {
  audioFile.pause();
}

const initialItems = [
  {
    itemNo: 1,
    src: require("../assets/img/CarOj.gif"),
    speed: 8,
    score: 0,
  },
  {
    itemNo: 2,
    src: require("../assets/img/CarOj2.gif"),
    speed: 8,
    score: 0,
  },
  {
    itemNo: 3,
    src: require("../assets/img/CarOj3.gif"),
    speed: 8,
    score: 0,
  },
  {
    itemNo: 4,
    src: require("../assets/img/CarOj.gif"),
    speed: 8,
    score: 0,
  },
  {
    itemNo: 5,
    src: require("../assets/img/StarPlus.gif"),
    speed: 8,
    score: 0,
  },
  {
    itemNo: 6,
    src: require("../assets/img/Uncle.gif"),
    speed: 8,
    score: 0,
  },
  {
    itemNo: 7,
    src: require("../assets/img/Aunt.gif"),
    speed: 8,
    score: 0,
  },
];

export default class GameScreen extends React.Component {
  state = {
    grid: [
      Dimensions.get("window").width / 2 - 50,
      Dimensions.get("window").width / 2,
      Dimensions.get("window").width / 2 + 50,
    ],
    characterPosition: 1,
    currentItems: [],
    countItem: 0,
    score: 0,
    finalScore: 0,
    life: 1,
    collectItems: [],
  };

  componentDidMount() {
    this.gameRuning();
  }
  playMusic(){
    playSound(ost);
  }

  gameRuning() {
    this.generateItems = setInterval(() => {
      this.generateItem(initialItems);
    }, 1000);

    this.handleItems = setInterval(() => {
      this.itemFall();
      this.itemDestroy();
    }, 25);

    this.plusScore = setInterval(() => {
      this.setState({ score: this.state.score + 1 });
    }, 200);
  }

  moveLeft() {
    playSound(turn);
    if (this.state.characterPosition != 0)
      this.setState({ characterPosition: this.state.characterPosition - 1 });
  }

  moveRight() {
    playSound(turn);
    if (this.state.characterPosition != 2)
      this.setState({ characterPosition: this.state.characterPosition + 1 });
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generateItem(array) {
    let index = this.randomInt(0, array.length - 1);
    let newItem = array[index];
    let position = this.randomInt(0, 2);
    newItem.pos = position;
    newItem.bottom = 350;
    newItem.no = this.state.countItem;

    this.setState({
      currentItems: [...this.state.currentItems, newItem],
      countItem: this.state.countItem + 1,
    });
  }

  itemFall() {
    this.setState((state) => ({
      currentItems: state.currentItems.map((item) => {
        return { ...item, bottom: item.bottom - item.speed };
      }),
    }));
  }

  itemDestroy() {
    this.state.currentItems.forEach((item) => {
      if (
        item.pos == this.state.characterPosition &&
        item.bottom < 0 &&
        item.itemNo != 5 &&
        item.itemNo != 6 &&
        item.itemNo != 7
      ) {
        playSound(explotion);
        pauseSound(ost);
        this.setState({
          life: this.state.life - 1, //โดนแล้วเวลาหมด = ตาย
          finalScore: this.state.score, //เพิ่มตัวแปรใหม่ ไว้เก็บ score ตอนตาย ไม่งั้น score จะเพิ่มไปเรื่อยๆ
          //score: this.state.score + item.score,
          //collectItems: [...this.state.collectItems, item.itemNo],
          currentItems: this.state.currentItems.filter(
            (ele) => ele.no != item.no
          ),
        });
      } else if (
        item.pos == this.state.characterPosition &&
        item.bottom < 0 &&
        item.itemNo == 5
      ) {
        playSound(ding);
        this.setState({
          score: this.state.score + 100,
          currentItems: this.state.currentItems.filter(
            (ele) => ele.no != item.no
          ),
        });
      } else if (
        item.pos == this.state.characterPosition &&
        item.bottom < 0 &&
        item.itemNo == 6
      ) {
        playSound(splat);
        this.setState({
          score: this.state.score - 100,
          currentItems: this.state.currentItems.filter(
            (ele) => ele.no != item.no
          ),
        });
      } else if (
        item.pos == this.state.characterPosition &&
        item.bottom < 0 &&
        item.itemNo == 7
      ) {
        playSound(splat);
        this.setState({
          score: this.state.score - 100,
          currentItems: this.state.currentItems.filter(
            (ele) => ele.no != item.no
          ),
        });
      }
    });

    this.setState({
      currentItems: this.state.currentItems.filter((item) => item.bottom > -25),
    });
  }

  renderItems() {
    let items = [];
    this.state.currentItems.forEach((item, index) => {
      items.push(
        <View
          key={index}
          style={{
            bottom: item.bottom,
            left: this.state.grid[item.pos] - 27,
            alignSelf: "center",
            position: "absolute",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 75,
              height: 125,
            }}
            source={item.src}
          />
        </View>
      );
    });
    return items;
  }

  renderResultScreen() {
    clearInterval(this.generateItems);
    clearInterval(this.handleItems);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          source={require("../assets/img/gameOver.png")}
        />
        <Text style={{ fontSize: 24, color: "white" }}>
          Total Score:{" "}
          <Text style={{ fontSize: 48, color: "white" }}>
            {this.state.finalScore}
          </Text>
        </Text>

        <View height={20} />

        <View height={40} />

        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            backgroundColor: "#ff002b",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            playSound(turn);
            this.setState({
              characterPosition: 1,
              countItem: 0,
              currentItems: [],
              score: 0,
              life: 1,
              collectItems: [],
            });
            this.gameRuning();
            this.playMusic();
          }}
        >
          <Text style={{ fontSize: 20, color: "#fff" }}>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderGamePlayScreen() {
    return (
      // <ImageBackground
      //   source={image}
      //   style={{
      //     img: {
      //       flex: 1,
      //       alignItems: "center",
      //       resizeMode: "cover",
      //       justifyContent: "center",
      //     },
      //   }}
      // >
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            marginTop: -10,
            fontSize: 50,
            alignSelf: "center",
            color: "white",
            backgroundColor: "black",
          }}
        >
          {this.state.score}
        </Text>
        <View
          style={{
            width: 350,
            height: 400,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          {this.renderItems()}
        </View>
        <Image
          style={{
            width: 75,
            height: 125,
            left: this.state.grid[this.state.characterPosition] - 37.5,
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
            onPress={() => this.moveLeft()}
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


          {/* HORN---------------------------------------------------------------------------- */}

          <TouchableOpacity
            onPress={() => playSound(horn)}
            style={{
              // borderWidth: 1,
              width: 120,
              height: 80,
              justifyContent: "center",
              paddingLeft: 35,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 45,
              }}
              source={require("../assets/img/horn.png")}
            />
          </TouchableOpacity>

          {/* HORN---------------------------------------------------------------------------- */}


          <TouchableOpacity
            onPress={() => this.moveRight()}
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

        {/* <Text>{JSON.stringify(this.state.currentItems)}</Text> */}
      </View>
      // </ImageBackground>
    );
  }

  render() {
    if (this.state.life <= 0) {
      return this.renderResultScreen();
    } else {
      return this.renderGamePlayScreen();
    }
  }
}
