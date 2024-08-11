import React, { useState } from "react";
import { View, TextInput, Pressable, Image } from "react-native";
import { Text } from "react-native-paper";
import { Auth } from "aws-amplify";
import { useSharedStyles } from "../style/sharedStyles";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const sharedStyles = useSharedStyles();

  const signUp = async () => {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      navigation.navigate("SignInScreen");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Image source={require("../assets/unirent-logo.png")} style={sharedStyles.logo} />
      <Text style={sharedStyles.title}>Register</Text>
      {error && <Text style={sharedStyles.errorText}>{error}</Text>}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={sharedStyles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={sharedStyles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={sharedStyles.input}
      />
      <Pressable onPress={signUp} style={sharedStyles.button}>
        <Text style={sharedStyles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignInScreen")} style={sharedStyles.link}>
        <Text style={sharedStyles.linkText}>Back to Sign In</Text>
      </Pressable>
    </View>
  );
}
