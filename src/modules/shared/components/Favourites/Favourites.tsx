import React, { useEffect, useState } from 'react'
import { AuthorizedToken, IMG_URL, USER_RECIPIES_URLS } from '../../../../assets/CONSTANTS/END-POINTS';
import axios from 'axios';
import NoData from '../NoData/NoData';
import recipiesbg from '../../../../assets/imgs/Group48102127.png'
import Header from '../Header/Header';
import { toast } from 'react-toastify';

export default function Favourites() {
    const [favList, setFavList] = useState([]);
    

let getFavList =async()=>{
    try {
      let response = await axios.get(USER_RECIPIES_URLS.getlist,AuthorizedToken);
        
        console.log(response.data.data);
        setFavList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFavList();
  }, [])
  
  
let deletefavrecipie =async(id)=>{
    try {
      let response = await axios.delete(USER_RECIPIES_URLS.delete(id),AuthorizedToken);
        console.log(response);
        getFavList();
        toast.success("recipie was deleted from your favourites list")
    } catch (error) {
      console.log(error);
      toast.error("recipie was not deleted")
    }
  }
  return (
    <>
     <Header 
      title = {"Favourite Recipies"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edits"}
      imgurl = {recipiesbg}
    />

   

    {favList.length > 0 ?(
 <div className="container">
 <div className="row">
 {favList.map((fav)=>(

<div key={fav.id} className="col-md-4 mt-4">
    <div className="favimg">
    <img src={`${IMG_URL}${fav.recipe.imagePath}`} alt="" className=" img-fluid img-thumbnail figure-img" />
    </div>
         <h3>{fav.recipe.name}</h3>
         <p>{fav.recipe.description}</p>
         
         <button onClick={()=>deletefavrecipie(fav.id)} 
          className='btn btn-outline-danger'>
            delete recipie
          </button>
     </div>

))}
     
 </div>
</div>
    ):(
        <NoData/>
    )}
       
    </>
  )
}
