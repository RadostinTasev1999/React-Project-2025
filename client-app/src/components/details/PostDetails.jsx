import { useParams } from "react-router"
import { usePost } from "../../api/postApi"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router"
import { useNavigate } from "react-router"
import { useDeletePost } from "../../api/postApi"
import CommentsShow from "../comments-show/CommentsShow"
import CommentsCreate from "../comments-create/CreateComment"
import { useCreateComments } from "../../api/commentApi"

export default function PostDetails(){
    
    const {postId} = useParams()

    const { post } = usePost(postId)
    // http://localhost:3030/data/posts/0ac05014-08cc-4635-867a-cd87f28549be
    const { email } = useAuth()
    const { userId } = useAuth()
    const { deletePost } = useDeletePost()
    const { create } = useCreateComments()
    const navigate = useNavigate()


    //console.log('Post is:',post)

    const isOwner = userId === post._ownerId

    const onDelete = async() => {
       // event.preventDefault()
        console.log('We are here')
        await deletePost(postId)

        console.log('Post successfully deleted!')

        navigate('/posts')

        
    }

    const onCreateComment = async(event) => {

        event.preventDefault();

        const formData = new FormData(event.target)
            console.log('Test')
        const { username, comment } = Object.fromEntries(formData)

        const postComment = await create({username,comment},postId)

        console.log('Posted Comment:', postComment)

      
        
    }

    return (
        <>
         <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-56 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">{email}</h2>
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
     <CommentsCreate
        onCreate={onCreateComment}
     />
      <CommentsShow />
        </div>
        </>
    )
}