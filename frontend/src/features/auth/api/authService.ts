import { fetchAPI } from "@/services/api";
import { LoginCredentials, User } from "@/lib/types";
import { AuthResponse } from "../types/auth.types";

export const authService = {
  /**
   * Logs in a user.
   * This function now relies on fetchAPI to handle HTTP errors and
   * adds a validation step to ensure the server's response is valid.
   * @param credentials The user's email and password.
   * @returns A promise that resolves to the user object.
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // We call the fetchAPI utility to handle the network request.
    // No need for a try-catch block here, as fetchAPI will throw on network or HTTP errors.
    const response = await fetchAPI<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // After a successful request, we validate the response from the server.
    // This ensures that we received a valid user object before proceeding.
    if (!response || !response.user || !response.token) {
      throw new Error("Invalid user data received from server.");
    }

    return response;
  },

  // You can add other auth-related functions like register, logout, etc. here.
};
