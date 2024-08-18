import logo from '../../../../assets/imgs/44.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {USERS_URLS} from '../../../../assets/CONSTANTS/END-POINTS.ts'
import { EMAILVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS.ts'

export default function ForgetPass() {
  
let navigate= useNavigate();
let{
  register,
  handleSubmit,
  formState:{errors},
} = useForm();

let onSubmit = async (data:any)=>{
  try {
    let response = await axios.post(USERS_URLS.resetRequest, data);
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
    <div className='col-md-6 bg-white text-center align-self-center p-5 rounded-3'>
    <img src={logo} className='w-50'/>
    <h3 className='d-flex justify-content-start'>Forgot Your Password?</h3>
    <p className='d-flex justify-content-start pb-3'>No worries! Please enter your email and we will send a password reset link </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
          <input type="text" className="form-control" placeholder="enter your email"
           aria-label="email" aria-describedby="basic-addon1"
           {...register("email", EMAILVALIDATION)}
           />
        </div>
        
        {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
       
     
       
        <button className='btn btn-success w-100'>Submit</button>
      </form>
    </div>
  )
}
