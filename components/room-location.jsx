import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const RoomLocation = ({ latitude, longitude, title }) => {
  const marker = {
    latitude,
    longitude,
    title,
    description: "Nice !",
  };
  console.log(marker);

  return (
    <MapView
      // La MapView doit obligatoirement avoir des dimensions
      style={{ flex: 1, width: "100%", height: 200 }} // ADD width and height?
      provider={PROVIDER_GOOGLE} // CHANGE PROVIDER?
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
