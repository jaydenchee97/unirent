import React, { useState } from "react";
import { View, TextInput, Pressable, Image } from "react-native";
import { Text } from "react-native-paper";
import { Auth } from "aws-amplify";
import { useSharedStyles } from "../style/sharedStyles";

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const sharedStyles = useSharedStyles();

  const sendCode = async () => {
    try {
      await Auth.forgotPassword(username);
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      navigation.navigate("SignInScreen");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={sharedStyles.container}>
      <Image source={require("../assets/unirent-logo.png")} style={sharedStyles.logo} />
      <Text style={sharedStyles.title}>Forgot Password</Text>
      {error && <Text style={sharedStyles.errorText}>{error}</Text>}
      {step === 1 ? (
        <>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={sharedStyles.input}
          />
          <Pressable onPress={sendCode} style={sharedStyles.button}>
            <Text style={sharedStyles.buttonText}>Send Code</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Verification Code"
            value={code}
            onChangeText={setCode}
            style={sharedStyles.input}
          />
          <TextInput
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={sharedStyles.input}
          />
          <Pressable onPress={resetPassword} style={sharedStyles.button}>
            <Text style={sharedStyles.buttonText}>Reset Password</Text>
          </Pressable>
        </>
      )}
      <Pressable onPress={() => navigation.navigate("SignInScreen")} style={sharedStyles.link}>
        <Text style={sharedStyles.linkText}>Back to Sign In</Text>
      </Pressable>
    </View>
  );
}
