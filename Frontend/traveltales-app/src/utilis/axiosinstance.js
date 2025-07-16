import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


// Line 1: import axios from "axios";
// This line imports the Axios library.

// import axios: This imports the default export from the "axios" package and assigns it to the variable axios. Axios is a popular JavaScript library for making HTTP requests (e.g., to fetch data from APIs).

// Line 2: import { BASE_URL } from "./constants";
// This line imports a constant variable named BASE_URL.

// import { BASE_URL }: This uses destructuring assignment to import a named export BASE_URL from a local file located at ./constants. This file likely contains configuration constants, including the base URL for API requests.

// Line 4-10: const axiosInstance = axios.create({...});
// This block creates a custom Axios instance.

// const axiosInstance =: Declares a constant variable axiosInstance to hold the custom Axios configuration.

// axios.create({...}): This is an Axios method that allows you to create a new instance of Axios with a custom configuration. This is useful for setting common options like base URLs, timeouts, and headers that will apply to all requests made with this instance.

// baseURL: BASE_URL,: Sets the base URL for all requests made using axiosInstance. This means you can make requests like axiosInstance.get('/users') and it will automatically prepend BASE_URL (e.g., https://api.example.com/users).

// timeout: 10000,: Sets a timeout for requests in milliseconds. If a request takes longer than 10,000ms (10 seconds), it will be aborted.

// headers: { "Content-Type": "application/json", },: Defines default headers for all requests. Here, it sets the Content-Type header to application/json, which is common for APIs that expect and send JSON data.

// Line 12-23: axiosInstance.interceptors.request.use(...)
// This block adds a request interceptor to the axiosInstance.

// axiosInstance.interceptors.request.use(...): Axios interceptors allow you to intercept requests or responses before they are handled by then or catch. Request interceptors are particularly useful for adding common headers (like authorization tokens) or modifying request configurations.

// This method takes two functions as arguments:

// First function (Success Handler): (config) => { ... } This function is called for every successful request. It receives the config object of the request as an argument.

// const accessToken = localStorage.getItem("token");: This line attempts to retrieve an access token from the browser's localStorage. localStorage is a web storage API that allows web applications to store data persistently in the browser. The token is typically stored after a user successfully logs in.

// if (accessToken) { ... }: This checks if an accessToken was successfully retrieved.

// config.headers.Authorization = Bearer ${accessToken};: If an accessToken exists, this line adds or updates the Authorization header in the request configuration. The value is typically prefixed with "Bearer " for Bearer Tokens, which are a common type of access token used in OAuth 2.0. This token is sent to the server to authenticate the user for protected routes.

// return config;: It's crucial to return the modified config object. If you don't return config, the request won't proceed correctly.

// Second function (Error Handler): (error) => { return Promise.reject(error); } This function is called if there's an error during the request setup (e.g., if the interceptor itself throws an error).

// return Promise.reject(error);: This line returns a rejected Promise with the original error. This ensures that the error is propagated down to the .catch() block of the promise chain where the request was made, allowing you to handle it later.

// Line 25: export default axiosInstance;
// This line exports the custom Axios instance as the default export.

// export default axiosInstance;: This makes the configured axiosInstance available for other files to import using import axiosInstance from './axiosInstance'; (assuming this file is named axiosInstance.js). This promotes code reusability and modularity, ensuring all parts of your application use the same Axios configuration for API calls.