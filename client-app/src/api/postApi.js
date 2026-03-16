import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"


const baseUrl = 'http://localhost:3030/data/posts'
const likesUrl = 'http://localhost:3030/data/likes'

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

    /*
        const payload = {
            title,
            image,
            description
        }
    */

    
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

export const useGetPostsLikes = (postId, refreshKey = 0) => {
    // postId: "379f35d1-96e8-4eb9-8d5f-5758a745853d"

    const { request } = useAuth()

    const [likes,setLikes] = useState([]);

    useEffect(() => {
         request.get(likesUrl)
            .then((response) => setLikes(response.filter((el) => el.postId === postId)))
    },[postId, refreshKey])

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

export const useGetUserLikes = () => {

    // example: GET /data/likes?where=_ownerId%3D%22{userId}%22
    

    const { request } = useAuth();
    // useAuth() is called during the initialization of useGetUserLikes
    const fetchUserLikes = (userId) => {

     // now we have access to request via closure
        console.log('UserID is:', userId)
     const searchParams = new URLSearchParams({
        where: `_ownerId="${userId}"`// only returns items where the _ownerId filed equals the passed userId string
    })
        
      return  request.get(`${likesUrl}?${searchParams.toString()}`)
      // GET request to endpoint `http://localhost:3030/data/likes?where: `_ownerId="${userId}"`
    }

    return {
        fetchUserLikes
    }
}

export const useDeletePostLike = () => {

    const { request } = useAuth();

    const deletePost = async (postId,userId) => {

        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}" AND postId="${postId}"`
        })

        const targetPost = await request.get(`${likesUrl}?${searchParams}`)

        console.log('Target post for deletion is:',targetPost )
        /*
            [
                {
                "_ownerId": "e9debca4-878d-4140-9f4f-84868148de33",
                "postId": "7d306467-25ea-4124-a4c2-50e80b76c63f",
                "_createdOn": 1773677956697,
                "_id": "69e45087-5cc9-4a10-a1e5-ad347ae33e80"
                }
            ]
        */
       const targetId = targetPost[0]._id
       
        request.delete(`${likesUrl}/${targetId}`)

    }

    return {
        deletePost
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