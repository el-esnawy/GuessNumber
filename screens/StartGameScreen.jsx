import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
  Switch,
} from "react-native";

import BodyText from "../components/BodyText";
import Input from "../components/Input";
import Card from "../components/Card";
import colors from "../constants/Colors";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const { height, width } = useWindowDimensions();

  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4,
  );

  // const [buttonWidth, setbuttonWidth] = useState(
  //   Dimensions.get("window").width / 4,
  // );

  // useEffect(() => {
  //   console.log("buton width updated", buttonWidth);
  //   const updateLayout = () => {
  //     setbuttonWidth(Dimensions.get("window").width / 4);
  //   };
  //   const subscription = Dimensions.addEventListener("change", updateLayout);

  //   return () => subscription?.remove();
  // }, [Dimensions]);

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };

  const onConfirmHandler = () => {
    const choosenNum = parseInt(enteredValue);
    if (isNaN(choosenNum) || choosenNum <= 0 || choosenNum > 99) {
      Alert.alert("Invalid Number", "A Number has to be between 1 and 99", [
        { text: "Ok", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  const startTheGame = () => {
    props.startGame(selectedNumber);
  };

  let confirmedOut;

  if (confirmed) {
    confirmedOut = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={startTheGame}>START GAME</MainButton>
      </Card>
    );
  }

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  return (
    <ScrollView>
      <KeyboardAvoidingView behavoir='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={{ ...styles.screen }}>
            <Text style={styles.title}>Start a New Game</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitaliza='none'
                autocorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                value={enteredValue}
                onChangeText={numberInputHandler}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Reset'
                    color={colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Confirm'
                    color={colors.primary}
                    onPress={onConfirmHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOut}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    padding: "10%",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    // maxWidth: '80%',
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // buttons: {
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
