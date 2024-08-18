
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {USERS_URLS} from '../../../../assets/CONSTANTS/END-POINTS.ts';
import { EMAILVALIDATION, FIELDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS.ts'
import logo from '../../../../assets/imgs/44.png'

export default function VerifyAccount() {
    let navigate= useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
  } = useForm();
  
  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.put(USERS_URLS.verify, data);
      toast.success(response?.data?.message);
      navigate('/dashboard');
    
      } 
      catch (error:any) {
      toast.error(error?.response?.data?.message);
      console.log(error);
      
    }
  }

  return (
    
<div className='col-md-6 bg-white text-center align-self-center p-5 rounded-3'>
<img src={logo} className='w-50'/>
<h3 className='d-flex justify-content-start'>Verify Account</h3>
<p className='d-flex justify-content-start pb-3'>Welcome Back! Please enter your details</p>

<form  onSubmit={handleSubmit(onSubmit)}>

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
      <input type="text" className="form-control" placeholder="email"
       aria-label="email" aria-describedby="basic-addon1"
       {...register("email",EMAILVALIDATION)}
       />
    </div>
    
    {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}


    
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-key"></i></span>
      <input type="text" className="form-control" placeholder="Code"
       aria-label="code" aria-describedby="basic-addon1"
       {...register("code",FIELDVALIDATION)}
       />
    </div>
    
    {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
   

   
    <button disabled={isSubmitting} className='btn btn-success w-100'>Verify</button>
  </form>

</div>
  )
}
