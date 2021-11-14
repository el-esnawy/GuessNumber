import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

export default function MainButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
      <View style={styles.button}>
        <Text style={styles.btntxt}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  btntxt: {
    color: "white",
    fontFamily: "open-sans",
  },
});
