
import {  useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { toast } from 'react-toastify'
import { useState } from 'react'
import {
   ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon 
  } from '@heroicons/react/24/outline'

  import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'


import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/react'




export default function Header() {
    
   const navigate = useNavigate()

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   const { accessToken } = useContext(UserContext)

   const {userLogoutHandler} = useContext(UserContext)


   const onLogout = () => {
      try {
        userLogoutHandler() // update local storage state
        toast('Logout successfull', { type: 'success' })
        navigate('/posts')
      } catch (error) {
        toast(error.message, { type: 'error' })
      }
      


    
      

   }


    return (
        <header className="bg-white">
          <nav aria-label="Global" className="border-b border-gray-200 bg-white mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Tech Devices Forum</span>
                <img
                  alt="navigation-logo"
                  src="https://img.freepik.com/premium-photo/digital-circle-circuit-background-png-futuristic-technology_53876-1028190.jpg?ga=GA1.1.1864229510.1743587987&semt=ais_hybrid"
                  className="h-15 w-auto rounded-full"
                />
              </Link>
            </div>
            <div className="flex lg:hidden">
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                      >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
             
              <Link to="/posts" className="text-sm/6 hover:text-teal-200 transition-colors duration-300 text-[18px]">
                All Posts
              </Link>
             
              
            
            { accessToken
                  ?
                  (
              <div className="flex ml-8 gap-x-4">
                
                <Link to="/create" className="text-sm/6  hover:text-teal-200 transition-colors duration-300 text-[18px]">
                    Create Post
                </Link>
                <Link to="/admin" className="text-sm/6 hover:text-teal-200 transition-colors duration-300 text-[18px]">
                Admin
              </Link>
              <Link id='logout' onClick={onLogout} className="text-sm/6 hover:text-teal-200 transition-colors duration-300 text-[18px]">
                  Log out
                </Link>
              </div>
                  )
                  :
                  (
              <div className="flex ml-8 mr-6 gap-x-4">
                <Link to="/login" className="text-sm/6 hover:text-teal-200 transition-colors duration-300 text-[18px]">
                  Log in
                </Link>
                <br />
                <Link to="/register" className="text-sm/6 hover:text-teal-200 transition-colors duration-300 text-[18px]">
                  Register
                </Link>
              </div>
                  )
            

            }
            </PopoverGroup>
          </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://img.freepik.com/premium-photo/digital-circle-circuit-background-png-futuristic-technology_53876-1028190.jpg?ga=GA1.1.1864229510.1743587987&semt=ais_hybrid"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">

                  <Link to="/posts" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    All Posts
                  </Link>
                  <hr className='my-2 border-gray-200'/>
                  {accessToken
                    ?
                    (
                      <div>
                        <Link to="/admin" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Admin
                        </Link>
                        <Link to="/create" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Create Post
                        </Link>
                        <Link id='logout' onClick={onLogout} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Log out
                        </Link>
                        
                        
                      </div>
                    )
                    :
                    (
                      <div>
                        <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Log in 
                        </Link>
                        
                        <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Register 
                        </Link>
                      </div>
                    )


                  }
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>

          
        </header>
      )
    }
  