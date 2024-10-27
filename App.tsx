import { Authenticator } from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth } from "aws-amplify";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import awsExports from "./src/aws-exports";
import HomeStack from "./src/navigation/HomeStack";
import { useEffect, useState } from "react";
import AppStack from "./src/navigation/AppStack";
import { encrypt } from "./src/utils/SecurityUtils";

// auth configuration
const authConfig =  {
  oauth: {
    domain: process.env.EXPO_PUBLIC_OAUTH_DOMAIN, 
    redirectSignIn: process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN, 
    redirectSignOut: process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_OUT, 
    responseType: process.env.EXPO_PUBLIC_OAUTH_RESPONSE_TYPE,
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ]
  }
};

// Amplify configuration
Amplify.configure({
  ...awsExports,
  ...authConfig
  
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
                <AppStack />
          </Authenticator.Provider>
          {/* <AppStack /> */}

        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
