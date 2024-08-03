import React from 'react'
export default function Header({title, discribtion , imgurl}) {
  return (
    <div className="container-fluid headerbg width-75 p-5">
      <div className="row">
        <div className="col-md-6 align-items-center">
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
  )
}
