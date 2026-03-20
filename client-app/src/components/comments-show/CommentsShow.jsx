import { useParams } from "react-router"
import { formattedDate } from "../../utils/date"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { Link } from "react-router"
import { useDeleteComment, useCreateCommentLike, useCreateCommentDislike, useGetCommentLikes, useGetCommentDislikes, useGetTargetElement,useDeleteUserReaction } from "../../api/commentApi"

export default function  CommentsShow(
    {comments}
){

    /*
        To fix:
            - should get username from comments
    */

    const { postId } = useParams()
    const { userId } = useAuth()
    const { deleteComment } = useDeleteComment()
    const { username } = useAuth();
    const { createLike } = useCreateCommentLike()
    const { createDislike } = useCreateCommentDislike()
    const { getTargetLike, getTargetDislike } = useGetTargetElement()
    const { deleteLike, deleteDislike } = useDeleteUserReaction()

    const [counter, setCounter] = useState(0)

    const { userLikes } = useGetCommentLikes(postId, userId, counter)
    const { userDislikes } = useGetCommentDislikes(postId,userId, counter)
    
    console.log('User likes in CommentsShow component are:', userLikes)
    console.log('User dislikes in CommentShow component are:', userDislikes)

    console.log('Comments in CommentsShow component are:', comments)

    
    
    const onLikeComment = async (commentId) => {
        console.log(`Comment with ID: ${commentId} Liked!`)

        const payload = {
            commentId: commentId,
            postId: postId,
            userId: userId,
            type: "like"
        }

        await createLike(payload)
        // Create a document in collection .../data/commentReactions

       // Get ID of target dislike 
       const targetId = await getTargetDislike(commentId, userId)

       // DELETE element from /data/commentReaction collection
       if (targetId) {
            await deleteDislike(targetId)
       }
        
        
        setCounter((state) => state + 1)

    }

    const onDislikeComment = async (commentId) => {
        console.log(`Comment with ID: ${commentId} disliked!`)

        const payload = {
            commentId: commentId,
            postId: postId,
            userId: userId,
            type: "dislike"
        }

        // Create new document in /data/commentReactions collection with type: "dislike"
        await createDislike(payload)

       // get ID of target element from /data/commentReactions collection
       const targetId = await getTargetLike(commentId, userId)
        
       if (targetId) {
        await deleteLike(targetId)
       }
       console.log('TargetID is:',targetId)

       // Delete document from /data/commentReactions collection with ID: commentId
        


        setCounter((state) => state + 1)
    }

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
                        
                            comments.map((comment) => (
                                 <div data-testid="comment-container" key={comment._id} className={`bg-gray-100 p-4 rounded-md shadow-sm mt-8 max-w-2xl ${comment.pending ? 'border border-yellow-300 bg-yellow-100 text-yellow-800' : ''}`}>                                   
                                        <span className="flex gap-2 text-sm font-semibold  italic text-blue-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-8">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
                                            </svg>

                                            <p aria-label="user-paragraph" className="text-sm text-gray-700 italic mt-1">{comment.username}</p>
                                        </span>
                                    
                                    <span className="text-gray-700 mt-4 mb-2">
                                        <span className="text-xs text-gray-500 tracking-wide">{formattedDate(comment._createdOn)}</span>
                                        <p aria-label="comment-paragraph" className="mt-10">{comment.comment}</p>
                                    </span>
                                  
                                    {
                                        comment._ownerId === userId
                                            ?
                                            <div className="mt-2 flex items-center justify-end gap-x-6">

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

                                            <div className="mt-6 flex items-center justify-start gap-x-6">
                                                {/* like icon if user has not liked the comment */}
                                            {
                                                userLikes.some((likes) => likes.commentId === comment._id)
                                                                    ?
                                                        <button>
                                                            <i class="fa-solid fa-thumbs-up"></i>
                                                        </button>   
                                                                    :
                                                        <button onClick={() => onLikeComment(comment._id)}>
                                                            <i class="fa-regular fa-thumbs-up"></i>
                                                        </button>       
                                            }
                                                
                                            {
                                                userDislikes.some((dislike) => dislike.commentId === comment._id)
                                                                    ?
                                                            <button>
                                                                <i class="fa-solid fa-thumbs-down"></i>
                                                            </button>
                                                                    :
                                                            <button onClick={() => onDislikeComment(comment._id)}>
                                                                <i class="fa-regular fa-thumbs-down"></i>
                                                            </button>     
                                                
                                            }   

                                               {/* dislike icon if user has not disliked the comment */}
                                               
                                               
                                               {/* dislike icon if user has disliked comment */}
                                               {/* <i class="fa-solid fa-thumbs-down"></i> */}
                                               
                                               {/* dislike icon if user has disliked comment */}
                                               {/* <i class="fa-solid fa-thumbs-down"></i> */}
                                            </div>

                                    }


                                </div>
                            ))
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