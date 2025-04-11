import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';
import { type StateCreator } from 'zustand';

// Configure axios defaults
axios.defaults.withCredentials = true; // Important for CORS with credentials

export interface User {
  id: string;
  email: string;
  nickname: string;
  first_name: string;
  last_name: string;
  role: 'USER' | 'ADMIN';
  created_at: string;
  updated_at: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  redirectToPath: string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  clearRedirect: () => void;
}

export interface RegisterData {
  email: string;
  password: string;
  nickname: string;
  first_name: string;
  last_name: string;
}

// Define the persisted state type (only what we want to store)
type AuthPersistedState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

type AuthStorePersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState, AuthPersistedState>
) => StateCreator<AuthState>;

// Declare the API_BASE_URL with explicit type
// Update this URL to match your FastAPI backend URL
const API_BASE_URL = 'http://localhost:8000'; // Explicitly set to match your backend URL

// For debugging - log the API URL being used
console.log("API URL being used:", API_BASE_URL);

export const useAuthStore = create<AuthState>()(
  (persist as AuthStorePersist)(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      redirectToPath: null,

      register: async (userData: RegisterData) => {
        try {
          set({ isLoading: true, error: null });
          
          console.log("Registering at:", `${API_BASE_URL}/auth/register`);
          console.log("Registration data:", userData);
          
          const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
          
          console.log("Registration response:", response.status);
          
          if (response.status === 201) {
            console.log("Registration successful");
            
            // After successful registration, set redirect to login
            // (We don't automatically log in after registration)
            set({ 
              isLoading: false,
              redirectToPath: '/login' // This will be used to show login modal or redirect
            });
          } else {
            throw new Error(`Registration failed with status ${response.status}`);
          }
        } catch (error) {
          console.error("Registration error:", error);
          
          const axiosError = error as AxiosError<{ detail: string }>;
          let errorMessage = 'Registration failed. Please try again.';
          
          if (axiosError.response) {
            console.error("Response status:", axiosError.response.status);
            console.error("Response data:", axiosError.response.data);
            
            if (axiosError.response.status === 404) {
              errorMessage = 'API endpoint not found. Please ensure your backend server is running.';
            } else if (axiosError.response.data && 'detail' in axiosError.response.data) {
              errorMessage = axiosError.response.data.detail;
            }
          } else if (axiosError.request) {
            errorMessage = 'No response received from server. Please check your connection.';
          }
          
          set({ 
            error: errorMessage,
            isLoading: false 
          });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          console.log("Attempting to login at:", `${API_BASE_URL}/auth/login`);
          
          // Use URLSearchParams for x-www-form-urlencoded format as specified in your API docs
          const params = new URLSearchParams();
          params.append('username', email);
          params.append('password', password);
          
          const response = await axios.post(`${API_BASE_URL}/auth/login`, params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
          
          console.log("Login response:", response.status);
          console.log("Login response data:", response.data);
          
          if (response.status === 200) {
            // The response might be just the token as a string based on your API docs
            // Handle both cases: direct string token or object with access_token property
            let token = response.data;
            
            if (typeof response.data === 'object' && response.data.access_token) {
              token = response.data.access_token;
            }
            
            if (!token) {
              console.error("No access token found in login response");
              throw new Error("Login successful but no access token returned");
            }
            
            console.log("Retrieved token:", token);
            
            // Try to get user data from response if available
            let userData = null;
            
            try {
              // Check if we can decode the JWT to get basic user data
              const tokenData = JSON.parse(atob(token.split('.')[1]));
              console.log("Token data:", tokenData);
              
              if (tokenData.sub) {
                userData = {
                  id: tokenData.sub,
                  email: email,
                  nickname: tokenData.nickname || email.split('@')[0],
                  first_name: tokenData.first_name || "",
                  last_name: tokenData.last_name || "",
                  role: tokenData.role || "USER",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                };
              }
            } catch (e) {
              console.warn("Could not decode JWT token", e);
            }
            
            // Create minimal user object if no data available from token
            if (!userData) {
              userData = {
                id: "logged-in-user",
                email: email,
                nickname: email.split('@')[0],
                first_name: "",
                last_name: "",
                role: "USER" as "USER" | "ADMIN",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
            }
            
            // Determine redirect path based on user role
            const redirectPath = userData.role === "ADMIN" ? '/admin' : '/dashboard';
            
            // Set authentication state with user info
            set({ 
              token: token,
              isAuthenticated: true,
              isLoading: false,
              user: userData,
              redirectToPath: redirectPath
            });
          } else {
            throw new Error(`Login failed with status ${response.status}`);
          }
        } catch (error) {
          console.error("Login error:", error);
          
          const axiosError = error as AxiosError<{ detail: string }>;
          let errorMessage = 'Login failed. Please check your credentials.';
          
          if (axiosError.response) {
            console.error("Response status:", axiosError.response.status);
            console.error("Response data:", axiosError.response.data);
            
            if (axiosError.response.status === 404) {
              errorMessage = 'API endpoint not found. Please ensure your backend server is running.';
            } else if (axiosError.response.data && 'detail' in axiosError.response.data) {
              errorMessage = axiosError.response.data.detail;
            }
          } else if (axiosError.request) {
            errorMessage = 'No response received from server. Please check your connection.';
          }
          
          set({ 
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null
          });
          throw error;
        }
      },

      logout: () => {
        // Call the logout endpoint (for API completeness)
        const { token } = get();
        if (token) {
          console.log("Calling logout endpoint");
          axios.post(`${API_BASE_URL}/auth/logout`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).catch((error) => {
            console.error("Logout error (ignored):", error);
            // We don't need to handle the error as we're clearing the state anyway
          });
        }
        
        // Clear the auth state
        set({ 
          token: null,
          user: null,
          isAuthenticated: false
        });
        console.log("User logged out");
      },

      clearError: () => {
        set({ error: null });
      },

      clearRedirect: () => {
        set({ redirectToPath: null });
      }
    }),
    {
      name: 'theoforge-auth', // name for the localStorage key
      partialize: (state: AuthState): AuthPersistedState => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);
