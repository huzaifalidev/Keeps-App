import { StyleSheet, Text, View, TouchableOpacity, Clipboard,TextInput ,Alert} from "react-native";
import React, { useState,useRef } from "react";
import RadioGroup from "react-native-radio-buttons-group";

const PasswordGenerator = () => {
  const [length, setLength] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const lastTap = useRef(null);
  const radioOptions = [{ id: "1", value: "1" }];

  function generatePassword() {
    let password = "";
    let charSet = "";
    if (uppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charSet += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charSet += "0123456789";
    if (symbols) charSet += "!@#$%^&*()_+";
    if (!charSet || !length) {
      alert("Select options & length");
      return;
    }
    for (let i = 0; i < Number(length); i++) {
      let randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
    setPassword(password);
  }
  function reset() {
    setLength("");
    setUppercase(false);
    setLowercase(false);
    setNumbers(false);
    setSymbols(false);
    setPassword("");
  }
  const copyToClipboard = () => {
    Clipboard.setString(password);
    Alert.alert("Copied!", "Password copied to clipboard.");
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      copyToClipboard();  // Double-tap detected
    }
    lastTap.current = now;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password Generator</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Length:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter length"
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Uppercase:</Text>
        <RadioGroup
          radioButtons={radioOptions}
          onPress={() => setUppercase(!uppercase)}
          selectedId={uppercase ? "1" : ""}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Lowercase:</Text>
        <RadioGroup
          radioButtons={radioOptions}
          onPress={() => setLowercase(!lowercase)}
          selectedId={lowercase ? "1" : ""}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Numbers:</Text>
        <RadioGroup
          radioButtons={radioOptions}
          onPress={() => setNumbers(!numbers)}
          selectedId={numbers ? "1" : ""}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Symbols:</Text>
        <RadioGroup
          radioButtons={radioOptions}
          onPress={() => setSymbols(!symbols)}
          selectedId={symbols ? "1" : ""}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={reset} style={styles.button}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.password}>Password:</Text>
      <TouchableOpacity onPress={handleDoubleTap} activeOpacity={0.8}>
        <Text style={styles.password}>{password}</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  label: { fontSize: 16, marginTop: 10 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10,justifyContent:"space-between" },
  input: { backgroundColor:"lightgrey"},
  button: { backgroundColor: "#007BFF", padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
  password: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 10 ,},
});

export default PasswordGenerator;
