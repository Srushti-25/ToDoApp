import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthDataProvider({ children }) {
    const api = import.meta.env.VITE_BACKEND_URL;
    console.log("API URL:", api);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Register User
    const registerUser = async ({ name, email, password }) => {
        try {
            setLoading(true);

            const response = await axios.post(
                `${api}/auth/register`,
                { name, email, password },
                { withCredentials: true }
            );

            setSuccess("Register Successfully");

            return response.data.data;
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "Registration Failed");
        } finally {
            setLoading(false);

            setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 5000);
        }
    };

    // Login User
    const loginUser = async ({ email, password }) => {
        try {
            setLoading(true);

            const response = await axios.post(
                `${api}/auth/login`,
                { email, password },
                { withCredentials: true }
            );

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            setUser(response.data.data);
            setSuccess("Login Successfully");

            return response.data.data;
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);

            setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 5000);
        }
    };

    // Get Logged In User
    const userAuth = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                return;
            }

            const response = await axios.get(
                `${api}/auth/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data.data);

            return response.data.data;
        } catch (error) {
            console.log(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Logout User
    const logOutUser = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${api}/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            localStorage.removeItem("token");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                registerUser,
                loginUser,
                userAuth,
                logOutUser,
                user,
                loading,
                success,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthDataProvider;