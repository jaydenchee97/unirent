import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Auth } from "aws-amplify";

export default function ForgotPasswordScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

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
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {step === 1 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Pressable onPress={sendCode} style={styles.pressable}>
            <Text style={styles.buttonText}>Send Code</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Pressable onPress={resetPassword} style={styles.pressable}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </Pressable>
        </>
      )}
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
