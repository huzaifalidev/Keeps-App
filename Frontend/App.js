import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useLinkBuilder,
  useTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Text as NavigationText,
  PlatformPressable,
} from "@react-navigation/elements";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

// Import screens
import CreateTask from "./screens/CreateTask";
import TaskGallery from "./screens/TaskGallery";
import SingleTask from "./screens/SingleTask";
import Counter from "./screens/Counter";
import Modal from "./screens/Modal";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import PasswordGenerator from "./screens/PasswordGenerator";
import Home from "./screens/Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Initialize notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

// Custom Tab Bar Component
function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingBottom: 5,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const getIconName = () => {
          switch (route.name) {
            case "Home":
              return "home";
            case "TaskGallery":
              return "list";
            case "CreateTask":
              return "add-circle";
            case "Counter":
              return "timer";
            case "PasswordGenerator":
              return "key";
            default:
              return "apps";
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PlatformPressable
            key={index}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 8,
            }}
          >
            <Ionicons
              name={getIconName()}
              size={24}
              color={isFocused ? "#6C63FF" : "#666"}
            />
            <Text
              style={{
                color: isFocused ? "#6C63FF" : "#666",
                fontSize: 12,
                marginTop: 4,
                fontWeight: isFocused ? "600" : "400",
              }}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

// Tab Navigator with Custom Tab Bar
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: "absolute" },
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="TaskGallery"
        component={TaskGallery}
        options={{ tabBarLabel: "Tasks" }}
      />
      <Tab.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ tabBarLabel: "Add" }}
      />
      <Tab.Screen name="Counter" component={Counter} />
      <Tab.Screen
        name="PasswordGenerator"
        component={PasswordGenerator}
        options={{ tabBarLabel: "Password" }}
      />
    </Tab.Navigator>
  );
}

// Main App
export default function App() {
  useEffect(() => {
    // Setup notification listeners
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Received foreground notification:", notification);
      });

    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Received background notification:", response);
      });

    // Request permissions and setup
    const setupPushNotifications = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") return;

      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: "718c3d24-ad16-4101-ac2e-bc153f3bc91e",
        });

        // Send token to backend
        await fetch("http://192.168.100.33:8082/api/users/push-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pushToken: token.data,
            userId: "USER_ID",
          }),
        });
        console.log("Push token -----------------------:", token.data);
      } catch (err) {
        console.log("Error getting push token:", err);
      }
    };

    setupPushNotifications();

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SignIn"
        >
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Modal" component={Modal} />
          <Stack.Screen name="MainTabs" component={HomeTabs} />
          <Stack.Screen name="SingleTask" component={SingleTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
