import React from 'react'
export default function Header({title, discribtion , imgurl}) {
  return (
    <div className=" headercontainer mx-auto">
    <div className="container headerbg px-4 py-1">
      <div className="row d-flex align-items-center">
        <div className="col-md-6">
          <h2>{title}</h2>
          <p>{discribtion}</p>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="img">
            <img src={imgurl}/>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
