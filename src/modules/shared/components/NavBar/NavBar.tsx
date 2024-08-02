import React, { useContext } from 'react'
import { AuthContext } from '../../../Authnotication/components/context/AuthContext'
import profileimg from '../../../../assets/imgs/Ellipse235.png'


export default function NavBar() {
  let { loginData } = useContext(AuthContext);

  return (
    <div className="navbarcontainer">
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <div className="row">
        <div className='col-md-6 '>
        <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
      <div className="col-md-6 d-inline">
            <img className='' src={profileimg}/>
            <span className=''>{loginData.userName}</span>
              <a className="nav-link dropdown-toggle" href="#" role="button" 
              data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-file-circle-exclamation"></i>
              </a>
      </div>
        </div>
       
      </div>
  
  </nav>
</div>
  )
}
