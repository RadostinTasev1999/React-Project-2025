import { Link } from "react-router"
import { Button } from "@mui/material"
import { useId } from 'react' 
import images from '../../resources/images/images'

  export default function Home() {

    const _id = useId()
// ! React Hook for generating unique IDs that can be passed to accessibility attributes.

    const {imageUrlList} = images;

    const imageList = imageUrlList()

   

    const products = [ 
      {name: 'Headsets', id: _id, imagePath: imageList.headsets.url},
      {name: 'Speakerphones', id: _id, imagePath: imageList.speakerphone.url},
      {name: 'Control Panels', id: _id, imagePath: imageList.tablet.url},
      {name: 'Collaboration Devices', id: _id, imagePath: imageList.deskphone.url},

    ]

   

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex-column gap-16">
       
          <div className="mx-auto max-w-10xl lg:mx-0 ">
            <h2 className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 sm:text-5xl italic shadow-lg p-6 rounded-lg text-center max-w-3xl mx-auto">Where Tech Minds Meet and Grow</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 text-center">Community space for sharing user experience.</p>
            <div className="image">
          <img src="https://devicescatalogimages.teams.cdn.office.net/deviceimagesprod/11168/PolyG7500-en-us-20230113T183010-4.png" alt="" />
          </div>
            <article className="flex flex-col md:flex-row h-screen md:justify-between mt-6">
              <div className="flex-1 overflow-auto p-4">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 mt-8 tracking-wide"><b>Topic Categories</b></h2>
                <br />
              <ul role="list" className="divide-y divide-gray-100">
                {
                  products.map((product) => {
                   
                   return  (
                     <li  className="flex justify-between gap-x-6 py-5 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out">
                       <div key={product._id} className="flex min-w-0 gap-x-4">
                         <img alt="" src={product.imagePath.toString()} className="w-16 h-16 flex-none rounded-full bg-gray-50 shadow-lg" />
                         <div className="min-w-0 flex-auto">
                           <p className="text-lg font-semibold text-gray-900">{product.name}</p>
                         </div>
                         <br/>
                       </div>
                       
                     </li>
                  )
                  
                  })
                }
                </ul>
                
              </div>
          </article>
          
          </div>
          
          
           <br/>
          
        </div>
        
      </div>
    )
  }
  