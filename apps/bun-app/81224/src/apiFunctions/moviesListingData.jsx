import axios from "axios";

export const MoviesListingData = async () => {
  try {
    const axiosInstance = axios.create({
      baseURL: "http://www.omdbapi.com/",
    });

    const response = await axiosInstance.get(
      // "?i=tt3896198&apikey=ffafe907&s=titanic&page=10"
      `?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY}&s=titanic&page=1`
    );
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Throw the error so the router can handle it
  }
};
