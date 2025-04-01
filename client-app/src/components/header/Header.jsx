
import {  useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'

//import useAuth from '../../hooks/useAuth'


import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'


import { ChevronDownIcon, PhoneIcon, PlayCircleIcon,DeviceTabletIcon,SpeakerWaveIcon } from '@heroicons/react/20/solid'
//import { UserContext } from '../../contexts/UserContext'



export default function Header() {
    
    
    const navigate = useNavigate()
    //const { accessToken,...accessToken } = useContext(UserContext)

    const { accessToken } = useContext(UserContext)

   



    console.log('Access token is:', accessToken)
    //console.log('accessToken is:', ...accessToken)

   const {userLogoutHandler} = useContext(UserContext)


   const onLogout = () => {
      userLogoutHandler()

      navigate('/')

   }


    return (
        <header className="bg-white">
          <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Teams Devices Forum</span>
                <img
                  alt=""
                  src="https://redmondmag.com/-/media/ECG/redmondmag/Images/introimages/1211red_teamslogo.jpg"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Link to="/posts" className="text-sm/6 font-semibold text-blue-500">
                All Posts
              </Link>
              
            </PopoverGroup>
            { accessToken
                  ?
                  (
              <div className="hidden lg:flex ml-8 lg:gap-x-4">
                <Link onClick={onLogout} className="text-sm/6 font-semibold text-blue-500">
                  Log out
                </Link>
                <Link to="/create" className="text-sm/6 font-semibold text-blue-500">
                    Create Post
                </Link>
                <Link to="/admin" className="text-sm/6 font-semibold text-blue-500">
                Admin
              </Link>
              </div>
                  )
                  :
                  (
              <div className="hidden lg:flex ml-8 lg:gap-x-4">
                <Link to="/login" className="text-sm/6 font-semibold text-blue-500">
                  Log in
                </Link>
                <br />
                <Link to="/register" className="text-sm/6 font-semibold text-blue-500">
                  Register
                </Link>
              </div>
                  )
            

            }
          </nav>
          
        </header>
      )
    }
  