import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginVertical: 40,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "#e0e0e0",
    elevation: 5,
    padding: 15,
    borderRadius: 15,
  },
});
