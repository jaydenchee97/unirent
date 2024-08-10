import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeStack from "./HomeStack";
import { Authenticator } from "@aws-amplify/ui-react-native";
import Account from "../screens/Account";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Account"
        options={{ headerShown: false }}
        component={(props) => (
          <Authenticator.Provider>
            <Account {...props} />
          </Authenticator.Provider>
        )}
      />
      <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
