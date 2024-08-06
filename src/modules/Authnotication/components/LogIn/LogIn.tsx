import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.tsx';
import {USERS_URLS} from '../../../../assets/CONSTANTS/END-POINTS.ts';
import { EMAILVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS.ts'
import AuthLayout from '../../../shared/components/AuthLayout/AuthLayout.tsx';


export default function LogIn() {
 let { saveLoginData } = useContext(AuthContext);
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
let navigate= useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
  } = useForm();
  
  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post(USERS_URLS.login, data);
      
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      toast.success(`congratulations, login success`);
      navigate('/dashboard');
    
      } 
      catch (error:any) {
      toast.error(error?.response?.data?.message);
      console.log(error);
      
    }
  }
  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
      <input type="text" className="form-control" placeholder="email"
       aria-label="email" aria-describedby="basic-addon1"
       {...register("email",EMAILVALIDATION)}
       />
    </div>
    
    {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
    <div className="input-group">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
      <input type={`${isPasswordVisible?"text" : "password"  }`} className="form-control" placeholder="password"
       aria-label="password" aria-describedby="basic-addon1"
       {...register("password", {
        required: "Password is required",
       })}/>
       <button
       onMouseDown={(e)=>{e.preventDefault()}}
       onMouseUp={(e)=>{e.preventDefault()}}
       onClick={()=>setIsPasswordVisible((prev) => !prev)}
        type='button'
       className="input-group-text" id="basic-addon1">
          <i className={`fa-solid ${isPasswordVisible?"fa-eye" : "fa-eye-slash"  }`}></i></button>
      
    </div>
    {errors.password && <p className='alert alert-danger p-2'>{errors?.password?.message}</p>}
   
   <div className="d-flex justify-content-between mb-3">
    <Link className='reg' to={'/register'}>Register Now?</Link>
    <Link className='forgot' to={'/forgetpass'}>Forgot Password?</Link>
   </div>
   
    <button disabled={isSubmitting} className='btn btn-success w-100'>LogIn</button>
  </form>




)
}
function saveLoginData() {
  throw new Error('Function not implemented.');
}
