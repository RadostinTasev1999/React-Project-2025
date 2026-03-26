import { useEffect, useState, useReducer } from "react";
import useAuth from "../hooks/useAuth"
import { v4 as uuid } from 'uuid';

const baseUrl = 'http://localhost:3030/data/comments'
const commentReactionsUrl = 'http://localhost:3030/data/commentReactions'

// reducer function,specifies how the state gets updated
// action is the passed property to the reduce function

//{ type: 'GET_ALL', payload: result}

// { type: 'GET_ALL', payload: result}

// { type:'ADD_COMMENT', payload: commentData}
// { type: 'GET_ALL', payload: result}
function commentsReducer(state,action){
    
    switch(action.type) {
        case 'GET_ALL':
            return action.payload;;
        case 'ADD_COMMENT':
            return [...state,action.payload] // logic by which the state will be updated
        
        default:
            return state;
    }
};
/*
{ type:'ADD_COMMENT', payload: commentData}
*/

export const useCreateComments = () => {

    const { request } = useAuth(); //  custom React hook
    const { userId, email } = useAuth()

    const create = (data,postId) => {

        const payload = {
            _id:uuid(),
            comment: data.comment,
            _ownerId:userId,
            postId,
            username:data.username,
            author:{
                email
            }
        }

        const commentData = { 
            ...payload
        }

        console.log('Comment data is:', commentData)

       const response =  request.post(baseUrl,commentData)

       return response

    }

    return {
        create
    }


}

export const useComments = (postId) => {

    const { request } = useAuth();
    const { accessToken } = useAuth()
    // const { userId } = useAuth()
    const [comments, dispatch] = useReducer(commentsReducer,[])
   /*
    commentsReducer - The reducer function that specifies how the state gets updated.
    [] - initial state value / initialArg

    dispatch - function that lets you update the state to a different value and trigger a re-render.
   */


    // dispatch - function which triggers the reducer function

    useEffect(() => {
        
        const searchParams = new URLSearchParams({
            where: `postId="${postId}"`, // Only returns items where the postId fields equals the passed string ID
            load: `author=_ownerId:users`
             /*
            author - the name of the property you want to include in the result
            _ownerId - field in the comment (the user who made the comment)
            users - the name of the target collection/table that _ownerId references.
            
            */
        })

        /*
        
        */

            const options = {
                headers: {
                    'X-Authorization' : accessToken
                }
            }

        request.get(`${baseUrl}?${searchParams.toString()}`,null,options)
            .then((result) => dispatch({ type: 'GET_ALL', payload: result}))
            // You need to pass the action as the only argument to the dispatch function:
            // the result will be all the comments associated with post with ID postId.


    },[postId,accessToken, request])

    return {
        comments,
        addComment: (commentData) => dispatch({ type:'ADD_COMMENT', payload: commentData})
    }
    /*
    useComments will return a property which has a value callback function which accepts a param and invokes the dispatch method,
    and passes an action object, including type and payload properties.

    */

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

export const useCreateCommentLike = () => {

    const { request } = useAuth();

    const createLike = async(data) => {
        /*
        {
            commentId: commentId,
            postId: postId,
            userId: userId,
            type: "like"
        }
        */

        await request.post(commentReactionsUrl,data)

    }

    return {
        createLike
    }
}

export const useCreateCommentDislike = () => {

    const { request } = useAuth();

    const createDislike = async (data) => {

        await request.post(commentReactionsUrl,data)

    }

return {
    createDislike
}

}

export const useGetCommentLike = (postId,commentId,userId) => {
    
    const { request } = useAuth();

    const [hasLiked,setHasLiked] = useState(false)

        useEffect(() => {
            const searchParams  = new URLSearchParams({
                where: `postId=${postId} AND commentId=${commentId} AND userId=${userId}`
            })

             request.get(`${commentReactionsUrl}?${searchParams.toString()}`)
                    .then((response) => {
                        if (response.length > 0) {
                            setHasLiked(true)
                        }
                    })

        },[])

        

return {
    hasLiked
}
    

}

export const useGetCommentLikes = (postId, userId, counter = 0) => {

    const { request } = useAuth();

    const [userLikes, setUserLikes] = useState([]);

    useEffect(() => {

        if (!postId || !userId) {
            setUserLikes([]);
            return;
        }

        const searchParams = new URLSearchParams({
            where:`postId="${postId}" AND userId="${userId}" AND type="like"`
        })

        request.get(`${commentReactionsUrl}?${searchParams.toString()}`)
            .then((response) => setUserLikes(response))

    },[postId,userId,request,counter])

    return {
        userLikes
    }

}

export const useGetCommentDislikes = (postId,userId, counter = 0) => {

    const { request } = useAuth();

    const [userDislikes, setUserDislikes] = useState([]);

    useEffect(() => {

        const searchParams = new URLSearchParams({
            where:`postId="${postId}" AND userId="${userId}" AND type="dislike"`
        })

        request.get(`${commentReactionsUrl}?${searchParams.toString()}`)
            .then((response) => setUserDislikes(response))

    },[postId,userId,request, counter])

    return {
        userDislikes
    }

}

export const useGetTargetElement = () => {

    const { request } = useAuth();

    const getTargetLike = async (commentId, userId) => {

        

        const searchParams = new URLSearchParams({
            where:`commentId="${commentId}" AND userId="${userId}" AND type="like"`
        })

         const targetElement = await request.get(`${commentReactionsUrl}?${searchParams.toString()}`)

         if (targetElement.length > 0) {
            const _id = targetElement[0]._id

            return _id
         }else{
            return false
         }
        
    }   

    const getTargetDislike = async (commentId, userId) => {

        const searchParams = new URLSearchParams({
            where:`commentId="${commentId}" AND userId="${userId}" AND type="dislike"`
        })

        const targetElement = await request.get(`${commentReactionsUrl}?${searchParams.toString()}`)

        if (targetElement.length > 0) {

            const _id = targetElement[0]._id
            
            return _id          
        }else {
            return false
        }
    }

    return {
        getTargetLike,
        getTargetDislike
    }

}

export const useDeleteUserReaction = () => {

    const { request } = useAuth();

    const deleteLike = async (_id) => {
        
        await request.delete(`${commentReactionsUrl}/${_id}`)

    }

    const deleteDislike = async (_id) => {

        await request.delete(`${commentReactionsUrl}/${_id}`)

    }

return {
    deleteLike,
    deleteDislike
}

}