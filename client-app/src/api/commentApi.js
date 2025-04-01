import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"

const baseUrl = 'http://localhost:3030/data/comments'

export const useCreateComments = () => {

    const { request } = useAuth();

    const create = (payload) => {

        const commentData = {
            ...payload
        }

        console.log('Comment data is:',commentData)

        const newComment = request.post(baseUrl,commentData)

        return newComment

    }

    return {
        create
    }


}
// create useComment hook
export const useComments = (postId) => {
    const { request } = useAuth();

    const [comments, setComments] = useState({})

    useEffect(() => {
        
        const searchParams = new URLSearchParams({
            where: `postId="${postId}"`
        })

        console.log("Search params are:", searchParams.toString())
        /*
        URLSearchParams - defines utility methods to work with the query string of a URL.

        */
        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then((result) => setComments(result))
    },[postId,request])

    return {
        comments
    }

    /*
    where=%7B%22postId%22%3A%22859e8be3-e7cf-4c76-9e36-86f57610653a%22%7D&load=author%3D_ownerId%3A+users
    */
        

}

// edit comment

export const useEditComment = () => {

    const {request} = useAuth()

    const edit = (commentId,payload) => {

        const editComment = request.patch(`${baseUrl}/${commentId}`,payload)

        return editComment
    }

    return {
        edit
    }
}

// delete comment

export const useDeleteComment = () => {
    const { request } = useAuth();

    const deleteComment = (commentId) => {

        const requestDelete = request.delete(`${baseUrl}/${commentId}`)
          
        return requestDelete
    }

    return {
        deleteComment
    }

}


// To fix:
export const useComment = () => {
    const { request } = useAuth()

    const [postComment,setPostComment] = useState({})

    const getComment = (commentId) => {

        useEffect(() => {
            request.get(`${baseUrl}/${commentId}`)
                 .then((result) => setPostComment(result))
        },[commentId,request])
            
        return postComment
    }

    return {
        getComment
    }

}