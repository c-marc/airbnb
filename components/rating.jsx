import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

const Rating = ({ value, reviews }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const star =
      value >= i ? (
        <FontAwesome name="star" size={24} color="gold" key={i} />
      ) : (
        <FontAwesome name="star" size={24} color="grey" key={i} />
      );
    stars.push(star);
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      <Text style={styles.reviews}>{reviews} reviews</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 10 },
  stars: { flexDirection: "row", gap: 5 },
  reviews: { color: "grey" },
});
