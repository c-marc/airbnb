import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RoomsAround({ coords, rooms }) {
  const navigation = useNavigation();

  return (
    <MapView
      // La MapView doit obligatoirement avoir des dimensions
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {rooms.map((room) => {
        const [longitude, latitude] = room.location;
        return (
          <Marker
            key={room._id}
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={room.title}
            description={room.description}
            onPress={() => navigation.navigate("Room", { roomId: room._id })}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { height: "100%", width: "100%" },
});
