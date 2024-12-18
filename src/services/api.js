import axios from "axios";
const url = "http://www.omdbapi.com/";
const apiKey = "8db4a6db";

export const api = async (searchQry) => {
  try {
    const response = axios.get(
      `${url}?apikey=${apiKey}&s=${searchQry || "top"}`
    );
    console.log("response", response);
    const res = await response;
    console.log("response", res);
    console.log("Full Response:", res.data.Search);
    return res.data.Search;
  } catch (error) {
    console.log("api errors:", error.message);
    return [];
  }
};
// api();

// {
//   params: {
//     apikey: apiKey,
//     s: "top",
//     plot: "full",
//   },
// }
