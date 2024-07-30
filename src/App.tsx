
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import NotFound from './modules/shared/components/NotFound/NotFound'
import LogIn from './modules/Authnotication/components/LogIn/LogIn'
import ChangePass from './modules/Authnotication/components/ChangePass/ChangePass'
import ForgetPass from './modules/Authnotication/components/ForgetPass/ForgetPass'
import ResetPass from './modules/Authnotication/components/ResetPass/ResetPass'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import RecipiesList from './modules/Recipies/components/RecipiesList/RecipiesList'
import Home from './modules/Recipies/components/Home/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './modules/Authnotication/components/Register/Register'


function App() {
const routes = createBrowserRouter([
  {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:"true", element: <LogIn/>},
        {path:'login', element: <LogIn/>},
        {path:'forgetpass', element: <ForgetPass/>},
        {path:'changepass', element: <ChangePass/>},
        {path:'resetpass', element: <ResetPass/>},
        {path: 'register' , element:<Register/>}
      ]
  },
  {
    path:'dashboard',
    element:<MasterLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:"true", element: <Home/>},
      {path:'home', element: <Home/>},
      {path:'recipieslist', element: <RecipiesList/>},
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
