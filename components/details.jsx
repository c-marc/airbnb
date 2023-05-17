import { View, Text, StyleSheet } from "react-native";
import Avatar from "./avatar";
import Rating from "./rating";

const Details = ({ room }) => {
  const { title, ratingValue, reviews } = room;
  const urlAvatar = room.user.account.photo.url;

  return (
    <View style={styles.container}>
      <View style={styles.colLeft}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Rating value={ratingValue} reviews={reviews} />
      </View>
      <Avatar url={urlAvatar} size={100} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  colLeft: { flex: 1, justifyContent: "space-around" },
  title: {
    fontSize: 20,
  },
});
