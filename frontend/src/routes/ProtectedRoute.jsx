import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { userAuth, loading, user } = useContext(AuthContext);
    useEffect(() => {
        userAuth()
    }, [])
    if (loading) {
        return <h1>Loading....</h1>
    }
    if (!user) {
        return <Navigate to={`/login`} replace />
    }
    return children
}

export default ProtectedRoute