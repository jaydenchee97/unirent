import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Auth } from "aws-amplify";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      navigation.navigate("SignInScreen");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={signUp} style={styles.pressable}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignInScreen")} style={styles.link}>
        <Text style={styles.linkText}>Back to Sign In</Text>
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
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#2196F3",
  },
});
