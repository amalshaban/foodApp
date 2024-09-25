
import logo from '../../../../assets/imgs/44.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {USERS_URLS} from '../../../../assets/CONSTANTS/END-POINTS.ts'
import { EMAILVALIDATION, FIELDVALIDATION, PASSWORDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS.ts'
export default function Register() {
    
let navigate= useNavigate();
let{
  register,
  getValues,
  handleSubmit,
  formState:{errors},
} = useForm();


const appendToFormData = (data:any) => {
  const formData = new FormData();
  formData.append('userName' , data.userName)
  formData.append('email' , data.email)
  formData.append('country' , data.country)
  formData.append('phoneNumber' , data.phoneNumber)
  formData.append('password' , data.password)
  formData.append('confirmPassword' , data.confirmPassword)
  
data?.profileImage && formData.append('profileImage', data.profileImage[0])
  return formData;
}



const onSubmit = async (data:any)=>{
  const registerData = appendToFormData(data);
  try {
    const response = await axios.post(USERS_URLS.register, registerData);

    toast.success(response.data.message);
     navigate('/verifyaccount');
    } 
    catch (error:any) {
    toast.error(error.response.data.message);
    console.log(error);
    
  }
}


  return (
    <div className='col-md-9 bg-white text-center align-self-center p-5 rounded-3'>
    <img src={logo} className='w-25'/>
    <h5 className='d-flex justify-content-start'>Register</h5>
    <p className='d-flex justify-content-start pb-2'>Welcome Back! Please enter your details</p>
    
    <form onSubmit={handleSubmit(onSubmit)}>
   
     <div className='row'>
        <div className="col-md-6">
        <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
          <input type="text" className="form-control" placeholder="User Name"
           aria-label="userName" aria-describedby="basic-addon1"
           {...register("userName", FIELDVALIDATION)}
           />
        </div>
        {errors.userName && <p className='alert alert-danger p-2'>{errors?.userName?.message}</p>}
        </div>
        <div className="col-md-6">
        <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
          <input type="email" className="form-control" placeholder="email"
           aria-label="email" aria-describedby="basic-addon1"
           {...register("email", EMAILVALIDATION)}
           />
        </div>
        {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
        </div>
       
      
     </div>

     <div className='row'>
      <div className="col-md-6">
      <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-globe"></i></span>
          <input type="text" className="form-control" placeholder="country "
           aria-label="country " aria-describedby="basic-addon1"
           {...register("country", FIELDVALIDATION)}
           />
        </div>
        {errors.country && <p className='alert alert-danger p-2'>{errors?.country?.message}</p>}
        
      </div>
   <div className="col-md-6">
   <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-phone"></i></span>
          <input type="text" className="form-control" placeholder="phone Number"
           aria-label="phoneNumber" aria-describedby="basic-addon1"
           {...register("phoneNumber", FIELDVALIDATION)}
           />
        </div>
        {errors.phoneNumber  && <p className='alert alert-danger p-2'>{errors?.phoneNumber?.message}</p>}
      
   </div>
      
     </div>

     <div className='row'>
      <div className="col-md-6">
      <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
          <input type="password" className="form-control" placeholder="password"
           aria-label="password " aria-describedby="basic-addon1"
           {...register("password", PASSWORDVALIDATION)}
           />
        </div>
        {errors.password  && <p className='alert alert-danger p-2'>{errors?.password?.message}</p>}
        
      </div>
      <div className="col-md-6">
      <div className="input-group mb-1">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
          <input type="password" className="form-control" placeholder="confirmPassword"
           aria-label="confirmPassword" aria-describedby="basic-addon1"
           {...register("confirmPassword", {
            required: "password is required",
            validate: (value) =>
               value === getValues("password") || "Password is not matched",
           })}
           />
        </div>
        {errors.confirmPassword  && <p className='alert alert-danger p-2'>{errors?.confirmPassword?.message}</p>}
      
      </div>
  
    
     </div>
     <div className="row">
        <div className="col-md-12">
        <div className="mb-3">
  <input className="form-control" type="file" id="formFile"
           {...register("profileImage")}
           />
</div>
      
        </div>
     </div>
     <button className='btn btn-success text-center m-auto w-75'>Register</button>
      </form>
    
    </div>
  )
}
