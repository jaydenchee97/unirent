import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Auth } from "aws-amplify";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    try {
      await Auth.signIn(username, password);
      navigation.navigate("HomeStack");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={signIn} style={styles.pressable}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("RegisterScreen")} style={styles.pressable}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ForgotPasswordScreen")} style={styles.pressable}>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pressable: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
