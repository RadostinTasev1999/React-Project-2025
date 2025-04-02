import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"

const baseUrl = 'http://localhost:3030/data/comments'


export const useCreateComments = () => {

    const { request } = useAuth();

    const create = (payload) => {

        const commentData = {
            ...payload
        }

         request.post(baseUrl,commentData)

    }

    return {
        create
    }


}

export const useComments = (postId) => {

    const { request } = useAuth();

    const [comments, setComments] = useState({})

    useEffect(() => {
        
        const searchParams = new URLSearchParams({
            where: `postId="${postId}"`
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then((result) => setComments(result))

    },[postId,request])

    return {
        comments
    }

}


export const useEditComment = () => {

    const { request } = useAuth()

    const edit = (commentId,payload) => {

        const editComment = request.patch(`${baseUrl}/${commentId}`,payload)

        return editComment
    }

    return {
        edit
    }
}


export const useDeleteComment = () => {

    const { request } = useAuth();

    const deleteComment = (commentId) => {

         request.delete(`${baseUrl}/${commentId}`)
      
    }

    return {
        deleteComment
    }

}


export const useComment = (commentId) => {

    const { request } = useAuth()

    const [postComment,setPostComment] = useState('')

    useEffect(() => {

         request.get(`${baseUrl}/${commentId}`)
            .then((result) => setPostComment(result))
      
    },[commentId,request])
  

    return {
        postComment
    }

}
