import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import { router } from './routes/Router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthDataProvider from './context/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <AuthDataProvider>
      <RouterProvider router={router} />
    </AuthDataProvider>
  </StrictMode>,
)
