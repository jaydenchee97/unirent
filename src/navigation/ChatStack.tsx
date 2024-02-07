import { createStackNavigator } from "@react-navigation/stack";

import ChatScreen from "../screens/ChatScreen";
import InboxScreen from "../screens/InboxScreen";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName="InboxScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#000000" },
      }}
    >
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
