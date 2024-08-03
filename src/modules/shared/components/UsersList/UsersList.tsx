import React from 'react'
import usersListbg from '../../../../assets/imgs/Group48102127.png'
import Header from '../../../shared/components/Header/Header'

export default function UsersList() {
  return (
    <div>
    <Header 
      title = {"Users List"}
      discribtion = {"You can now add your items that any user can order it from the Application and you can edit"}
      imgurl = {usersListbg}
    />
    UsersList
    </div>
  )
}
