import React, { useContext } from 'react'
import { AuthContext } from '../../../Authnotication/components/context/AuthContext'
import profileimg from '../../../../assets/imgs/Ellipse235.png'


export default function NavBar() {
  let { loginData } = useContext(AuthContext);

  return (
    <div className="navbarcontainer">
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse d-flex  justify-content-end  navbar-collapse" id="navbarSupportedContent">
  
      <ul className="navbar-nav  mb-2 mb-lg-0">
        <li className="nav-item">
        <img className='me-3' src={profileimg}/>
        </li>
        <li className="nav-item me-5">
        <span className=''>{loginData?.userName}</span>
        </li>
        <li className="nav-item  me-5 dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" 
              data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-file-circle-exclamation"></i>
              </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
  )
}
