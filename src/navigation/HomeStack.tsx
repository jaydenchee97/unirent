import { createStackNavigator } from "@react-navigation/stack";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react";

import HomeTab from "./HomeTab";
import { createUser } from "../graphql/mutations";
import { getUser } from "../graphql/queries";
import UserTypeSelectionScreen from "../screens/UserTypeSelectionScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function HomeStack() {

  const navigation = useNavigation();

  const syncUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });

    console.log("authUser");
    console.log(authUser);

    const userData = await API.graphql(
      graphqlOperation(getUser, { id: authUser.attributes.sub }),
    );
    console.log(userData);

    if (userData.data.getUser) {
      console.log("User already exists");
      if (userData.data.getUser.userType === null) {
        console.log(userData.data.getUser);
        navigation.navigate("UserTypeSelectionScreen", {user: userData.data.getUser});
      }
      
      return;
    }

    
    console.log("Creating new User");
    const newUser = {
      id: authUser.attributes.sub,
      name: authUser.username,
    };
    const insertedUser = await API.graphql(graphqlOperation(createUser, { input: newUser }));
    console.log(insertedUser);
    navigation.navigate("UserTypeSelectionScreen", {user: userData.data.getUser});
  };

  useEffect(() => {
    syncUser();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="UserTypeSelectionScreen"
        component={UserTypeSelectionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
