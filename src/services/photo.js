import axios from "axios";

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/photos";

export const fetchPhotos = async (page) => {
  try {
    const response = await axios.get(API_ENDPOINT);

    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error.message);
    return [];
  }
};
