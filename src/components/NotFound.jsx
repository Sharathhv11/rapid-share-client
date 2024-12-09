import React,{useEffect} from 'react'
import notFound from "./../assets/notFound.png"

const NotFound = () => {
    useEffect(() => {
        document.title = "404 not found"
      })
  return (
    <div className='notFound-container-wrapper'>
    <div className='notFound-container'>
      <img src={notFound} alt="this page is not aviliable in our server" />
    </div>
    </div>
  )
}

export default NotFound
