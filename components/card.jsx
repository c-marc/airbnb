import { View, Text, StyleSheet } from "react-native";
import PricedPhoto from "./priced-photo";
import Avatar from "./avatar";
import Rating from "./rating";

const Card = ({ room }) => {
  const { price, title, ratingValue, reviews } = room;
  const urlPhoto = room.photos[0].url;
  const urlAvatar = room.user.account.photo.url;

  return (
    <View style={styles.container}>
      <PricedPhoto url={urlPhoto} price={price} />
      <View style={styles.containerInfo}>
        <View style={styles.colLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Rating value={ratingValue} reviews={reviews} />
        </View>
        <Avatar url={urlAvatar} size={100} />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  containerInfo: {
    flexDirection: "row",
    gap: 5,
  },
  colLeft: { flex: 1, justifyContent: "space-around" },
  title: {
    fontSize: 20,
  },
});
