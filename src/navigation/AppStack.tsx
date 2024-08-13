import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import HomeStack from './HomeStack';


const Stack = createStackNavigator();

export default function AppStack() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
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
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
