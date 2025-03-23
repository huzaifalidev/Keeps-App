import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Clipboard,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import React, { useState, useRef } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { useFonts } from "expo-font"; // To load custom fonts

const PasswordGenerator = () => {
  const [length, setLength] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const lastTap = useRef(null);

  // Load fonts
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const radioOptions = [
    {
      id: "1",
      value: "1",
      borderColor: "#6C63FF",
      color: "#6C63FF",
    },
  ];

  function generatePassword() {
    let password = "";
    let charSet = "";
    if (uppercase) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charSet += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charSet += "0123456789";
    if (symbols) charSet += "!@#$%^&*()_+";
    if (!charSet || !length) {
      Dialog.show({
        type: ALERT_TYPE.ERROR,
        title: "Error",
        textBody: "Please select options & set a password length",
        button: "close",
      });
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
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "Password copied to clipboard",
    });
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      copyToClipboard(); // Double-tap detected
    }
    lastTap.current = now;
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.heading}>Password Generator</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password Length</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter length"
              keyboardType="numeric"
              value={length}
              onChangeText={setLength}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          <Text style={styles.sectionTitle}>Include:</Text>

          <View style={styles.optionsContainer}>
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Uppercase Letters</Text>
              <RadioGroup
                radioButtons={radioOptions}
                onPress={() => setUppercase(!uppercase)}
                selectedId={uppercase ? "1" : ""}
                containerStyle={styles.radioContainer}
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Lowercase Letters</Text>
              <RadioGroup
                radioButtons={radioOptions}
                onPress={() => setLowercase(!lowercase)}
                selectedId={lowercase ? "1" : ""}
                containerStyle={styles.radioContainer}
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Numbers</Text>
              <RadioGroup
                radioButtons={radioOptions}
                onPress={() => setNumbers(!numbers)}
                selectedId={numbers ? "1" : ""}
                containerStyle={styles.radioContainer}
              />
            </View>

            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>Special Characters</Text>
              <RadioGroup
                radioButtons={radioOptions}
                onPress={() => setSymbols(!symbols)}
                selectedId={symbols ? "1" : ""}
                containerStyle={styles.radioContainer}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.generateButton}
              onPress={generatePassword}
            >
              <Text style={styles.buttonText}>Generate Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={reset} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {password ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Your Password:</Text>
              <TouchableOpacity
                onPress={handleDoubleTap}
                activeOpacity={0.8}
                style={styles.passwordDisplay}
              >
                <Text style={styles.passwordText}>{password}</Text>
                <Text style={styles.tapHint}>Double tap to copy</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FF",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heading: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    color: "#333333",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 8,
    color: "#333333",
  },
  input: {
    fontFamily: "Poppins-Regular",
    backgroundColor: "#F5F7FF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginBottom: 16,
    color: "#333333",
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333333",
  },
  radioContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    marginBottom: 24,
  },
  generateButton: {
    backgroundColor: "#6C63FF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6C63FF",
  },
  resetButtonText: {
    fontFamily: "Poppins-SemiBold",
    color: "#6C63FF",
    textAlign: "center",
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: "#F5F7FF",
    borderRadius: 8,
    padding: 16,
  },
  resultLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  passwordDisplay: {
    padding: 8,
  },
  passwordText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
    marginBottom: 4,
  },
  tapHint: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    textAlign: "center",
    color: "#9E9E9E",
  },
});

export default PasswordGenerator;
