import React from 'react'
import notFound from "./../assets/notFound.png"

const NotFound = () => {
  return (
    <div className='notFound-container-wrapper'>
    <div className='notFound-container'>
      <img src={notFound} alt="this page is not aviliable in our server" />
    </div>
    </div>
  )
}

export default NotFound
