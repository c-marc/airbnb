import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, StyleSheet, Text, View } from "react-native";
import { getRooms } from "../services/api";
import { ActivityIndicator } from "react-native";
import Cards from "../components/cards";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRooms();
        if (!ignore) {
          setRooms(result);
        }
      } catch (error) {
        console.log(error.message);
        setErrorMessage("Something went wrong with the API...");
      }
      setIsLoading(false);
    };
    // Go
    setIsLoading(true);
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : errorMessage ? (
        <View>{errorMessage}</View>
      ) : (
        <Cards rooms={rooms} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
