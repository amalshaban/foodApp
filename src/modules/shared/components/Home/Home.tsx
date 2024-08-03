import React from 'react'
import Header from '../Header/Header'
import headerbg from "../../../../assets/imgs/Group48102098.png"

export default function Home() {
  return (
    <div>
      <Header 
        title = {"welcome upskilling!"}
        discribtion = {"This is a welcoming screen for the entry of the application , you can now see the options"}
        imgurl = {headerbg}
      />
      Home
      </div>
  )
}
