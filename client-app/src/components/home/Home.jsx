import { Link } from "react-router"
import { Button } from "@mui/material"
import { useId } from 'react'

  export default function Home() {

    const _id = useId()
// ! React Hook for generating unique IDs that can be passed to accessibility attributes.

    const products = [
      { name: 'Headsets',  id: _id, to: '/headsets',imageUrl: 'data:image/jpeg;base64,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'},
      { name: 'Teams panels', id: _id, to: '/panels',imageUrl: 'https://blog.webex.com/wp-content/uploads/2024/11/room-nva-teams-version-two.jpg'},
      { name: 'Speakerphones',  id: _id, to: '/speakerphones',imageUrl: 'https://www.yealink.com/website-service/attachment/product/image/20220422/202204220610548508415beae41a4a6717cfaa6a892e4.png'},
      { name: 'Desk phones',  to: '/desk-phones', imageUrl:'https://www.yealink.com/website-service/attachment/product/image/20220414/20220414124315871e109ac5f4f8c81b196bbcf67380f.png' },
      { name: 'Teams Rooms',  id: _id, to: '/teams-rooms',imageUrl: 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MjQ1MDE4fGltYWdlL3BuZ3xoODgvaGEzLzExMDQxMzA4ODY4NjM4LnBuZ3w4YjYxNjAwYzY4ZjdlNzEwOWM3OGNhMDFiMTc2MDgwYmNmNDk3ODAzNTVjN2QwZTlkNDAwNjRjOTkxZjczYTVk/lenovo-device-thinksmart-hub-for-teams-subseries-hero.png' },
    ]

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Microsoft Teams Rooms Forum</h2>
            <p className="mt-2 text-lg/8 text-gray-600">Community space for sharing user experience.</p>
          </div>
          <div className="image">
            
                <img src="https://static.wixstatic.com/media/9a8191_9e9a1948c13447ffb888f243532f6b2f~mv2.png/v1/crop/x_0,y_2,w_551,h_176/fill/w_400,h_126,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Teams%2BLogo.png" alt="" />
           
          </div>
           <br/>
          <article className="flex flex-col md:flex-row h-screen md:justify-between">
              <div className="flex-1 overflow-auto p-4">
                <h2><b>Categories</b></h2>
                <br />
              <ul role="list" className="divide-y divide-gray-100">
                {
                  products.map((product) => {
                   
                   return  (
                     <li  className="flex justify-between gap-x-6 py-5">
                       <div key={product._id} className="flex min-w-0 gap-x-4">
                         <img alt="" src={product.imageUrl} className="size-16 flex-none rounded-full bg-gray-50" />
                         <div className="min-w-0 flex-auto">
                           <p className="text-sm/6 font-semibold text-gray-900">{product.name}</p>
                         </div>
                         <br/>
                       </div>
                       
                     </li>
                  )
                  
                  })
                }
                </ul>
                
              </div>
              <div className=" p-2 md:w-[65%]">
               <img className="border-4 border-blue-200" src="https://www.pureav.co.uk/application/files/5016/6739/7029/pz-cussons-01a.jpg" alt="" />
              </div>
          </article>
          

        </div>
      </div>
    )
  }
  