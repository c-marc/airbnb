import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const colors = {
  red: "#EA5860",
};

export const formStyles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    alignItems: "center",
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.red,
    width: "80%",
    height: 30,
    marginVertical: 20,
  },
  textarea: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.red,
    height: 100,
    paddingLeft: 10,
    width: "80%",
  },
  btn: {
    borderWidth: 2,
    borderColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export const logoStyles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "grey",
  },
});
