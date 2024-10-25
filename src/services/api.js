import axios from "axios";

// Define the API endpoint

const API_BASE_URL = "https://dev.finchive.com:8800/api/user/";

const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aW13MDUxMjAxQGdtYWlsLmNvbSIsIlJPTEVfVVNFUiI6IltOT1JNQUxdIiwiaWF0IjoxNzI5NDg0NzAyLCJleHAiOjE3MzAwODk1MDJ9.AeREjfMtxPa1COMGa1bjT318CjfIhTa85Tw0LEdo5YmKsNLPwOvsP253zlJQ7-P98aFeSql_4dOAqTucuvzEWA";
// Fetch the data from the API endpoint

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const fetchData = async (currentPage, pageSize) => {
  try {
    const res = await instance.get("recents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        currentPage: 1,
        pageSize: 5,
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
