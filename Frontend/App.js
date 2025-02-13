import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateTask from "./screens/CreateTask";
import TaskGallery from "./screens/TaskGallery";
import SingleTask from "./screens/SingleTask";
import Counter from "./screens/Counter";
import Modal from "./screens/Modal";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SignUp"
        >
          <Stack.Screen name="CreateTask" component={CreateTask} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Modal" component={Modal} />
          <Stack.Screen name="TaskGallery" component={TaskGallery} />
          <Stack.Screen name="SingleTask" component={SingleTask} />
          <Stack.Screen name="Counter" component={Counter} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
