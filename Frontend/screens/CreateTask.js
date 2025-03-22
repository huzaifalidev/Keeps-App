import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTitle, setDescription } from "../redux/slices/taskSlice";
import CustomModal from "./Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const CreateTask = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const title = useSelector((state) => state.task.title);
  const description = useSelector((state) => state.task.description);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      console.log("Token", token);
      const response = await axios.post(
        "http://192.168.100.33:8082/keeps/task",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setDescription(""));
      dispatch(setTitle(""));
      setModalMessage(response.data.message);
      setModalVisible(true);
      navigation.navigate("TaskGallery");
    } catch (error) {
      setModalMessage(error.response?.data?.message || "Error sending data");
      setModalVisible(true);
    }
  };

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Text style={styles.Heading_1}>Create Task</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            value={title}
            onChangeText={(text) => dispatch(setTitle(text))}
            multiline
            placeholder="Title"
            style={styles.inputField_1}
          />
          <TextInput
            value={description}
            onChangeText={(text) => dispatch(setDescription(text))}
            multiline
            placeholder="Note"
            style={styles.inputField_2}
          />
        </ScrollView>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <CustomModal
          visible={modalVisible}
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  Container: {
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
    margin: 20,
  },
  inputField_1: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
  },
  inputField_2: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#011627",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "white",
    fontSize: 18,
  },
});
