import React from 'react'
import logo from '../../../../assets/imgs/44.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ForgetPass() {
  
let navigate= useNavigate();
let{
  register,
  handleSubmit,
  formState:{errors},
} = useForm();

let onSubmit = async (data:any)=>{
  try {
    let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data);
    console.log(response);
    toast.success('check your email inbox');
    navigate('/resetpass');
    } 
    catch (error:any) {
    toast.error(error.response.data.message);
    console.log(error);
    
  }
}
  return (
    <div className="container-fluid">
    <div className="row containerImg vh-100">
    <div className="bg-overlay  d-flex   justify-content-center  ">
      <div className='col-md-6 bg-white text-center align-self-center p-5 rounded-3'>
      <img src={logo} className='w-50'/>
      <h3>Forgot Your Password?</h3>
      <p>No worries! Please enter your email and we will send a password reset link </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="text" className="form-control" placeholder="enter your email"
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
         
       
         
          <button className='btn btn-success w-100'>Submit</button>
        </form>
      </div>
    </div>
 </div>
 
</div>  
  )
}
