import axios from "axios";

const API_URL = "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb";

export const signIn = async (payload) => {
  try {
    const result = await axios.post(`${API_URL}/user/log_in`, payload);
    return result.data;
  } catch (error) {
    console.error(error.message);
    console.error(error.response?.data.message);
  }
};

export const signUp = async (payload) => {
  try {
    const result = await axios.post(`${API_URL}/user/sign_up`, payload);
    return result.data;
  } catch (error) {
    console.error(error.message);
    console.error(error.response?.data.message);
  }
};

export const getRooms = async () => {
  try {
    const result = await axios.get(`${API_URL}/rooms`);
    return result.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getRoom = async (roomId) => {
  try {
    const result = await axios.get(`${API_URL}/rooms/${roomId}`);
    return result.data;
  } catch (error) {
    console.error(error.message);
  }
};
