import React, { useState } from "react";
import {
  StyleSheet,
  Switch,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNum, setUserNum] = useState();
  const [numberOfGuesses, setNumbOfGuess] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(e) => console.log(e)}
      />
    );
  }

  const newGameHandler = () => {
    setNumbOfGuess(0);
    setUserNum(undefined);
  };

  const startGameHandler = (num) => {
    setUserNum(num);

    setNumbOfGuess(0);
  };

  let content = <React.Fragment />;

  const onGameOverHandler = (numberOfGuesses) => {
    setNumbOfGuess(numberOfGuesses);
  };

  if (userNum) {
    content = (
      <GameScreen userChoice={userNum} onGameOver={onGameOverHandler} />
    );
  }
  if (!userNum) {
    content = <StartGameScreen startGame={startGameHandler} />;
  }
  if (numberOfGuesses > 0) {
    content = (
      <GameOverScreen
        userChoice={userNum}
        numGuesses={numberOfGuesses}
        startNewGame={newGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess a Number App'></Header>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: "#1b1b1b",
  },
});
