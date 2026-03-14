import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"


const baseUrl = 'https://server-react-project-2025.onrender.com/data/posts'
const likesUrl = 'https://server-react-project-2025.onrender.com/data/likes'

export const usePosts = () => {

    const { request } = useAuth()
    
    const [posts,setPosts] = useState([]);

    useEffect(() => {

        request.get(baseUrl)
            .then((posts) => setPosts(posts))

    },[request])

    return {
        posts
    }

}

export const usePost = (postId) => {

    const {request} = useAuth()

    const [post,setPost] = useState({})

    useEffect(() => {

        request.get(`${baseUrl}/${postId}`)
            .then((response) => setPost(response))
        
    },[postId,request])
   

        return {
            post
        }

}

export const useEditPost = () => {
    
    const {request} = useAuth();

    const edit = (formData,postId) => {

    request.put(`${baseUrl}/${postId}`,formData)

        
    }

    return {
        edit
    }
}

export const useCreatePost = () => {

    const {request} = useAuth();

    const create = async(postData) => {
       
    await request.post(baseUrl,postData)

    
    };

    return {
        create
    }

}

export const useDeletePost = () => {

    const { request } = useAuth();

    const deletePost = async(postId) => 

    await request.delete(`${baseUrl}/${postId}`);
    
    return {
        deletePost
    }

}

export const useLikePost = () => {

    const { request } = useAuth();

    const likePost = async (postId,userId) => {
       
        await request.post(likesUrl, {
            "postId": postId
            
        })

        /*
        Recommended approach for back-end
            - store likes in a separate collection '/data/likes' with documents like { "postId": <postId>, "ownerId": <userId>}
            POST http://localhost:3030/data/likes to like a post.
            DELETE http://localhost:3030/data/likes/:likeId to unlike.
            GET /data/likes?where=postId%3D%22${postId}%22 to count likes or see who liked it
        */
    }

    return {
        likePost
    }
}

export const useGetPostsLikes = (postId) => {
    // postId: "379f35d1-96e8-4eb9-8d5f-5758a745853d"

    const { request } = useAuth()

    const [likes,setLikes] = useState([]);

    useEffect(() => {
         request.get(likesUrl)
            .then((response) => setLikes(response.filter((el) => el.postId === postId)))
    },[postId])

    return {
        likes
    }

}

export const useCheckIfLiked = (postId, userId) => {

    const { request } = useAuth()

    const [isLiked,setIsLiked] = useState(false)

    useEffect(() => {
        request.get(likesUrl)
            .then((response) => {

                const likedPosts = response.filter((el) => el.postId === postId && el._ownerId === userId)

                if (likedPosts.length > 0) {
                    setIsLiked(true)
                }
            })
    }, [postId,userId])

    return {
        isLiked
    }

}

/*
    Example post structure with likes:

        {
    "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "title": "Test title",
    "image": "Test ImageURL",
    "description": "Test description",
    "_createdOn": 1773411137589,
    "_id": "24abd1b9-22ab-4099-8673-6a52550e904c",
    "likesList": [
        {_id: '688deea61f7fa86a0122099c'}
    ]
  }
*/