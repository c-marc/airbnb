import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { signIn } from "../services/api";
import { ActivityIndicator } from "react-native-paper";

import { logoStyles, formStyles as styles } from "../styles/styles";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "nono@airbnb-api.com",
    password: "pass",
  });
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeOf = (name) => (text) => {
    setErrorMessage("");
    setFormData({ ...formData, [name]: text });
  };

  const handleSignIn = async () => {
    setPending(true);
    setErrorMessage("");
    try {
      if (!formData.email || !formData.password) {
        throw new Error("All fields are required");
      }

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
          placeholder="password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={handleChangeOf("password")}
        />
        <Pressable onPress={handleSignIn} disabled={pending} style={styles.btn}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
