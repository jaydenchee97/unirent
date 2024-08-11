import React, { useState } from "react";
import { View, Image, Text, TextInput, Pressable } from "react-native";
import { Auth } from "aws-amplify";
import { useSharedStyles } from "../style/sharedStyles";

export default function SignInScreen({ navigation }) {
  const styles = useSharedStyles();
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
      <Image source={require("../assets/unirent-logo.png")} style={styles.logo} />
      <Text style={styles.title}>Sign In</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("RegisterScreen")} style={styles.link}>
        <Text style={styles.linkText}>Register</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ForgotPasswordScreen")} style={styles.link}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </Pressable>
    </View>
  );
}
