import React from "react";
import { StyleSheet, useColorScheme, ViewStyle, TextStyle, ImageStyle } from "react-native";

// Define types for your styles
type SharedStyles = {
  container: ViewStyle;
  logo: ImageStyle;
  title: TextStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  link: ViewStyle;
  linkText: TextStyle;
  error: TextStyle;
  errorText: TextStyle;  // <-- Added this line
};


// A hook that returns the shared styles
export const useSharedStyles = (): SharedStyles => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#f0f4f8",
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#000000",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 15,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
    button: {
      width: "100%",
      padding: 15,
      backgroundColor: isDarkMode ? "#1e90ff" : "#007bff",
      borderRadius: 8,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    link: {
      marginTop: 15,
    },
    linkText: {
      color: isDarkMode ? "#1e90ff" : "#007bff",
      textDecorationLine: "underline",
    },
    error: {
      color: "red",
      marginBottom: 15,
    },
    errorText: {
      fontSize: 14,
      color: "red",
      textAlign: "center",
    }, 
  });
};
