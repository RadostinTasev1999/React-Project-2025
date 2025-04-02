import { useParams } from "react-router"
import { useComments } from "../../api/commentApi"
import { formattedDate } from "../../utils/date"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router"
import { useDeleteComment } from "../../api/commentApi"


export default function CommentsShow(){

    const { postId } = useParams()
    const { userId } = useAuth()
    const { deleteComment } = useDeleteComment()
    

   const {comments} = useComments(postId)

   const onDelete = async(commentId) => {

    const confirmAlert = window.confirm('Are you sure you want to delete this comment?')

    if (confirmAlert) {
        deleteComment(commentId)
        window.location.reload()

        alert('Comment deleted successfully!')
    }else{
        alert('Comment deletion was canceled')
    }
    
   }

    return (
        <>
            <div className="max-w-4xl mx-auto py-8 ml-36 mt-16">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                    <hr className="max-w-2xl border-t-2 border-[rgba(0,0,0,0.2)] my-4" />
                    <div className="space-y-4">
                    </div>
                </div>

                {
                    comments.length > 0 ?
                        (
                            comments.map((comment) => {
                                return <div key={comment._id} className="bg-gray-100 p-4 rounded-md shadow-sm mt-8 max-w-2xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold  italic text-blue-500">{comment.username} </span>
                                        <span className="text-xs text-gray-500">{formattedDate(comment._createdOn)}</span>
                                    </div>
                                    <p className="text-gray-700">{comment.comment}</p>

                                    {
                                        comment._ownerId === userId
                                            ?
                                            <div className="mt-6 flex items-center justify-end gap-x-6">

                                                <Link
                                                    to={`/posts/${postId}/comment/${comment._id}`}
                                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button onClick={() => onDelete(comment._id)} type="button" className="px-2 py-1.5 border rounded-md text-sm/6 font-semibold text-gray-900">
                                                    Delete
                                                </button>

                                            </div>
                                            :

                                            ""

                                    }


                                </div>
                            })
                        )
                        :
                        <p className="text-blue-500 font-semibold text-sm flex items-center space-x-2 italic" >
                            <span className="text-gray-500 text-sm font-medium p-2 bg-gray-100 rounded-md">No comments on this post yet...</span>

                        </p>


                }
                <hr className="max-w-2xl border-t-2 border-[rgba(0,0,0,0.2)] my-4 mt-12" />
            </div> 
        </>
    )
}