import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../redux/slices/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {}, [count]);
  const ResetButton = () => {
    dispatch(reset());
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Counter</Text>
        <Text style={styles.counterText}>{count}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.decrementButton]}
            onPress={() => dispatch(decrement())}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.incrementButton]}
            onPress={() => dispatch(increment())}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(reset())}
            style={{
              backgroundColor: "#FF6B6B",
              padding: 10,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontFamily: "Poppins-SemiBold" }}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    color: "#333",
    marginBottom: 20,
  },
  counterText: {
    fontSize: 48,
    fontFamily: "Poppins-Regular",
    color: "#6C63FF",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  decrementButton: {
    backgroundColor: "#FF6B6B",
  },
  incrementButton: {
    backgroundColor: "#4ECB71",
  },
  buttonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});
