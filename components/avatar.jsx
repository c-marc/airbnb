import { View, Image } from "react-native";

const Avatar = ({ url, size }) => {
  return (
    <View>
      <Image
        source={{ uri: url }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
};

export default Avatar;
