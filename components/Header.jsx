import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}>
      <Text style={styles.headerTitle}> {props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,

    alignItems: "center",
    justifyContent: "center",
    fontFamily: "open-sans-bold",
  },

  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
  },

  headerTitle: {
    color: Platform.OS === "android" ? "white" : "black",
    fontSize: 18,
    fontWeight: "500",
  },
});
