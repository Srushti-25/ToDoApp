import axios from "axios";
import { createContext, useState } from "react";


export const AuthContext = createContext();

function AuthDataProvider({ children }) {
    const api = import.meta.env.VITE_BACKEND_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)

    const registerUser = async ({ name, email, password }) => {
        try {
            setLoading(true)
            const user = await axios.post(`${api}/auth/register`, { name, email, password }, { withCredentials: true });
            setSuccess("Register Successfully");
            return user.data.data
        } catch (error) {
            setError(error?.response?.data?.message)
        }
        finally {
            setLoading(false)
            setTimeout(() => {
                setError(null)
                setSuccess(null)
            }, 5000)
        }
    }
    const loginUser = async ({ email, password }) => {
        try {
            setLoading(true)
            const user = await axios.post(`${api}/auth/login`, { email, password }, { withCredentials: true });
            setUser(user.data.data)
            setSuccess("Login Successfully")
            return user.data.data
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message)
        }
        finally {
            setLoading(false)
            setTimeout(() => {
                setError(null)
                setSuccess(null)
            }, 5000)
        }
    }

    const userAuth = async () => {
        try {
            setLoading(true)
            const user = await axios.get(`${api}/auth/profile`, { withCredentials: true });
            setUser(user.data.data)
            return user.data.data
        } catch (error) {
            console.log(error);
            setUser(null)
        }
        finally {
            setLoading(false)
        }


    }

    const logOutUser = async () => {
        try {
            const user = await axios.post(`${api}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            return
        } catch (error) {
            console.log(error)
        }
    }


    return <AuthContext.Provider value={{ userAuth, registerUser, loginUser, success, loading, error, user, logOutUser }}>
        {children}
    </AuthContext.Provider>
}

export default AuthDataProvider