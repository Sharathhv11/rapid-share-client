import React from 'react'
import notDev from "./../assets/notDev.png"

const NotFound = ({text}) => {
  return (
    <div className='notFound-container-wrapper'>
    <div className='notFound-container'>
      <img src={notDev} alt="this page is not aviliable in our server" />
      <p>{text}</p>
    </div>
    </div>
  )
}

export default NotFound