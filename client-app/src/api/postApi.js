import { useEffect,useState } from "react";
import useAuth from "../hooks/useAuth"


const baseUrl = 'https://server-react-project-2025.onrender.com/data/posts'

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