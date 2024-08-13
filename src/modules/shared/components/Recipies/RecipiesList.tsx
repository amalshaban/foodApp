import React, { useEffect, useState } from 'react'
import recipiesbg from '../../../../assets/imgs/Group48102127.png'
import Header from '../Header/Header'
import axios from 'axios';
import { AuthorizedToken, IMG_URL, RCIPIES_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import NoData from '../NoData/NoData';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';

import nodata from '../../../../assets/imgs/nodata.png'
import { Link } from 'react-router-dom';


export default function RecipiesList() {
  const[ recipieId, setRecipieId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setRecipieId(id);
    setShow(true);
  };

  

  let [recipiesList, setRecipiesList] =  useState([]);
  let getRecipiesList = async (data: any)=>{
    try {
      let response = await axios.get(RCIPIES_URLS.getlist,{
        AuthorizedToken,
        params: {pageSize: 3, pageNumber: 1}
      });
         setRecipiesList(response.data.data);
         console.log(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getRecipiesList();
  return () => {
  }
}, [])

let deleteRecipie = async () =>{
  try {
    let response = await axios.delete(RCIPIES_URLS.delete(recipieId), AuthorizedToken);
console.log(response);
toast.success("Recipie deleted successfully");
getRecipiesList();
handleClose();
  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}

  return (
    <>
    <div>
    <Header 
      title = {"Recipes Items"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edits"}
      imgurl = {recipiesbg}
    />

    </div>
    
    <div className="title p-4 m-4 d-flex justify-content-between">
<div className="title-info">
      <h4 className="">Recipies Table Details</h4>
      <span className="">You can check all details</span>
    </div>
<Link to='/dashboard/addrecipie' className='btn btn-success pb-0'>Add New Recipie</Link>
</div>
<div className="  p-4 d-flex justify-content-between">
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
    
    <td>
    <i onClick={()=>handleShow(recipie.id)} className="fa-solid fa-trash me-2"></i>
    <i className="fa-solid fa-pen-to-square"></i>
    </td>
  </tr>
))}

  </tbody>
</table>
:<NoData/>}
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
  
    </>
    
  )
}
