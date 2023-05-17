import { View, Text, StyleSheet } from "react-native";
import PricedPhoto from "./priced-photo";
import Avatar from "./avatar";
import Rating from "./rating";
import Details from "./details";

const Card = ({ room }) => {
  const { price, title, ratingValue, reviews } = room;
  const urlAvatar = room.user.account.photo.url;

  return (
    <View style={styles.container}>
      <PricedPhoto room={room} />
      <Details room={room} />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
});
