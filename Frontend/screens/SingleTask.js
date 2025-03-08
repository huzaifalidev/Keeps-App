import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "./Modal";
const SingleTask = () => {
  const route = useRoute();
  const { taskId } = route.params;
  const navigation = useNavigation();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.100.33:8082/keeps/searchTask/${taskId}`
      );
      setModalMessage(response.data.message);
      setTask(response.data.task);
      setTitle(response.data.task.title);
      setDescription(response.data.task.description);
      setModalVisible(true);
    } catch (error) {
      setModalMessage("Error fetching task:", error.message);
      setModalVisible(true);
    }
  };

  const updateTask = async () => {
    try {
      const response = await axios.put(
        `http://192.168.100.33:8082/keeps/taskUpdate/${taskId}`,
        {
          title: title,
          description: description,
        }
      );
      setModalMessage(response.data.message);
      setModalVisible(true);
    } catch (error) {
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.100.33:8082/keeps/deleteTask/${taskId}`
      );
      navigation.navigate("TaskGallery");
      setModalMessage(response.data.message);
      setModalVisible(true);
    } catch (error) {
      setModalMessage(error.message);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.innerContainer}>
        <Text style={styles.Heading_1}>Task</Text>

        {task && (
          <View style={styles.task}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              multiline
              placeholder="Title"
              style={styles.inputField_1}
            />
            <TextInput
              value={description}
              onChangeText={setDescription}
              multiline
              placeholder="Note"
              style={styles.inputField_2}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={updateTask} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTask} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SingleTask;

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
    width: "50%",
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
  buttonDelete: {
    width: "50%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#011627",
    justifyContent: "center",
  },
});
