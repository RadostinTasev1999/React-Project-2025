
import {  useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { toast } from 'react-toastify'

import {
  PopoverGroup
} from '@headlessui/react'




export default function Header() {
    
   const navigate = useNavigate()

   const { accessToken } = useContext(UserContext)

   const {userLogoutHandler} = useContext(UserContext)


   const onLogout = () => {
      try {
        userLogoutHandler()
        toast('Logout successfull', { type: 'success' })
        navigate('/')
      } catch (error) {
        toast(error.message, { type: 'error' })
      }
      


    
      

   }


    return (
        <header className="bg-white">
          <nav aria-label="Global" className=" mx-auto flex w-full items-center justify-between p-3 lg:px-8 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 border-b-4 border-teal-500">
            <div className="flex lg:flex-1 ml-2">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Teams Devices Forum</span>
                <img
                  alt=""
                  src="https://img.freepik.com/premium-photo/digital-circle-circuit-background-png-futuristic-technology_53876-1028190.jpg?ga=GA1.1.1864229510.1743587987&semt=ais_hybrid"
                  className="h-15 w-auto rounded-full"
                />
              </Link>
            </div>
            
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Link to="/posts" className="text-white hover:text-teal-200 transition-colors duration-300 text-[21px]">
                All Posts
              </Link>
              
            </PopoverGroup>
            { accessToken
                  ?
                  (
              <div className="hidden lg:flex ml-8 lg:gap-x-4">
                <Link onClick={onLogout} className="text-white hover:text-teal-200 transition-colors duration-300 text-[21px]">
                  Log out
                </Link>
                <Link to="/create" className="text-white hover:text-teal-200 transition-colors duration-300 text-[21px]">
                    Create Post
                </Link>
                <Link to="/admin" className="text-white hover:text-teal-200 transition-colors duration-300 text-[21px]">
                Admin
              </Link>
              </div>
                  )
                  :
                  (
              <div className="hidden lg:flex ml-8 mr-6 lg:gap-x-4">
                <Link to="/login" className="text-white hover:text-teal-200 transition-colors duration-300 text-[21px]">
                  Log in
                </Link>
                <br />
                <Link to="/register" className="text-white hover:text-teal-200 transition-colors duration-300 text-[21px]">
                  Register
                </Link>
              </div>
                  )
            

            }
          </nav>
          
        </header>
      )
    }
  