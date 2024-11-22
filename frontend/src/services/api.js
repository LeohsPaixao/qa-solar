import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3001/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post('http://localhost:3001/login', loginData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
