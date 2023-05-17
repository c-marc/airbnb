import { View, Image, Text } from "react-native";
import { StyleSheet } from "react-native";

const PricedPhoto = ({ room }) => {
  const url = room.photos[0].url;
  const { price } = room;

  return (
    <View style="container">
      <Image source={{ uri: url }} style={styles.img} />
      <Text style={styles.price}>{`${price} €`}</Text>
    </View>
  );
};

export default PricedPhoto;

const styles = StyleSheet.create({
  container: { position: "relative" },
  img: { width: "100%", height: 200 },
  price: {
    position: "absolute",
    left: 0,
    bottom: 30,
    backgroundColor: "black",
    color: "white",
    padding: 10,
  },
});
