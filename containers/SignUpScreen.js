import {
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { signUp } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";

import { logoStyles, formStyles as styles } from "../styles/styles";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "nonox@airbnb-api.com",
    username: "nono",
    description: "whatever",
    password: "pass",
    passwordCheck: "pass",
  });

  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeOf = (name) => (text) => {
    setErrorMessage("");
    setFormData({ ...formData, [name]: text });
  };

  const handleSignUp = async () => {
    setPending(true);
    setErrorMessage("");
    try {
      if (
        !formData.email ||
        !formData.username ||
        !formData.password ||
        !formData.passwordCheck
      ) {
        throw new Error("All fields are required");
      }
      if (formData.password !== formData.passwordCheck) {
        throw new Error("The two passwords differ");
      }

      const user = await signUp(formData);
      // console.log(user);
      if (!user) {
        throw new Error("Subscription failed");
      }
      const userToken = user.token;
      setToken(userToken);
      alert("Welcome !");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
    setPending(false);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Image source={require("../assets/logo.png")} style={logoStyles.logo} />

        <Text style={logoStyles.title}>Sign up</Text>

        <TextInput
          style={styles.input}
          placeholder="email"
          value={formData.email}
          onChangeText={handleChangeOf("email")}
        />

        <TextInput
          style={styles.input}
          placeholder="username"
          value={formData.username}
          onChangeText={handleChangeOf("username")}
        />

        <TextInput
          style={styles.textarea}
          placeholder="description"
          value={formData.description}
          onChangeText={handleChangeOf("description")}
          multiline={true}
          textAlignVertical="top"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={handleChangeOf("password")}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={formData.passwordCheck}
          onChangeText={handleChangeOf("passwordCheck")}
        />

        <Pressable onPress={handleSignUp} disabled={pending} style={styles.btn}>
          <Text>Sign Up</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Already have an account? Sign In</Text>
        </Pressable>

        {pending ? (
          <ActivityIndicator />
        ) : errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
