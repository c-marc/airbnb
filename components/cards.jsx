import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./card";

const Cards = ({ rooms }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={rooms}
      extractKey={(item) => item._id}
      //   ItemSeparatorComponent={() => <hr />}
      ItemSeparatorComponent={Separator}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => navigation.navigate("Room", { roomId: item._id })}
          >
            <Card room={item} />
          </Pressable>
        );
      }}
    />
  );
};

export default Cards;

const Separator = () => {
  return <View style={styles.separator}>{/* <Text>tttttt</Text> */}</View>;
};

const styles = StyleSheet.create({
  //   contentContainer: { gap: 20 },
  separator: {
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: "grey",
  },
});
