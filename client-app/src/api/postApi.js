import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"


const baseUrl = 'http://localhost:3030/data/posts'

export const usePosts = () => {

    const {request} = useAuth()
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

        const editPost =  request.put(`${baseUrl}/${postId}`,formData)

        return editPost
    }

    return {
        edit
    }
}

export const useCreatePost = () => {

    const {request} = useAuth();

    const create = async(postData) => {
       
       const fetchPost = await request.post(baseUrl,postData)

       return fetchPost
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