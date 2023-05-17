import {
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { signUp } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native-web";

import { formStyles } from "../assets/styles";

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
      console.log(user);
      const userToken = user.token;
      setToken(userToken);
      alert("Welcome back!");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setPending(false);
  };

  return (
    <KeyboardAvoidingView>
      <View style={formStyles.container}>
        <Text>Email: </Text>
        <TextInput
          placeholder="email"
          value={formData.email}
          onChange={handleChangeOf("email")}
        />
        <Text>Name: </Text>
        <TextInput
          placeholder="username"
          value={formData.username}
          onChange={handleChangeOf("username")}
        />
        <Text>Description: </Text>
        <TextInput
          placeholder="description"
          value={formData.description}
          onChange={handleChangeOf("description")}
          multiline={true}
          textAlignVertical="top"
        />

        <Text>Password: </Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={formData.password}
          onChange={handleChangeOf("password")}
        />

        <Text>Confirm password: </Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={formData.password2}
          onChange={handleChangeOf("passwordCheck")}
        />

        <Pressable onPress={handleSignUp} disabled={pending}>
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
      </View>
    </KeyboardAvoidingView>
  );
}
