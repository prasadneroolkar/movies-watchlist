import axios from "axios";
const url = "http://www.omdbapi.com/";
const apiKey = "8db4a6db";

export const api = async () => {
  try {
    const response = axios.get(url, {
      params: {
        apikey: apiKey,
        s: "top",
      },
    });
    const res = await response;
    console.log("Full Response:", res.data.Search);
    return res.data.Search;
  } catch (error) {
    console.log("api errors:", error.message);
    return [];
  }
};
// api();
