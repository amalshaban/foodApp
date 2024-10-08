import  {useState}  from 'react'
import logo from '../../../../assets/imgs/44.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USERS_URLS } from '../../../../assets/CONSTANTS/END-POINTS.ts';
import { EMAILVALIDATION, PASSWORDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS.ts'
export default function ResetPass() {
   
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
let navigate= useNavigate();

let{
  register,
  getValues,
  handleSubmit,
  formState:{errors},
} = useForm();

let onSubmit = async (data:any)=>{
  try {
    let response = await axios.post(USERS_URLS.reset, data);
    console.log(response);
    toast.success('your password was changed successfully');
    navigate('/login');
    } 
    catch (error:any) {
    toast.error(error.response.data.message);
    console.log(error);
    
  }
}
  return (
<div className='col-md-6 bg-white text-center align-self-center p-5 rounded-3'>
      <img src={logo} className='w-50'/>
      <h3 className='d-flex justify-content-start'> Reset  Password</h3>
      <p className='d-flex justify-content-start pb-3'>Please Enter Your Otp  or Check Your Inbox</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="email" className="form-control" placeholder="enter your email"
             aria-label="email" aria-describedby="basic-addon1"
             {...register("email", EMAILVALIDATION)}
             />
          </div>
          
          {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
         
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="text" className="form-control" placeholder="OTP"
             aria-label="text" aria-describedby="basic-addon1"
             {...register("seed", {
              required: "OTP is required",
             })}
             />
          </div>
          
          {errors.seed && <p className='alert alert-danger p-2'>{errors?.seed?.message}</p>}
       
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input  type={`${isPasswordVisible?"text" : "password"  }`} className="form-control" placeholder="New password"
             aria-label="password" aria-describedby="basic-addon1"
             {...register("password", PASSWORDVALIDATION)}
             />
              <button
             onMouseDown={(e)=>{e.preventDefault()}}
             onMouseUp={(e)=>{e.preventDefault()}}
             onClick={()=>setIsPasswordVisible((prev) => !prev)}
              type='button'
             className="input-group-text" id="basic-addon1">
                <i className={`fa-solid ${isPasswordVisible?"fa-eye" : "fa-eye-slash"  }`}></i></button>
            
          </div>
          
          {errors.password && <p className='alert alert-danger p-2'>{errors?.password?.message}</p>}
         
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input  type={`${isPasswordVisible?"text" : "password"  }`} className="form-control" placeholder="confirm password"
             aria-label="password" aria-describedby="basic-addon1"
             {...register("confirmPassword", {
              required: "password is required",
              validate: (value) =>
                 value === getValues("password") || "Password is not matched",
             })}
             />
              <button
             onMouseDown={(e)=>{e.preventDefault()}}
             onMouseUp={(e)=>{e.preventDefault()}}
             onClick={()=>setIsPasswordVisible((prev) => !prev)}
              type='button'
             className="input-group-text" id="basic-addon1">
                <i className={`fa-solid ${isPasswordVisible?"fa-eye" : "fa-eye-slash"}`}></i></button>
            
          </div>
        
          {errors.confirmPassword && <p className='alert alert-danger p-2'>{errors?.confirmPassword?.message}</p>}
         
          <button className='btn btn-success w-100'>Submit</button>
        </form>
      </div>
  )
}

