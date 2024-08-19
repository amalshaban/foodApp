
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import NotFound from './modules/shared/components/NotFound/NotFound'
import LogIn from './modules/Authnotication/components/LogIn/LogIn'
import ForgetPass from './modules/Authnotication/components/ForgetPass/ForgetPass'
import ResetPass from './modules/Authnotication/components/ResetPass/ResetPass'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import RecipiesList from './modules/shared/components/Recipies/RecipiesList'
import Home from './modules/shared/components/Home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './modules/Authnotication/components/Register/Register'
import ProtectedRoute from './modules/Authnotication/components/ProtectedRoute/ProtectedRoute'
import UsersList from './modules/shared/components/UsersList/UsersList'
import Categories from './modules/shared/components/Categories/Categories'
import AddRecipie from './modules/shared/components/Recipies/AddRecipie'
import VerifyAccount from './modules/Authnotication/components/VerifyAccount/VerifyAccount'
import Favourites from './modules/shared/components/Favourites/Favourites'

function App() {
const routes = createHashRouter([
  {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true, element: <LogIn/>},
        {path:'login', element: <LogIn/>},
        {path:'forgetpass', element: <ForgetPass/>},
        {path:'resetpass', element: <ResetPass/>},
        {path: 'register' , element:<Register/>},
        {path: 'verifyaccount' , element:<VerifyAccount/>}
      ]
  },
  {
    path:'dashboard',
   
    element:
     <ProtectedRoute loginData >
           <MasterLayout/>
      </ProtectedRoute>,
    errorElement:<NotFound/>,
    children:[
      {index:true, element: <Home/>},
      {path:'home', element: <Home/>},
      {path:'recipieslist', element: <RecipiesList/>},
      {path:'userslist', element: <UsersList/>},
      {path:'categories', element: <Categories/>},
      {path:'addrecipie', element: <AddRecipie/>},
      {path:'updaterecipie/:data', element: <AddRecipie/>},
      {path:'favourites', element: <Favourites/>},
    ]
  }
])

  return (
  <>
  
  <ToastContainer/>
  <RouterProvider router={routes}/>

  </>
  )
}

export default App
