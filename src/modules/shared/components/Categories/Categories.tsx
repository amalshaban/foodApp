import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import categoriesbg from '../../../../assets/imgs/Group48102127.png'
import { AuthorizedToken, CATEGORIES_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import NoData from '../NoData/NoData';



export default function Categories() {


  const[ catId, setCatId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id: any) =>{ 
    setCatId(id);
    setShow(true);
  };

let deletecategory = async () =>{
  try {
    let response = await axios.delete(CATEGORIES_URLS.delete(catId),AuthorizedToken);
console.log(response);
toast.success("Category deleted successfully");
getCategoriesList();
handleClose();
  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}


  let [categoriesList, setCategoriesList] =  useState([]);
  let getCategoriesList = async ()=>{
    try {
      let response = await axios.get(CATEGORIES_URLS.getlist,
         { headers: { Authorization: `Bearer ${localStorage.token}` } });
            setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getCategoriesList();
  return () => {
  }
}, [])

  return (
    <>
    
   
    <div>
    <Header 
      title = {"Categories Items"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl = {categoriesbg}
    />
    </div>

<div className="title p-4 d-flex justify-content-between">
<div className="title-info">
      <h4 className="">Categories Table Details</h4>
      <span className="">You can check all details</span>
    </div>
<button className='btn btn-success'>Add New Category</button>
</div>


{categoriesList.length > 0 ?   
<table className="table p-2">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Creation Date</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
{categoriesList.map((category)=>(
  <tr key={category.id}>
    
    <td>{category.id}</td>
    <td>{category.name}</td>
    <td>{category.creationDate}</td>
    
    <td>
    <i  onClick={()=>handleShow(category.id)} className="fa-solid fa-trash me-2"></i>
    <i className="fa-solid fa-pen-to-square"></i>
    </td>
  </tr>
))}

  </tbody>
</table>:<NoData/>}
 


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Category'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deletecategory} variant='btn btn-outline-danger'>Delete this Category</Button>
        </Modal.Footer>
      </Modal>
  

    </>
  )
}
