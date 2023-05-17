import { FlatList, Pressable, StyleSheet } from "react-native";
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
      //   ItemSeparatorComponent={<Separator />}
      //   ItemSeparatorComponent={Separator}
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
  return <hr />;
};

const styles = StyleSheet.create({
  contentContainer: { gap: 20 },
});
