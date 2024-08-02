import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/imgs/3.png'

export default function SideBar() {

  let [ isCollapsed , setIsCollapsed] = useState(false);
  let toggle =()=>{
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className='sidebarcontainer'>
    <Sidebar collapsed={isCollapsed}>
  <Menu>
    
    <MenuItem className='firstchild my-2 w-75 m-auto' onClick={toggle} icon={<img src={logo}/>}></MenuItem>
    <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard/home" />}> Home</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/userslist" />}> Users</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-bowl-food"></i>} component={<Link to="/dashboard/recipieslist" />}> Recipies</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="/dashboard/categories" />}> Categories</MenuItem>
    
    <MenuItem> Logout</MenuItem>
  </Menu>
</Sidebar>
</div>
  )
}
