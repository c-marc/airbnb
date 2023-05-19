import { useState, useEffect } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { editPicture, getUser } from "../services/api";
import { ActivityIndicator } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({ user, storeUser }) {
  const [fullUser, setFullUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const getPermissionAndGetPicture = async () => {
    //Demander le droit d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //Ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser(user.id, user.token);
        if (!ignore) {
          setFullUser(data);
          setSelectedPicture(data?.photo.url);
          console.log("Fetched user", data);
        }
      } catch (error) {
        console.error(message.error);
      }
      setIsLoading(false);
    };
    // Go
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, []);

  const handleUpdate = async () => {
    try {
      const result = await editPicture(user.token, selectedPicture);
      console.log("editPicture", result);
      // Force revalidation
      storeUser({ ...user });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>user id : {fullUser.description}</Text>
          <Pressable onPress={() => getPermissionAndGetPicture()}>
            <Text>Select photo</Text>
          </Pressable>
          {selectedPicture && (
            <Image
              source={{ uri: selectedPicture }}
              style={{ height: 200, width: 200 }}
            />
          )}
          <Pressable onPress={handleUpdate}>
            <Text>Updata user</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
