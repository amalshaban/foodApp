import React, { useContext, useEffect, useState } from 'react'
import recipiesbg from '../../../../assets/imgs/Group48102127.png'
import Header from '../Header/Header'
import axios from 'axios';
import { AuthorizedToken, CATEGORIES_URLS, IMG_URL, RCIPIES_URLS, USER_RECIPIES_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import NoData from '../NoData/NoData';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';

import nodata from '../../../../assets/imgs/nodata.png'
import { Link,  } from 'react-router-dom';
import { AuthContext } from '../../../Authnotication/components/context/AuthContext';
import AddRecipie from './AddRecipie';


export default function RecipiesList() {

let {loginData} = useContext(AuthContext);


  const[ recipieId, setRecipieId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setRecipieId(id);
    setShow(true);
  };

  
  const [arrayOfPages, setArrayOfPages] = useState([]);

  let [recipiesList, setRecipiesList] =  useState([]);
  let getRecipiesList = async (pageNumber: number, 
    pageSize: number, 
    nameInput,
    tagInput,
    catInput
  )=>{
    try {
      let response = await axios.get(RCIPIES_URLS.getlist,{
        headers: { Authorization: `Bearer ${localStorage.token}` } ,
        params: {pageSize: pageSize,
           pageNumber: pageNumber, 
           name:nameInput, 
           tagId:tagInput, 
           categoryId:catInput
          }
      }); 
      let newArray:any = Array(response.data.totalNumberOfPages).fill().map((_, i) => i+1);
      setArrayOfPages(newArray);
      setRecipiesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getRecipiesList(1,2,"","","");
  getAllCategories();
  getAllTags();
  return () => {
  }
}, [])

let deleteRecipie = async () =>{
  try {
    let response = await axios.delete(RCIPIES_URLS.delete(recipieId), AuthorizedToken);
console.log(response);
toast.success("Recipie deleted successfully");
getRecipiesList(1,2,"","","");
handleClose();
  } catch (error) {
    console.log(error);
    toast.error("delete failed");
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


let getAllTags =async()=>{
  try {
    let response = await axios.get(RCIPIES_URLS.getlist,AuthorizedToken);
    setTagsList(response.data.data);
  console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
}



const [nameValue, setNameValue] = useState("");
const [tagValue, setTagValue] = useState("");
const [catValue, setCatValue] = useState("");
let getNameValue = (input) => {
setNameValue(input.target.value);
getRecipiesList(1,2,input.target.value,tagValue,catValue);
}
let getTagValue = (input) => {
  setTagValue(input.target.value);
  getRecipiesList(1,2,nameValue,input.target.value,catValue);
  }
  let getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipiesList(1,2,nameValue,tagValue,input.target.value);
    }


  let addToFav = async(id)=>{
  try {
    let response = await axios.post(USER_RECIPIES_URLS.addtofav, { recipeId: id }, AuthorizedToken);
      console.log(response);
      toast.success("Recipie added successfully to your favourites List")
        } catch (error) {
          console.log(error);
          toast.error("Recipie was not added")
        }
      }

  return (
    <div className='container'>
    <div>
    <Header 
      title = {"Recipes Items"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edits"}
      imgurl = {recipiesbg}
    />

    </div>
    
    <div className="title p-4 mt-2  d-flex justify-content-between align-items-center">
<div className="title-info">
      <h4 className="">Recipies Table Details</h4>
      <span className="">You can check all details</span>
    </div>
    {loginData?.userGroup == "SuperAdmin"?(
<Link to='/dashboard/addrecipie' className='btn btn-success pb-1'>Add New Recipie</Link>
):("")}
</div>


<div className="row mt-2">
      <div className="col-md-6">
      <div className="input-group">
      <input type='text' 
      className='form-control' 
      onChange={getNameValue} 
      placeholder='search by name ...'
      />
    </div>
    </div>
    <div className="col-md-3">
    <div className="input-group">
            <select className="form-control" 
             onChange={getTagValue} 
            >
            <option disabled>Choose a Tag</option>
      {tagsList.map((tag:any)=>(

<option value={tag.tag.id}>{tag.tag.name}</option>
      ))}  
            </select>  
        </div>
    </div>
    <div className="col-md-3">

    <div className="input-group">
            <select className="form-control"
             onChange={getCatValue} 
            >
            <option disabled>Choose Category</option>
      {categoriesList.map((category:any)=>(

<option key={category.id} value={category.id}>{category.name}</option>
      ))}
            </select>  
        </div>
    </div>
</div>
<div className=" d-flex justify-content-between align-items-center">
{recipiesList.length >0 ?
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Type</th>
      <th scope="col">Modification Date</th>
      <th scope="col"></th>
   
    </tr>
  </thead>
  <tbody>
{recipiesList.map((recipie)=>(
  <tr key={recipie.id}>
    <td>{recipie.id}</td>
    <td>{recipie.name}</td>
    <td>
      {recipie.imagePath ?( 
        <img className='img-list' src={`${IMG_URL}${recipie.imagePath}`}/>
      ):(<img className='img-list' src={nodata}/>) 
      }
      </td>
    <td>{recipie.price}</td>
    <td>{recipie.description}</td>
    <td>{recipie.tag.name}</td>
    <td>{recipie.modificationDate}</td>
    
    {loginData?.userGroup == "SuperAdmin"?(
    <td>
    <i onClick={()=>handleShow(recipie.id)} className="fa-solid fa-trash text-danger"></i>
    <Link to={`/dashboard/updaterecipie/:${recipie}`}
    state={{AddRecipie: recipie, type: 'edit'}}
    >
    <i className="fa-solid fa-pen-to-square text-success  ms-2"></i>
    </Link>
    </td>
      ):(
        <i onClick={()=>addToFav(recipie.id)} className='fa fa-heart text-danger'></i>
      )}     
  </tr>
))}

  </tbody>
</table>
:<NoData/>}
</div>

<div className="row">

<div className="d-flex justify-content-center">
 <nav aria-label="Page navigation example">
  <ul className="pagination">

    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    {arrayOfPages.map((pageNo:any)=>(

<li key={pageNo} onClick={() =>getRecipiesList(pageNo,2,"","","")} className="page-item">
  <a  className="page-link" href="#">
    {pageNo}
    </a>
  </li>
    ))}

    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
 </div>
</div>






<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Recipie'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteRecipie} variant='btn btn-outline-danger'>Delete this Recipie</Button>
        </Modal.Footer>
      </Modal>
  
    </div>
    
  )
}
