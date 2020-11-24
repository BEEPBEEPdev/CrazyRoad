import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StartGameScreen from "../screens/StartGameScreen";
import GamePlay from "../screens/GamePlay";

const MyNavigator = createStackNavigator(
  {
    Start: StartGameScreen,
    GamePlay: GamePlay,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
export default createAppContainer(MyNavigator);
