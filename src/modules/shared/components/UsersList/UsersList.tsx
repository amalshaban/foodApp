import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { AuthorizedToken, CATEGORIES_URLS, USERS_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import NoData from '../NoData/NoData';
import usersListbg from '../../../../assets/imgs/Group48102127.png'


export default function UsersList() {

  const[ userId, setUserId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setUserId(id);
    setShow(true);
  };

 

  
  let [usersList, setUsersList] =  useState([]);
  let getUsersList = async ()=>{
    try {
      let response = await axios.get(CATEGORIES_URLS.getlist,AuthorizedToken);
         setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getUsersList();
  return () => {
  }
}, [])



let deleteUser = async () =>{
  try {
    let response = await axios.delete(USERS_URLS.delete(userId),AuthorizedToken);
    console.log(response);
    console.log(userId);
toast.success("User deleted successfully");
getUsersList();
handleClose();
  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}

  return (
    <>
    <Header 
      title = {"Users List"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl = {usersListbg}
    />
    

    <div className="title p-4 d-flex justify-content-between">
<div className="title-info">
      <h4 className="">Users Table Details</h4>
      <span className="">You can check all details</span>
    </div>
<button className='btn btn-success'>Add New User</button>
</div>

{usersList.length > 0 ? 

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
{usersList.map((user)=>(
  <tr key={user.id}>
    
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.creationDate}</td>
    
    <td>
    <i 
    
    onClick={()=>handleShow(user.id)} className="fa-solid fa-trash me-2"></i>
    <i className="fa-solid fa-pen-to-square"></i>
    </td>
  </tr>
))}

  </tbody>
</table>

:<NoData/>}



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
  



    </>
  )
}
