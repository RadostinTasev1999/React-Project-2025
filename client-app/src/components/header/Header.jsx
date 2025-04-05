
import {  useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


import {
  PopoverGroup
} from '@headlessui/react'




export default function Header() {
    
   const navigate = useNavigate()

   const { accessToken } = useContext(UserContext)

   const {userLogoutHandler} = useContext(UserContext)


   const onLogout = () => {
    
      userLogoutHandler()

      navigate('/')

   }


    return (
        <header className="bg-white">
          <nav aria-label="Global" className=" mx-auto flex w-full items-center justify-between p-4 lg:px-8 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 border-b-4 border-teal-500 shadow-lg">
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
              <Link to="/posts" className="text-sm font-semibold hover:text-teal-200 transition-all">
                All Posts
              </Link>
              
            </PopoverGroup>
            { accessToken
                  ?
                  (
              <div className="hidden lg:flex ml-8 lg:gap-x-4">
                <Link onClick={onLogout} className="text-sm font-semibold hover:text-teal-200 transition-all">
                  Log out
                </Link>
                <Link to="/create" className="text-sm font-semibold hover:text-teal-200 transition-all">
                    Create Post
                </Link>
                <Link to="/admin" className="text-sm font-semibold hover:text-teal-200 transition-all">
                Admin
              </Link>
              </div>
                  )
                  :
                  (
              <div className="hidden lg:flex ml-8 mr-6 lg:gap-x-4">
                <Link to="/login" className="text-sm font-semibold hover:text-teal-200 transition-all">
                  Log in
                </Link>
                <br />
                <Link to="/register" className="text-sm font-semibold hover:text-teal-200 transition-all">
                  Register
                </Link>
              </div>
                  )
            

            }
          </nav>
          
        </header>
      )
    }
  