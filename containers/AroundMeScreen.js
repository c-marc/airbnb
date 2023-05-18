import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { View, StyleSheet, Text } from "react-native";
import { getRoomsAround } from "../services/api";
import RoomsAround from "../components/rooms-around";
import Constants from "expo-constants";
import Logo from "../components/logo";

const AroundMeScreen = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [coords, setCoords] = useState(null);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        // console.log("location =>", location); // console.log permettant de visualiser l'objet obtenu
        const phoneCoords = location.coords;
        console.log("Location is", phoneCoords);
        // setCoords(obj);
        const fake = { longitude: 2.32, latitude: 48.85 };
        setCoords(fake);
      } else {
        setErrorMessage("Something went wrong with Geolocation");
      }
    };
    // Go
    askPermission();
  }, []);

  useEffect(() => {
    const fetchData = async (coords) => {
      try {
        const result = await getRoomsAround(coords);
        if (!ignore) {
          setRooms(result);
        }
      } catch (error) {
        console.error(error.message);
        setErrorMessage("Something went wrong with the API");
      }
      setIsLoading(false);
    };

    // Go
    let ignore = false;
    if (coords) {
      console.log("Fetching rooms around", coords);
      fetchData(coords);
    }
    return () => (ignore = true);
  }, [coords]);

  return (
    <View style={styles.container}>
      <Logo headerHeight={50} logoHeight={30} />

      {isLoading ? (
        <Text>Chargement...</Text>
      ) : errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <>
          <RoomsAround coords={coords} rooms={rooms} />
        </>
      )}
    </View>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});
