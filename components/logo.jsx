import { View, StyleSheet, Image } from "react-native";

const Logo = ({ headerHeight, logoHeight }) => {
  return (
    <View style={[styles.container, { height: headerHeight }]}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: logoHeight, height: logoHeight, resizeMode: "contain" }}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
