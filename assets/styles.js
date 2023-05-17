import { StyleSheet } from "react-native";

// constants

export const colors = {
  red: "#F9575C",
  grey: "#717171",
};

// Helper
const valFor = (prop) => (v) => ({ prop: v });

// Utility cheets
export const fs = valFor("fontSize");
export const fw = valFor("fontWeight");

export const color = valFor("color");
export const bg = valFor("backgroundColor");

export const m = valFor("margin");
export const mx = valFor("marginHorizontal");
export const my = valFor("marginVertical");
export const mb = valFor("marginBottom");
//...

export const p = valFor("padding");
export const px = valFor("paddingHorizontal");
export const py = valFor("paddingVertical");
//...

export const h = valFor("height");
export const w = valFor("width");

export const flex = valFor("flex");
export const ai = valFor("alignItems");
export const gap = valFor("gap");
//...

// Combine one or several utliity
// -> Stylesheet with one entry
export const mix = (className, arr) => {
  if (!Array.isArray(arr)) {
    return StyleSheet.create({ [className]: arr });
  }
  return StyleSheet.create({
    [className]: arr.reduce((prev, x) => ({ ...prev, x }), {}),
  });
};

// Combine several classes in a stylesheet
// General Stylesheets
export const magimix = (arr) => {
  return StyleSheet.create(arr.reduce((prev, x) => ({ ...prev, ...x })));
};

// Exemples

// On peut théoriquement tout utiliser directement
// en inline mais attention obligé d'importer plein de mini-fonctions, donc plutôt dans un fichier de composant pour pas créer de collisions)
// ou exporter un tableau de style
const inlineH1 = [fs(20), fw("bold")];
// il faudra utiliser <Machin style={h1} />

// Ou les utiliser juste en raccourci avec la syntaxe RN
const myStyles = StyleSheet.create({
  hello: {
    ...fs(10),
    ...h(100),
    ...ai("flex-end"),
  },
});

// Ou les combiner:
// il faudra utiliser style={globalStyles.global}
const global = mix("global", bg("lightgrey"));
const h2 = mix([fs(10), color(colors.grey)]);
// Si on n'a pas la fonction sous le coude, no problemo
const h3 = mix([fs(10), valFor("textAlign", "center")]);
export const globalStyles = magimix([global, mix("h1", inlineH1), h2, h3]);

// Un autre exemple
//
const card = mix("card", [
  bg("beige"),
  color(colors.grey),
  p(5),
  my(10),
  // si on a besoin d'une nouvelle prop non codée
  valFor("flexDirection")("row"),
]);

const header = mix("header", [color("#61dafb"), fs(30), mb(36)]);
const img = mix("img", [h(100), w(50)]);

const movieStyles = magimix([card, header, img]);
// style={movieStyles.card}

// Tester sur airbnb
export const formStyles2 = magimix([
  mix("container", [flex(1), p(24)]),
  mix("row", [
    py(4),
    valFor("borderBottomColor")(colors.red),
    valFor("borderBottomWidth")(StyleSheet.hairlineWidth),
  ]),
  mix("box", [
    p(4),
    valFor("borderColor")(colors.red),
    valFor("borderWidth")(StyleSheet.hairlineWidth),
  ]),
]);

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  row: {
    padding: 4,
    borderBottomColor: "red",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
