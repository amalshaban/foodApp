import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import categoriesbg from '../../../../assets/imgs/Group48102127.png'
import { AuthorizedToken, BASE_CATEGORIES, CATEGORIES_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import NoData from '../NoData/NoData';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';



export default function Categories() {

  const [arrayOfPages, setArrayOfPages] = useState([]);
  const{
    register,
    setValue,
    handleSubmit,
    formState:{ isSubmitting},
  } = useForm();

  const[ catId, setCatId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShow = (id: any) =>{ 
    setCatId(id);
    setShow(true);
  };
  const handleShowAdd =() =>{ 
    setShowAdd(true);
  };
  const handleCloseupdate = () => setShowupdate(false);
  const handleShowupdate = (Category:any) =>{ 
    
    setShowupdate(true);
    setValue('name',Category.name)
  };
  
let deletecategory = async () =>{
  try {
    let response = await axios.delete(CATEGORIES_URLS.delete(catId),AuthorizedToken);
console.log(response);
toast.success("Category deleted successfully");
 getCategoriesList(1,2,"");
handleClose();
  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}


  let [categoriesList, setCategoriesList] =  useState([]);
  let getCategoriesList = async (pageNumber: number, pageSize: number, nameInput: string)=>{
    try {
      let response = await axios.get(CATEGORIES_URLS.getlist, {
        headers: { Authorization: `Bearer ${localStorage.token}` } ,
        params: {pageSize: pageSize, pageNumber: pageNumber, name: nameInput}
      });

           let newArray:any = Array(response.data.totalNumberOfPages).fill("",0,0).map((_, i) => i+1);
            setArrayOfPages(newArray);
            setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
   getCategoriesList(1,2,"");
  return () => {
  }
}, [])


let onSubmit = async (data:any)=>{
  try {
    let response = await axios.post(BASE_CATEGORIES, data, AuthorizedToken);
     console.log(response);
    toast.success('Category Added Successfully !');
    handleCloseAdd();
     getCategoriesList(1,2,"");
     setValue('name',null);
    } 
    catch (error:any) {
    toast.error(error.response.data.message);
    console.log(error);
    
  }
}

let updateCategory = async (data:object)=>{
  try {
    let response = await axios.put(BASE_CATEGORIES, data, AuthorizedToken);
     console.log(response);
    toast.success('Category updated Successfully !');
    handleCloseupdate();
     getCategoriesList(1,2,"");
     setValue('name',null);
    } 
    catch (error:any) {
    toast.error(error.response.data.message);
    console.log(error);
    
  }
}
const [nameValue, setNameValue] = useState("")
const getNameValue = (input:any) => {
setNameValue(input.target.value);
getCategoriesList(1,2,nameValue);
}
  return (
    <div className='container'>
    
   
    <div>
    <Header 
      title = {"Categories Items"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl = {categoriesbg}
    />
    </div>

<div className="title p-4 mt-2 d-flex justify-content-between align-items-center">
<div className="title-info">
      <h4 className="">Categories Table Details</h4>
      <span className="">You can check all details</span>
    </div>
<button onClick={handleShowAdd} className='btn btn-success'>Add New Category</button>
</div>


<div className="d-flex mt-2">
<input type='text' 
className='form-control' 
onChange={getNameValue} 
placeholder='search by name ...'/>
</div>

<div className= "p-2 d-flex justify-content-between">
{categoriesList.length > 0 ?  
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Creation Date</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
{categoriesList.map((category:any)=>(
  <tr key={category.id}>
    
    <td>{category.id}</td>
    <td>{category.name}</td>
    <td>{format(category.creationDate, 'MMMM d, yyyy')}</td>
    
    <td>
    <i  onClick={()=>handleShow(category.id)} className="fa-solid fa-trash text-danger"></i>
    <i onClick={()=>handleShowupdate(category)} className="fa-solid text-success ms-2 fa-pen-to-square"></i>
    </td>
  </tr>
))}

  </tbody>
</table>:<NoData/>} 
</div>

 <div className="d-flex justify-content-center">
 <nav aria-label="Page navigation example">
  <ul className="pagination">

    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    {arrayOfPages.map((pageNo:any)=>(

<li key={pageNo} onClick={() =>getCategoriesList(pageNo,2,"")} className="page-item">
  <a  className="page-link" href="#">
    {pageNo}
    </a>
  </li>
    ))}

    <li className="page-item"><a className="page-link" href="#">Next</a></li>
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
          <DeleteConfirmation deleteItem={'Category'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deletecategory} variant='btn btn-outline-danger'>Delete this Category</Button>
        </Modal.Footer>
      </Modal>


      
      
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h4>Add Category</h4>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="form-control" placeholder="Category Name"
                  aria-label="name" aria-describedby="basic-addon1"
                  {...register("name")}
             />
              
          <Button className='mt-4' type='submit' disabled={isSubmitting} 
          variant='btn btn-outline-danger'>Add Category</Button>  
            </form>
        </Modal.Body>
      
      </Modal>
  

      <Modal
        show={showupdate}
        onHide={handleCloseupdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h4>update Category</h4>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="form-control" placeholder="Category Name"
                  aria-label="name" aria-describedby="basic-addon1"
                  {...register("name")}
             />
              
          <Button onClick={updateCategory} className='mt-4' type='submit' disabled={isSubmitting} 
          variant='btn btn-outline-danger'>update Category</Button>  
            </form>
        </Modal.Body>
      
      </Modal>



    </div>
  )
}
