import { useLikePost, usePosts } from "../../api/postApi"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import CatalogItem from "./catalog-item/CatalogItem"

export default function Catalog({
    heading="Latest posts"
}) {

    const { posts } = usePosts() 
    const { userId } = useAuth()
    const { likePost } = useLikePost()

    const postIds = posts.map(el => el._id)

    /*
        ['379f35d1-96e8-4eb9-8d5f-5758a745853d', '39cd56f3-ac50-40a2-a5cd-eabba6ee559b']
    */

    console.log('PostIDs are:', postIds)

    // think about how to conditionally render Like button so that post owners cannot see it
    // think about how to get all likes for the post and render the total count of likes for the post


    const toggleLike = async (postId) => {
        console.log(`Post with ID: ${postId} liked!`)
        //const [liked,setLiked] = useState(false)

        try {
            
            await likePost(postId,userId)

            // setLiked(true)

        } catch (error) {
            throw new Error(error)
        }
        
        /*
        Create a new document in the likes collection:
        {
            "_ownerId": "f4c03b5e-3008-4e36-94ea-365bff614b05",
            "postId": "379f35d1-96e8-4eb9-8d5f-5758a745853d",
            "_createdOn": 1773494295917,
            "_id": "6dd9d2dd-8130-4290-af66-9b71963a9011"
        }
        */
       // After user hits like button, hide the button
        

    }

    

    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 data-testid="heading" className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 sm:text-5xl italic shadow-lg p-6 rounded-lg text-center max-w-3xl mx-auto">{heading}</h2>
                        <p className="mt-4 text-lg text-gray-700 sm:text-xl italic tracking-tight leading-relaxed max-w-3xl mx-auto">Learn the latest product feedback and features from the community hub.</p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <CatalogItem toggleLike={toggleLike} key={post._id} post={post}/>

                        ))}
                    </div>
                </div>
            </div>
        </>
)
}