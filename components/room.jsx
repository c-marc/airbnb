import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import Card from "./card";
import { View, ScrollView } from "react-native";
import PricedPhoto from "./priced-photo";
import Details from "./details";
import RoomLocation from "./room-location";

const Room = ({ room }) => {
  const [show, setShow] = useState(false);

  // Coords arer in that order
  const [longitude, latitude] = room.location;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <PricedPhoto room={room} />
      <View style={styles.details}>
        <Details room={room} />
        <Text numberOfLines={!show ? 3 : null}>{room.description}</Text>
        <Pressable onPress={() => setShow(!show)}>
          {show ? (
            <View style={styles.btn}>
              <Text style={styles.btnTxt}>Show less</Text>
              <FontAwesome name="caret-up" size={24} color="grey" />
            </View>
          ) : (
            <View style={styles.btn}>
              <Text style={styles.btnTxt}>Show more</Text>
              <FontAwesome name="caret-down" size={24} color="grey" />
            </View>
          )}
        </Pressable>
      </View>

      <RoomLocation
        latitude={latitude}
        longitude={longitude}
        title={room.title}
      />
    </ScrollView>
  );
};

export default Room;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 5,
  },
  details: {
    paddingHorizontal: 10,
  },
  btn: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btnTxt: {
    color: "grey",
  },
});
