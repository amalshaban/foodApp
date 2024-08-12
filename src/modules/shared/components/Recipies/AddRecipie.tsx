import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthorizedToken, CATEGORIES_URLS, RCIPIES_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import { Button } from 'react-bootstrap';
import { FIELDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATIONS';
import { toast } from 'react-toastify';


export default function AddRecipie() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard/recipieslist'); 
  };
    let{register,
        handleSubmit, 
        formState:{errors},
      } = useForm();

      const appendToFormData = (data: any) => {
        const formData = new FormData();
        formData.append('name' ,data.name)
        formData.append('description' ,data.description)
        formData.append('price' ,data.price)
        formData.append('tagId' ,data.tagId)
        formData.append('recipeImage' ,data.recipeImage[0])
        formData.append('categoriesIds' ,data.categoriesIds)

        return formData;
      }
        let onSubmit = async(data: any)=>{
          let recipieData = appendToFormData(data);
          try {
            let response = await axios.post(RCIPIES_URLS.addnewrecipie, recipieData, AuthorizedToken);
            console.log(response);
            toast.success('A new recipie was added successfully');
            navigate('/recipieslist');
            } 
            catch (error:any) {
            // toast.error(error.response.data.message);
            console.log(error);
            
          }
        }
let [ tagsList, setTagsList] =useState([]);
let [ categoriesList, setCategoriesList] =useState([]);
let getAllCategories =async()=>{
  try {
    let response = await axios.get(CATEGORIES_URLS.getlist,AuthorizedToken);
    setCategoriesList(response.data.data);

  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  getAllCategories();
  return () => {
  }
}, [])

let getAllTags =async()=>{
  try {
    let response = await axios.get(RCIPIES_URLS.getlist,AuthorizedToken);
    setTagsList(response.data.data);

  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  getAllTags();

  return () => {
  }
}, [])



  return (
    <>
        <div className="title p-4 m-4 d-flex justify-content-between align-items-center">
    <div className="title-info">
          <h4 className="">Fill the <span className='text-success'>Recipes</span> !</h4>
          <span className="">you can now fill the meals easily using the table and form , <br/>
          click here and sill it with the table !</span>
        </div>
    <button  onClick={handleClick} className='btn btn-success'>All Recipes !</button>
    </div>
    <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Recipie Name"
           aria-label="name" aria-describedby="basic-addon1"
           {...register("name", FIELDVALIDATION)}
           />
        </div>
        {errors.name && <p className='alert alert-danger p-2'>{errors?.name?.message}</p>}
        <div className="input-group mb-3">
            <select>
            <option disabled>Choose a Tag</option>
      {tagsList.map((tag:any)=>(

<option value={tag.id}>{tag.name}</option>
      ))}  
            </select>  
        </div>  
        <div className="input-group mb-3">
          <input type="number" className="form-control" placeholder="Price"
           aria-label="price" aria-describedby="basic-addon1"
           {...register("price", FIELDVALIDATION)}
           />
        </div>
        {errors.price && <p className='alert alert-danger p-2'>{errors?.price?.message}</p>}

        <div className="input-group mb-3">
            <select>
            <option disabled>Choose Category</option>
      {categoriesList.map((category:any)=>(

<option key={category.id} value={category.id}>{category.name}</option>
      ))}
            </select>  
        </div> 


        <div className="input-group mb-3">
          <input type="text-area"  as="textarea" rows={3} className="form-control" placeholder="Description"
           aria-label="description" aria-describedby="basic-addon1"
           {...register("description", FIELDVALIDATION)}
           />
        </div>
        {errors.description && <p className='alert alert-danger p-2'>{errors?.description?.message}</p>}


        <div className="mb-3">
  <input className="form-control" type="file" id="formFile"
      {...register("recipeImage", FIELDVALIDATION)}
      />
</div>


<button className='btn btn-success my-1 mx-1'>Cancel</button>
<button  type='Submit' className='btn btn-success my-1 mx-1'>Save</button>
    </form>

    </>
    
  )
}
