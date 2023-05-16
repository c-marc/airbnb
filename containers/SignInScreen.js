import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { signIn } from "../services/api";
import { ActivityIndicator } from "react-native-paper";

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
    setPending(false);
    setErrorMessage("");
    try {
      const result = await signIn(formData);
      console.log(result);
      // const userToken = "secret-token";
      // setToken(userToken);
      navigation.navigate("Tab");
    } catch (error) {
      console.log(error);
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
          onChangeText={handleChangeOf("email")}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={handleChangeOf("password")}
        />
        <Button title="Sign in" onPress={handleSignIn} disabled={pending} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
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
