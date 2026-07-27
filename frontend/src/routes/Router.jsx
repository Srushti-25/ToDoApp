import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterUI from "../components/RegisterUI";
import LoginUI from "../components/LoginUI";
import App from "../App";
import DashBoard from "../pages/dashboard/DashBoard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


export const router = createBrowserRouter([
    {
        path: "/", element: (<PublicRoute>
            <App />
        </PublicRoute>)
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginUI />
            </PublicRoute>
        )
    },
    {
        path: "/dashboard",
        element: (<ProtectedRoute>
            <DashBoard />
        </ProtectedRoute>)
    }
])