import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TaskGallery = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("SignIn");
        console.log("No token found");
        return;
      }
      const response = await axios.get(
        "http://192.168.100.33:8082/keeps/allTask",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  };
  useEffect(() => {
    fetchData();
  }, [tasks]);
  return (
    <View style={styles.container}>
      <Text style={styles.Heading_1}>Tasks</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}
      >
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.taskId || "Id not found"}
            onPress={() =>
              navigation.navigate("SingleTask", {
                taskId: task.taskId,
              })
            }
          >
            <View style={styles.taskContainer}>
              <Text
                numberOfLines={2}
                style={{ fontSize: 18, fontFamily: "Poppins-SemiBold" }}
              >
                {task.title}
              </Text>
              <Text
                numberOfLines={4}
                style={{
                  overflow: "hidden",
                  fontSize: 15,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {task.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateTask")}
        style={{
          position: "absolute",
          bottom: 50,
          right: 30,
          width: 60,
          height: 60,
          backgroundColor: "white",
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontFamily: "Poppins-Regular",
            textAlign: "center",
          }}
        >
          +
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskGallery;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FF9F1C",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#FF9F1C",
  },
  Heading_1: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
});
