import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/slices/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {}, [count]);

  return (
    <View>
      <Text style={{ textAlign: "center" }}>Counter: {count}</Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => dispatch(increment())}
      >
        <Text>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => dispatch(decrement())}
      >
        <Text>Decrement</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  Button: { alignItems: "center" },
});
