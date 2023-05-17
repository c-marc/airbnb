import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { signIn } from "../services/api";
import { ActivityIndicator } from "react-native-paper";

import { formStyles } from "../assets/styles";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: "nono@airbnb-api.com",
    password: "pass",
  });
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeOf = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleSignIn = async () => {
    setPending(true);
    setErrorMessage("");
    try {
      const user = await signIn(formData);
      // console.log(user);
      if (user) {
        const userToken = user.token;
        setToken(userToken);
        alert("Welcome back!");
      } else {
        setErrorMessage("Unknown email or password");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setPending(false);
  };

  console.log(formStyles.row);
  return (
    <KeyboardAvoidingView style={formStyles.container}>
      <View>
        <Text>Email: </Text>
        <TextInput
          placeholder="email"
          value={formData.email}
          onChangeText={handleChangeOf("email")}
          style={formStyles.row}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={handleChangeOf("password")}
        />
        <Pressable onPress={handleSignIn} disabled={pending}>
          <Text>Sign In</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
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
