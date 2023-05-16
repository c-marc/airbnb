import {
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { signUp } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "nonox@airbnb-api.com",
    username: "nono",
    description: "whatever",
    password: "pass",
  });
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeOf = (name) => (text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleSignUp = async () => {
    setPending(false);
    setErrorMessage("");
    try {
      const user = await signUp(formData);
      console.log(user);
      const userToken = user.token;
      setToken(userToken);
      navigation.navigate("Tab");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
    setPending(false);
  };

  return (
    <View>
      <View>
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
        />

        <Text>Password: </Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={formData.password}
        />

        <Button title="Sign up" onPress={handleSignUp} disabled={pending} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Already an account ? Sign In</Text>
        </TouchableOpacity>

        {pending ? (
          <ActivityIndicator />
        ) : errorMessage ? (
          <Text>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
}
