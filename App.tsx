import { Authenticator } from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth } from "aws-amplify";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import awsExports from "./src/aws-exports";
import HomeStack from "./src/navigation/HomeStack";
import { useEffect, useState } from "react";
import AppStack from "./src/navigation/AppStack";


// Amplify configuration
Amplify.configure({
  ...awsExports,
  Auth: {
    region: process.env.EXPO_PUBLIC_AMPLIFY_REGION, 
    userPoolId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.EXPO_PUBLIC_COGNITO_USER_POOL_WEBCLIENT_ID,
    authenticationFlowType: process.env.EXPO_PUBLIC_AUTHENTICATION_FLOW_TYPE,
    oauth: {
      domain: process.env.EXPO_PUBLIC_OAUTH_DOMAIN, 
      redirectSignIn: process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN, 
      redirectSignOut: process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_OUT, 
      responseType: process.env.EXPO_PUBLIC_OAUTH_RESPONSE_TYPE 
    }
  },
  
});
export default function App() {

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
