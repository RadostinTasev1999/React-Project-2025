import { useParams } from "react-router"
import { usePost } from "../../api/postApi"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { useDeletePost } from "../../api/postApi"
import CommentsShow from "../comments-show/CommentsShow"
import CommentsCreate from "../comments-create/CreateComment"
import { useCreateComments } from "../../api/commentApi"
import { useComments } from "../../api/commentApi"
import { useOptimistic } from "react" 
import { useState } from "react"

import { v4 as uuid } from "uuid"

export default function PostDetails(){
    
    const { postId } = useParams()
    const { post } = usePost(postId) //mocked
    const { isAuthenticated } = useAuth()
    const { userId, username } = useAuth() // mocked
    const { deletePost } = useDeletePost()
    const { create } = useCreateComments() // mocked

    const [key, setKey] = useState(0)
    const { comments,addComment } = useComments(postId, key)
    const [imageError, setImageError] = useState(false)
    
   
    console.log('Comments in PostDetals component are:', comments)
    /*
    we use object destructuring to declare the values of comments and addComment,
    returned by the custom hook useComments.
    */

    const [optimisticComments, setOptimisticComments] = useOptimistic(comments,(state, newComment) => [...state, newComment])
    /*
    React hook that lets you show a different state while an async action is underway.
    It accepts some state as an argument and returns a copy of that state.

    Params:
    state - the value to be returned initially and whenever no action is pending.
    updateFn - function that takes the current state and the optimistic value passed to 
    addOptimistic and returns the resulting optimistic state.

    */
  
    
    const navigate = useNavigate()

    const isOwner = userId === post._ownerId

    const onDelete = async() => {
     
        await deletePost(postId)

        navigate('/posts')

    }

    const onCreateComment = async(formData) => {
       // destructure form data
      const { comment } = Object.fromEntries(formData)      
     
      // create payload object
      const payload = {
        comment,
        username
      }

      // create optimisticComment object and push the username and comment from the formData
      const newOptimisticComment = {
        postId,
        _id: uuid(),
        comment,
        username,
        pending: true
      }

      // modify optimisticComment state by copying the current state and adding the newOptimisticComment property into the state
      setOptimisticComments(newOptimisticComment)
      

      try {

        // invoke create method, which calls the request.post() method to send a post request to the server.
        console.log('Payload in onCreateComment is:', payload)
        const createdComment = await create(payload,postId)

        //console.log('Created comment is:', createdComment)
        /*
        We send POST request to http://localhost:3030/data/comments with payload: 
        {
            _id: string;
            comment: any;
            _ownerId: string;
            postId: any;
            username: any;
            author: {
                email: string;
        };
        */


        addComment(createdComment) // add createdComment to current state 

        /*
        after addComment, comments is new, PostDetails re-renders, and useOptimistic runs again with that new comments as the base.
        */

        /*
        addComment - callback, which accepts paramenter and
        invokes the dispatch method of the react hook useReducer and passes
        an action object to the dispatch method as a parameter.

        */
      } catch (error) {
        throw new Error(error)
      }
      }



    return (
        <>
        <div className="max-w-3xl mx-auto py-10">
          <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
            {/* Card header: title + owner actions */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl leading-tight">
                {post.title}
              </h1>
              {isOwner && (
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    to={`/posts/${postId}/edit`}
                    aria-label="Edit post"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={onDelete}
                    aria-label="Delete post"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-sm"
                  >
                    Delete
                  </Link>
                </div>
              )}
            </div>

            <hr className="border-gray-100 mx-8" />

            {/* Card body: description + image */}
            <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <p className="text-gray-700 text-base leading-relaxed">
                {post.description}
              </p>
              <div className="rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center min-h-[160px]">
                {imageError ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-400 py-12 px-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">No image available</span>
                  </div>
                ) : (
                  <img
                    alt={post.title || "Post image"}
                    aria-label="product image"
                    src={post.image}
                    onError={() => setImageError(true)}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>
          <CommentsShow comments={optimisticComments} setKey={setKey}/>
          {
            isAuthenticated
              ?
              <CommentsCreate createHandler={onCreateComment} />
              :

              null
          }


        </div>
        </>
    )
}