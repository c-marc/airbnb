import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { getRoom } from "../services/api";
import { ActivityIndicator } from "react-native-paper";
import Room from "../components/room";

export default function RoomScreen() {
  const route = useRoute();

  const { roomId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRoom(roomId);
      if (!ignore) {
        setRoom(result);
        setIsLoading(false);
      }
    };
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, [roomId]);

  return (
    <View>
      <Text>Room Screen</Text>

      {isLoading ? <ActivityIndicator /> : <Room room={room} />}
    </View>
  );
}
