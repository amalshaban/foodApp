import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free'
import 'E:/JSB/FoodApp/node_modules/bootstrap/dist/css/bootstrap.min.css'
import AuthContextProvider from './modules/Authnotication/components/context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
   

  </React.StrictMode>,
)
