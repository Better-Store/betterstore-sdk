import axios from "axios";

const API_BASE_URL = "https://api.betterstore.io/api/v1";

// Define consistent error interface
interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
}

export const createApiClient = (apiKey: string) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response.data,
    (error): never => {
      const apiError: ApiError = {
        status: 500,
        message: "An unexpected error occurred",
      };

      if (error.response) {
        apiError.status = error.response.status;
        apiError.message = error.response.data.error || "Server error occurred";
        apiError.code = error.response.data.code;
        apiError.details = error.response.data;
      } else if (error.request) {
        apiError.status = 503;
        apiError.message = "Service unavailable - no response from server";
        apiError.code = "SERVICE_UNAVAILABLE";
      } else {
        apiError.status = 500;
        apiError.message = "Request configuration error";
        apiError.code = "REQUEST_SETUP_ERROR";
      }

      throw apiError;
    }
  );

  return client;
};
