
import logo from '../../../../assets/imgs/44.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {USERS_URLS} from '../../../../assets/CONSTANTS/END-POINTS.ts'
import { EMAILVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS.ts'
export default function Register() {
  
let navigate= useNavigate();
let{
  register,
  handleSubmit,
  formState:{errors},
} = useForm();

let onSubmit = async (data:any)=>{
  try {
    let response = await axios.post(USERS_URLS.register, data);
    console.log(response);
    toast.success('Registeration success');
    navigate('/login');
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
      <h3>Register</h3>
      <p className='p-2'>Welcome Back! Please enter your details</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
     
       <div className='row'>
      <div className="input-group w-50 mb-1">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
            <input type="text" className="form-control" placeholder="UserName"
             aria-label="UserName" aria-describedby="basic-addon1"
             {...register("UserName", {
              required: "UserName is required"
             })}
             />
          </div>
          {errors.userName && <p className='alert alert-danger p-2'>{errors?.userName?.message}</p>}
          
          <div className="input-group w-50 mb-1">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
            <input type="text" className="form-control" placeholder="email"
             aria-label="email" aria-describedby="basic-addon1"
             {...register("email", EMAILVALIDATION)}
             />
          </div>
          {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
        
       </div>

       <div className='row'>
      <div className="input-group w-50 mb-1">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-globe"></i></span>
            <input type="text" className="form-control" placeholder="country "
             aria-label="country " aria-describedby="basic-addon1"
             {...register("country ", {
              required: "country  is required"
             })}
             />
          </div>
          {errors.country  && <p className='alert alert-danger p-2'>{errors?.country?.message}</p>}
          
          <div className="input-group w-50 mb-1">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-phone"></i></span>
            <input type="phone" className="form-control" placeholder="phoneNumber "
             aria-label="phoneNumber " aria-describedby="basic-addon1"
             {...register("phoneNumber ", {
              required: "phoneNumber  is required"
             })}
             />
          </div>
          {errors.phoneNumber  && <p className='alert alert-danger p-2'>{errors?.phoneNumber?.message}</p>}
        
       </div>

       <div className='row'>
      <div className="input-group w-50 mb-1">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
            <input type="password" className="form-control" placeholder="password"
             aria-label="password " aria-describedby="basic-addon1"
             {...register("password", {
              required: "password  is required"
             })}
             />
          </div>
          {errors.password  && <p className='alert alert-danger p-2'>{errors?.password?.message}</p>}
          
          <div className="input-group w-50 mb-1">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
            <input type="password" className="form-control" placeholder="confirmPassword"
             aria-label="confirmPassword" aria-describedby="basic-addon1"
             {...register("confirmPassword", {
              required: "confirmPassword  is required"
             })}
             />
          </div>
          {errors.confirmPassword  && <p className='alert alert-danger p-2'>{errors?.confirmPassword?.message}</p>}
        
       </div>
       
       <button className='btn btn-success text-center m-3 w-75'>Register</button>
        </form>
      
      </div>
      
     
    </div>
 </div>
 
</div> 
  )
}
