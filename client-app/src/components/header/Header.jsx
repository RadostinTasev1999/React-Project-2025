
import {  useContext, useState } from 'react'
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

const products = [
    { name: 'Headsets', to: '/headsets', icon: SpeakerWaveIcon },
    { name: 'Teams panels', to: '/panels', icon: DeviceTabletIcon },
    { name: 'Speakerphones', to: '/speakerphones', icon: SpeakerWaveIcon },
    { name: 'Desk phones', to: '/desk-phones', icon: PhoneIcon },
    { name: 'Teams Rooms', to: '/teams-rooms', icon: DeviceTabletIcon },
  ]
  const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
  ]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    const navigate = useNavigate()
    //const { accessToken,...authData } = useContext(UserContext)

    const { accessToken, ...authData } = useContext(UserContext)

    console.log('Access token is:', accessToken)
    //console.log('AuthData is:', ...authData)

   const {userLogoutHandler} = useContext(UserContext)


   const onLogout = () => {
      userLogoutHandler()

      navigate('/')

   }


    return (
        <header className="bg-white">
          <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
              <Link to={products.to} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://redmondmag.com/-/media/ECG/redmondmag/Images/introimages/1211red_teamslogo.jpg"
                  className="h-8 w-auto"
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
              <Link to="/posts" className="text-sm/6 font-semibold text-gray-900">
                All Posts
              </Link>
              <Link to="/about" className="text-sm/6 font-semibold text-gray-900">
                About
              </Link>
            </PopoverGroup>
            { accessToken
                  ?
                  (
              <div className="hidden lg:flex ml-8 lg:gap-x-4">
                <Link to="/logout" onClick={onLogout} className="text-sm/6 font-semibold text-blue-500">
                  Log out
                </Link>
                <Link to="/create" className="text-sm/6 font-semibold text-blue-500">
                    Create Post
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
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://redmondmag.com/-/media/ECG/redmondmag/Images/introimages/1211red_teamslogo.jpg"
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
                    <Disclosure as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  </div>   
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>
      )
    }
  