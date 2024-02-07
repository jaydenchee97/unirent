import { Authenticator } from "@aws-amplify/ui-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Amplify } from "aws-amplify";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import awsExports from "./src/aws-exports";
import HomeStack from "./src/navigation/HomeStack";

Amplify.configure(awsExports);

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Authenticator.Provider>
            <Authenticator>
              <HomeStack />
            </Authenticator>
          </Authenticator.Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
