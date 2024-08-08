import React from 'react'

import nodata from '../../../../assets/imgs/nodata.png'



export default function NoData() {
  return (
    <div className='text-center'>
    <img className='noDataImg' src={nodata}/>
    <h5 className=''>No Data !</h5>
    <span className="text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</span>
    </div>
  )
}
