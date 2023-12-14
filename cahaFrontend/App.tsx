/**
 * @author Luo Wang
 * Main Page
 */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

import { StyleSheet } from "react-native";

import appRouter from "./pages";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"MapScreen"}>
            {appRouter &&
              appRouter.map((item) => {
                return (
                  <Stack.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                    options={{ headerShown: item.headerShown }}
                    initialParams={item?.initialParams}
                  />
                );
              })}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
