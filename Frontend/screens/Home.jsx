import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";

const Home = () => {
  useEffect(() => {
    // Handle notifications when app is in foreground
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Received notification:", notification);
      });

    // Handle notifications when app is in background
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Background notification:", response);
      });
    9;

    // Set notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  const testNotification = async () => {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "718c3d24-ad16-4101-ac2e-bc153f3bc91e",
      });

      // Test local notification first
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Test Local Notification",
          body: "This is a test notification",
        },
        trigger: null, // null means send immediately
      });

      // Then test remote notification
      const response = await fetch(
        "http://192.168.100.33:8082/test-notification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token.data,
          }),
        }
      );

      console.log("Test notification sent");
    } catch (error) {
      console.error("Error sending test notification:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={testNotification}>
        <Text style={styles.buttonText}>Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
