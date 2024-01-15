import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/UserContext'
import {useSpring, animated} from 'react-spring'
import { FaCamera } from "react-icons/fa6";
import ImageUploadForm from './ImageUploadForm';
import { usersContext } from '../context/UsersContext';


const Sidebar = () => {
  const [user, setUser] = useContext(userContext)
  const [users, setUsers] = useContext(usersContext)
  console.log('users: ',users)
  const [containerSprings, containerAPI] = useSpring(()=>({
    from:{
      y: -1000,
      x: window.innerWidth/4,
      opacity: 0
    }
  }))
  
  const handleImageClick = () => {
    containerAPI.start({
      to: {
        y: 50,
        opacity: 1
      }
    })
  }
  return (
    <>
    <div className='bg-[#222] text-white h-[100vh] w-[100%] flex items-center col-span-2'>
        <div className='w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded ml-8 overflow-y-scroll'>
          <div className='w-[100%] h-20 flex justify-start items-center'>
            <div className="group rounded-full w-16 h-16 m-5 bg-gray-600 cursor-pointer flex justify-center items-center bg-cover"
              style={user?.user.imgURL? {backgroundImage: `url(${user.user.imgURL})`} : {}}
            >
              <FaCamera className='group-hover:block hidden' onClick={handleImageClick} />
            </div>
            <div>
              <h4 className='text-2xl'>{user?.user.name}</h4>
              <h4 className='text-gray-200 cursor-pointer'>Edit</h4>
            </div>
          </div>
          <hr className='w-[90%] mx-auto my-4'/>
          {users?.map((activeUser)=>{
            return(
              <div className='w-[100%] h-20 flex justify-start items-center' key={activeUser?._id}>
                <div className="group rounded-full w-16 h-16 m-5 bg-gray-600 flex justify-center items-center"
                  style={activeUser?.img? {backgroundImage: activeUser.img} : {}}
                >
                </div>
                <div>
                  <h4 className='text-2xl'>{activeUser?.username}</h4>
                </div>
              </div>
            )
          })}
        </div>
    </div>
    <ImageUploadForm className='absolute w-[50vw] h-[90vh] bg-black flex justify-center items-center z-50 rounded' containerSprings={containerSprings} containerAPI={containerAPI}/>
    </>
  )
}

export default Sidebar