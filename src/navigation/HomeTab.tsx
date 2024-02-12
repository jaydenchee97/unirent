import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import AccountStack from "./AccountStack";
import ChatStack from "./ChatStack";
import ExploreStack from "./ExploreStack";
import Home from "../screens/Home";
import SavedScreen from "../screens/SavedScreen";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      shifting
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: "magnify",
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: "heart-outline",
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={ChatStack}
        options={{
          tabBarIcon: "message-text-outline",
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: "account-outline",
        }}
      />
    </Tab.Navigator>
  );
}
