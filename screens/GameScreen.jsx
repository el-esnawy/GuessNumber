import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  useWindowDimensions,
  Dimensions,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/Colors";
import MainButton from "../components/MainButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

const HIGHER = "HIGHER";
const LOWER = "LOWER";

const generateRadonBetnween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rnd = Math.floor(Math.random() * (max - min) + min);
  if (rnd === exclude) {
    return generateRadonBetnween(min, max, exclude);
  } else {
    return rnd;
  }
};

const renderListItem = (roundNumber, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{roundNumber - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const GameScreen = (props) => {
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    );
  }
  changeScreenOrientation();
  const { height, width } = useWindowDimensions();
  const initalGuess = generateRadonBetnween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [pastGuesses, setPastGuesses] = useState([initalGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, props.onGameOver, props.userChoice]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === LOWER && currentGuess < props.userChoice) ||
      (direction === HIGHER && currentGuess > props.userChoice)
    ) {
      Alert.alert(`Don't Lie`, "You know this is wring... ", [
        { text: "OK", style: "default" },
      ]);
      return;
    }

    if (direction === LOWER) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRadonBetnween(
      currentLow.current,
      currentHigh.current,
      currentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((prevState) => [nextNumber.toString(), ...prevState]);
  };

  if (height < 400) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, LOWER)}>
            {/* <AntDesign name='arrowdown' size={16} color='white' /> LOWER */}
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess} </NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, HIGHER)}>
            <Ionicons name='md-add' size={24} color='white' />
            {/* <AntDesign name='arrowup' size={16} color='white' /> HIGHER */}
          </MainButton>
        </View>
        <Text>Your Number is... </Text>
        <Card style={styles.buttonContainer}></Card>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index),
          )}

        </ScrollView> */}

          <FlatList
            contentContainerStyle={styles.list}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            keyExtractor={(item) => {
              return Math.random() * 10000000;
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Text>Your Number is... </Text>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, LOWER)}>
          {/* <AntDesign name='arrowdown' size={16} color='white' /> LOWER */}
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, HIGHER)}>
          <Ionicons name='md-add' size={24} color='white' />
          {/* <AntDesign name='arrowup' size={16} color='white' /> HIGHER */}
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index),
          )}

        </ScrollView> */}

        <FlatList
          contentContainerStyle={styles.list}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  listItem: {
    width: "30%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginHorizontal: "auto",
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    width: "100%",
  },
  listContainer: {
    flex: 1,
  },
  list: {
    flexGrow: 1,

    justifyContent: "flex-end",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
});
