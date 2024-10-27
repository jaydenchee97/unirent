import { Authenticator } from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import awsExports from "./src/aws-exports";
import MaskOverlay from "./src/components/MaskOverlay";
import AppStack from "./src/navigation/AppStack";
import HomeStack from "./src/navigation/HomeStack";

const isWeb = Platform.OS === "web";
// auth configuration
const authConfig = {
  oauth: {
    domain: process.env.EXPO_PUBLIC_OAUTH_DOMAIN,
    redirectSignIn: isWeb
      ? process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN
      : process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN_MOBILE,
    redirectSignOut: isWeb
      ? process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_OUT
      : process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_OUT_MOBILE,
    responseType: process.env.EXPO_PUBLIC_OAUTH_RESPONSE_TYPE,
  },
};

// Amplify configuration
Amplify.configure({
  ...awsExports,
  ...authConfig,
});

// Amplify.configure({awsExports});

export default function App() {

  // const test = "test";
  // const cipherText = encrypt(test);
  // console.log("cipherText:" + cipherText);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Authenticator.Provider>
            {/* <HomeStack /> */}
            {!isWeb && showMask && <MaskOverlay />}
            <AppStack />
          </Authenticator.Provider>
          {/* <AppStack /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
