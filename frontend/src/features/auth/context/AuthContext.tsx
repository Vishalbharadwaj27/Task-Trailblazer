import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User, LoginCredentials } from "@/types/auth";
import { authService } from "../api/authService";
import { AuthResponse } from "../types/auth.types";

// Define the shape of the context data.
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

// Create the context.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs once on initial app load to check for a persisted session.
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse stored user", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Handles the user login process.
   * It calls the authService, and on success, updates the state and localStorage.
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      
      // Validate token presence
      if (!response.token) {
        throw new Error('Authentication response is missing token');
      }

      // Transform response.user to match our User type
      // Transform response to match our extended User type
      if (!response.user.id || !response.user.email || !response.user.name) {
        throw new Error('Invalid user data in auth response');
      }

      const user: User = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        avatar: response.user.avatar || '',
        role: response.user.role === 'manager' ? 'admin' :
              (response.user.role === 'member' ? 'member' : 'viewer'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Persist transformed user data and token
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.token);
      
      // Update state with validated and typed values
      setUser(user);
      setToken(response.token);

    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  /**
   * Logs the user out by clearing the state and localStorage.
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  /**
   * Updates the user's information in the state and localStorage.
   */
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the auth context.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
