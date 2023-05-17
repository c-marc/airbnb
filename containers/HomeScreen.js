import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, StyleSheet, Text, View } from "react-native";
import { getRooms } from "../services/api";
import { ActivityIndicator } from "react-native";
import Cards from "../components/cards";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRooms();
      if (!ignore) {
        setRooms(result);
        setIsLoading(false);
      }
    };
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
      ) : (
        <View>
          <Text>{rooms.length} results</Text>
          <Cards rooms={rooms} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
