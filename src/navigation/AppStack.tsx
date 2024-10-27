import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import HomeStack from "./HomeStack";
import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import LoginScreen from "../screens/LoginScreen";
import { getEncryptionKey } from '../api/EncryptionKeyAPI';
import * as SecureStore from 'expo-secure-store';
import { decrypt, encrypt } from '../utils/SecurityUtils';
import { Platform } from 'react-native';
import { isWeb } from '../utils';

const Stack = createStackNavigator();

export default function AppStack() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [customState, setCustomState] = useState<string | null>(null);

  //   const { width, height } = Dimensions.get("window");
  //   const aspectRatio = height / width;

  //   const isTabletOrWebView = aspectRatio < 1.6; // Assumes 4:3 aspect ratio for tablets

  //   const theme = useTheme(); // Move useTheme inside the component

  //   const styles = StyleSheet.create({
  //     webViewStyles: {
  //       backgroundColor: theme.colors.background,
  //       paddingHorizontal: "20%",
  //     },
  //     phoneViewStyles: {
  //       backgroundColor: theme.colors.background,
  //     },
  //   });

  const handleAuth = async (): Promise<void> => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User is already authenticated:", user);
      setIsAuthenticated(true);
    } catch {
      console.log("User is not authenticated, redirecting to login");
      setIsAuthenticated(false); // Explicitly set as false if authentication fails
    }
  };

  const handleEncryption = async () => {
    try {
      const { plaintextKey, ciphertextKey } = await getEncryptionKey();
      console.log("plaintextKey:" + plaintextKey);
      console.log("ciphertextKey:" + ciphertextKey);
      if (isWeb) {
        localStorage.setItem("ciphertextKey", ciphertextKey);
        console.log("ciphertextKey stored in local storage successfully.");
      } else {
        await SecureStore.setItemAsync("ciphertextKey", ciphertextKey);
        console.log("ciphertextKey stored in secure store successfully.");
      }   
    } catch (error) {
      console.error("Error in axios.post test:", error);
    }
  };

  // Testing security functions [start]
  // const handleEncryptionTest = async () => {
  //   console.log("Encryption Test");
  //   const test = "test";
  //   const ciphertext = await encrypt(test);
  //   console.log("ciphertext of test: " + ciphertext);
  // }

  // const handleDecryptionTest = async () => {
  //   console.log("Decryption Test");
  //   const test = "U2FsdGVkX1+5u3VeHlexkuyNy6t0iJQfpUHHoWbkvSw=";
  //   const plaintext = await decrypt(test);
  //   console.log("plaintext of test:", plaintext);
  // };
  // Testing security functions [End]

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setIsAuthenticated(true);
          break;
        case "signOut":
          setIsAuthenticated(false);
          break;
        case "customOAuthState":
          setCustomState(data);
          break;
      }
    });

    handleAuth();
    handleEncryption();
    // Testing security functions [Start]
    // handleEncryption().then(handleEncryptionTest);
    // handleEncryption().then(handleDecryptionTest);
    // Testing security functions [End]

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // Show the landing screen (or a splash/loading screen)
  }

  return (
    <Stack.Navigator
    //   screenOptions={{
    //     cardStyle: isTabletOrWebView
    //       ? styles.webViewStyles
    //       : styles.phoneViewStyles,
    //   }}
    >
      {isAuthenticated ? (
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="LandingScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
