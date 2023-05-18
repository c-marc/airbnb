import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet } from "react-native";

const RoomLocation = ({ latitude, longitude, title }) => {
  const marker = {
    latitude,
    longitude,
    title,
    description: "Nice !",
  };
  // console.log(marker);

  return (
    <MapView
      // La MapView doit obligatoirement avoir des dimensions
      style={styles.map}
      provider={PROVIDER_GOOGLE} // Change default Provider
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      // showsUserLocation={true}
    >
      <Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={marker.title}
        description={marker.description}
      />
    </MapView>
  );
};

export default RoomLocation;

const styles = StyleSheet.create({
  map: { width: "100%", height: 200 },
});
