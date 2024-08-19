import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { AuthorizedToken, CATEGORIES_URLS, IMG_URL, USERS_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import NoData from '../NoData/NoData';
import usersListbg from '../../../../assets/imgs/Group48102127.png'
import nodata from '../../../../assets/imgs/nodata.png'

import { format } from 'date-fns';

export default function UsersList() {

  const[ userId, setUserId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setUserId(id);
    setShow(true);
  };

 
  const [arrayOfPages, setArrayOfPages] = useState([]);

  
  let [usersList, setUsersList] =  useState([]);
  let getUsersList = async (
    pageNumber: number, 
    pageSize: number, 
    nameInput: string,
    countryValue: string,
    emailValue: string
  )=>{
    try {
      let response = await axios.get(USERS_URLS.getlist, {
        headers: { Authorization: `Bearer ${localStorage.token}` } ,
        params: {pageSize: pageSize, pageNumber: pageNumber, userName: nameInput, country:countryValue, email:emailValue }
      });
      let newArray:any = Array(response.data.totalNumberOfPages).fill().map((_, i) => i+1);
      setArrayOfPages(newArray);
         setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getUsersList(1,2,"","","");
  return () => {
  }
}, [])

const range = (start: number, end: number, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
const paginate =(totalNoOfPages, pageNo)=>{
  if(pageNo+5 > totalNoOfPages){
    return range(totalNoOfPages-4,totalNoOfPages+1)
  }
  return range(pageNo,pageNo+5);
}
// console.log(paginate(arrayOfPages.length,30));


let deleteUser = async () =>{
  try {
    let response = await axios.delete(USERS_URLS.delete(userId),AuthorizedToken);
    console.log(response);
    console.log(userId);
toast.success("User deleted successfully");
getUsersList(1,2,"","","");
handleClose();
  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}


const [nameValue, setNameValue] = useState("");
let getNameValue = (input) => {
  setNameValue(input.target.value);
  getUsersList(1,2,input.target.value,countryValue,emailValue);
  }
  const [countryValue, setCountryValue] = useState("");
  let getCountryValue = (input) => {
    setCountryValue(input.target.value);
    getUsersList(1,2,nameValue,input.target.value,emailValue);
    }
    const [emailValue, setEmailValue] = useState("");
    let getEmailValue = (input) => {
      setEmailValue(input.target.value);
      getUsersList(1,2,nameValue,countryValue,input.target.value);
      }

  return (
    <div className='container'>
    <Header 
      title = {"Users List"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl = {usersListbg}
    />
    

    <div className="title p-4 mt-2 d-flex justify-content-between align-items-center">
<div className="title-info">
      <h4 className="">Users Table Details</h4>
      <span className="text-muted">You can check all details</span>
    </div>
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
             onChange={getCountryValue} 
            >
            <option disabled>Choose a Tag</option>
      {usersList.map((user:any)=>(

<option value={user.country}>{user.country}</option>
      ))}  
            </select>  
        </div>
    </div>
    <div className="col-md-3">
    <div className="input-group">
            <select className="form-control" 
             onChange={getEmailValue} 
            >
            <option disabled>Choose a Tag</option>
      {usersList.map((user:any)=>(

<option value={user.email}>{user.email}</option>
      ))}  
            </select>  
        </div>
    </div>
    </div>


<div className=" d-flex mt-2 justify-content-between align-items-center">  
{usersList.length > 0 ? 
<table className="table table-striped">


  <thead className=''>
    <tr className='group-header'>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Creation Date</th>
      <th scope="col"></th>
    </tr>
  </thead>

 
  <tbody>
{usersList.map((user)=>(
  <tr key={user.id}>
    <td>{user.userName}</td>
   <td>
   {user.imagePath ?( 
        <img className='img-list' src={`${IMG_URL}${user.imagePath}`}/>
      ):(<img className='img-list' src={nodata}/>) 
      }
   </td>
   
    <td>{format(user.creationDate, 'MMMM d, yyyy')}</td>
    
    <td>
    <i 
    
    onClick={()=>handleShow(user.id)} className="fa-solid fa-trash text-danger"></i>
    <i className="fa-solid text-success ms-2 fa-pen-to-square"></i>
    </td>
  </tr>
))}

  </tbody>
</table>
:<NoData/>}
</div>
  
  <div className="d-flex">
 <nav aria-label=" example">
  <ul className="pagination">

    {arrayOfPages.map((pageNo:any)=>(

<li key={pageNo} onClick={() =>getUsersList(pageNo,2,"","","")} className="page-item">


  <a className="page-link" href="#">
    {pageNo}
    </a>
  </li>
    ))}


  </ul>
</nav>
 

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
          <DeleteConfirmation deleteItem={'user'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteUser} variant='btn btn-outline-danger'>Delete this User</Button>
        </Modal.Footer>
      </Modal>
  



    </div>
  )
}
