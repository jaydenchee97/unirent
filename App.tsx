// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { Amplify, Auth, Hub } from "aws-amplify";
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
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    // Listen for authentication events and check status
    const authListener = Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        checkAuthStatus();
      }
    });

    // Check auth status on mount
    checkAuthStatus();

    // Cleanup the Hub listener on unmount
    return () => authListener();
  }, []);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          {isAuthenticated ? (
            <HomeStack /> // If authenticated, show the main app
          ) : (
            <LoginScreen />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
