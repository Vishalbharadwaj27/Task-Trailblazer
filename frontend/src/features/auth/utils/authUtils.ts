import { User } from "@/types/auth";

export const persistUser = (userData: { user: User; token: string }) => {
  localStorage.setItem("user", JSON.stringify(userData.user));
  return userData.user;
};

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    localStorage.removeItem("user");
    return null;
  }
};
