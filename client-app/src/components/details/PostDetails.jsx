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

import { v4 as uuid } from "uuid"

export default function PostDetails(){
    
    const {postId} = useParams()
    const { post } = usePost(postId)
    const { isAuthenticated } = useAuth()
    const { userId } = useAuth()
    const { deletePost } = useDeletePost()
    const { create } = useCreateComments()

    const {comments,addComment} = useComments(postId)
    
    console.log('Comments are:', comments)
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
      const { username, comment } = Object.fromEntries(formData)      
     
      // create payload object
      const payload = {
        username,
        comment
      }

      // create optimisticComment object and push the username and comment from the formData
      const newOptimisticComment = {
        postId,
        _id: uuid(),
        username,
        comment,
        pending: true
      }

      // modify optimisticComment state by copying the current state and adding the newOptimisticComment property into the state
      setOptimisticComments(newOptimisticComment)
      

      try {

        // invoke create method, which calls the request.post() method to send a post request to the server.

        const createdComment = await create(payload,postId)



        addComment(createdComment)

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
        <div className="overflow-hidden w-[85%] m-auto bg-white py-24 sm:py-32">
          <div className="bg-white shadow-lg pt-12 pb-12 rounded-lg border-1">
            <div className="mx-auto max-w-7xl px-6 ml-26 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-56 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                <div className="lg:pt-4 lg:pr-8">
                  <div className="lg:max-w-lg">
                    {/* <h2 className="text-base/7 font-semibold text-indigo-600">{email}</h2> */}
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                      {post.title}
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                      {post.description}
                    </p>

                  </div>
                </div>
                <img
                  alt="Product screenshot"
                  src={post.image}

                  className="w-[14rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[28.5rem] md:-ml-4 lg:-ml-0"
                />
              </div>
            </div>
            {
              isOwner ? (
                <div className="ml-30 mt-16 flex gap-4 justify-start">
                  <Link to={`/posts/${postId}/edit`} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Edit
                  </Link>
                  <Link onClick={onDelete} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Delete
                  </Link>
                </div>
              ) : null
            }
          </div>
          <CommentsShow comments={optimisticComments}/>
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