import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import HomeStack from './HomeStack';
import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from 'react-native-paper';



const Stack = createStackNavigator();

export default function AppStack() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;

  const isTabletOrWebView = aspectRatio < 1.6; // Assumes 4:3 aspect ratio for tablets

  const theme = useTheme(); // Move useTheme inside the component

  const styles = StyleSheet.create({
    webViewStyles: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: "20%"
    },
    phoneViewStyles: {
      backgroundColor: theme.colors.background
    }
  });


  const handleAuth = async () => {
    try {

        const user = await Auth.currentAuthenticatedUser();
        console.log('User is already authenticated:', user);
        setIsAuthenticated(true);
    } catch {
      console.log('User is not authenticated, redirecting to login');
      await Auth.federatedSignIn();
    }
  };
  useEffect(() => {
    handleAuth();
  }, []);

  if (isAuthenticated === null) {
    return null; // Show loading spinner or splash screen
  }

  return (
    <Stack.Navigator screenOptions={{cardStyle: isTabletOrWebView ? styles.webViewStyles : styles.phoneViewStyles}}>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false,  }}
      />
    </Stack.Navigator>
  );
}

