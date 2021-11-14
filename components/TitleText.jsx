import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TitleText = (props) => {
  return (
    <Text styles={styles.body} {...props}>
      {props.children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans-bold",
  },
});
