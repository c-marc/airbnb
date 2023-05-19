import axios from "axios";

const API_URL = "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb";

export const signIn = async (payload) => {
  try {
    const result = await axios.post(`${API_URL}/user/log_in`, payload);
    return result.data;
  } catch (error) {
    console.error(error.response?.data.error);
  }
};

export const signUp = async (payload) => {
  try {
    const result = await axios.post(`${API_URL}/user/sign_up`, payload);
    return result.data;
  } catch (error) {
    console.error(error.response?.data.error);
  }
};

export const getRooms = async () => {
  try {
    const result = await axios.get(`${API_URL}/rooms`);
    return result.data;
  } catch (error) {
    console.error(error.response?.data.error);
  }
};

export const getRoom = async (roomId) => {
  try {
    const result = await axios.get(`${API_URL}/rooms/${roomId}`);
    return result.data;
  } catch (error) {
    console.error(error.response?.data.error);
  }
};

//https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around
export const getRoomsAround = async (query) => {
  try {
    const result = await axios.get(`${API_URL}/rooms/around${query}`);
    return result.data;
  } catch (error) {
    console.error(error.response?.data.error);
  }
};

//https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/:id
export const getUser = async (id, token) => {
  try {
    const result = await axios.get(`${API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    console.log(error.response?.data.error);
  }
};

// edit user
// https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update
// PUT au moins 1 {email, description, usernam}

// edit picture
// https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture
// PUT photo
export const editPicture = async (token, picture) => {
  try {
    const tab = picture.split(".");
    const formData = new FormData();
    formData.append("photo", {
      uri: selectedPicture,
      name: `avatar.${tab[tab.length - 1]}`,
      type: `image/${tab[tab.length - 1]}`,
    });
    const result = await axios.put(`${API_URL}/user/upload_picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (error) {
    console.log(error.response?.data.error);
  }
};
