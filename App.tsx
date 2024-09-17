// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth } from "aws-amplify";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import awsExports from "./src/aws-exports";
import LoginScreen from "./src/screens/LoginScreen";
import HomeStack from "./src/navigation/HomeStack";
import { Platform } from "react-native";

// Amplify configuration
Amplify.configure({
  ...awsExports,
  oauth: {
    domain: process.env.EXPO_PUBLIC_OAUTH_DOMAIN,
    redirectSignIn:
      Platform.OS === "web"
        ? process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN
        : process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_IN_MOBILE,
    redirectSignOut:
      Platform.OS === "web"
        ? process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_OUT
        : process.env.EXPO_PUBLIC_OAUTH_REDIRECT_SIGN_OUT_MOBILE,
    responseType: process.env.EXPO_PUBLIC_OAUTH_RESPONSE_TYPE,
  },
  region: process.env.EXPO_PUBLIC_REGION,
  userPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID,
  userPoolWebClientId: process.env.EXPO_PUBLIC_USER_POOL_WEB_CLIENT_ID,
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuthStatus = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setIsAuthenticated(true);
          // console.log("User is authenticated, signing out...");
          // await Auth.signOut({ global: true }); // Sign out for development purposes
          // setIsAuthenticated(false); // Ensure UI updates
        }
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? (
            <HomeStack /> // If authenticated, show the main app
          ) : (
            <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
