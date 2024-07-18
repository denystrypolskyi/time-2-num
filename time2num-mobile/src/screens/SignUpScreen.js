import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { signUp } from "../api/api";
import { redirectToLoginPage } from "../utils/helpers";
import { colors, fonts, textSizes } from "../constants/constants";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const success = await signUp(email, username, password, navigation);
      if (success) {
        resetState();
      }
    } catch (error) {
      console.error("Error while signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Create</Text>
        <Text style={[styles.header, { marginBottom: 45 }]}>Account</Text>
        <TextInput
          style={[
            styles.input,
            {
              marginBottom: 15,
            },
          ]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              marginBottom: 15,
            },
          ]}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={[
            styles.input,
            {
              marginBottom: 45,
            },
          ]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={[styles.buttonText, { color: colors.primary }]}>
            Sign up
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLineContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.horizontalLine} />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, { marginBottom: 15 }]}
          onPress={() => redirectToLoginPage(navigation)}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.primary,
  },
  formContainer: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
    marginBottom: 20,
  },
  loginButton: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 14,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 20,
    padding: 14,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    color: "gray",
    fontFamily: fonts.regular,
    marginHorizontal: 10,
    fontSize: textSizes.medium,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default SignUpScreen;
