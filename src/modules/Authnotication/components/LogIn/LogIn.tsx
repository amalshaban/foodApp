import { useContext, useState } from 'react'
import logo from '../../../../assets/imgs/44.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.tsx';

export default function LogIn() {
 let { saveLoginData } = useContext(AuthContext);
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
let navigate= useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm();
  
  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data);
      
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
<div className="container-fluid">
    <div className="row containerImg vh-100">
    <div className="bg-overlay  d-flex   justify-content-center  ">
      <div className='col-md-6 bg-white text-center align-self-center p-5 rounded-3'>
      <img src={logo} className='w-50'/>
      <h3>Log In</h3>
      <p>Welcome Back! Please enter your details</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="text" className="form-control" placeholder="email"
             aria-label="email" aria-describedby="basic-addon1"
             {...register("email", {
              required: "Email is required",
              pattern:{
                value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                message:'Email address is not valid !'
              }
             })}
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
         
          <button className='btn btn-success w-100'>LogIn</button>
        </form>
      </div>
    </div>
 </div>
 
</div>  
)
}
function saveLoginData() {
  throw new Error('Function not implemented.');
}
