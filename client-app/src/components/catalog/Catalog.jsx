import { useLikePost, usePosts } from "../../api/postApi"
import useAuth from "../../hooks/useAuth"
import { useEffect, useId, useState } from "react"
import CatalogItem from "./catalog-item/CatalogItem"
import { useGetUserLikes, useGetPostsLikes } from "../../api/postApi"

export default function Catalog({
    heading="Latest posts"
}) {

    const { posts } = usePosts() 
    const { userId } = useAuth()
    const { likePost } = useLikePost()
    const { fetchUserLikes } = useGetUserLikes()
    const { likes } = useGetPostsLikes()
    
    const [likedPostsIds, setLikedPostsIds] = useState(new Set());
    const [likesRefreshKey, setLikesRefreshKey] = useState(0);

    const postIds = posts.map(el => el._id)

    useEffect(() => {

        if (!userId) {
            return;
        }

        fetchUserLikes(userId)
            .then(response => {
                console.log('Array consisting of likes which the logged user has done:', response)

                const mappedArray = response.map(like => like.postId)
                
                console.log("Mapped array is:", mappedArray)
                    setLikedPostsIds(new Set(mappedArray))     

            })
    
    },[userId])


    const toggleLike = async (postId) => {
        console.log(`Post with ID: ${postId} liked!`)

        try {
            
            await likePost(postId,userId)

            setLikedPostsIds(prev => new Set(prev).add(postId))

            setLikesRefreshKey((state) => state + 1);

        } catch (error) {
            throw new Error(error)
        }
        

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
                            <CatalogItem likesRefreshKey={likesRefreshKey} likedPostsIds={likedPostsIds} toggleLike={toggleLike} key={post._id} post={post}/>

                        ))}
                    </div>
                </div>
            </div>
        </>
)
}