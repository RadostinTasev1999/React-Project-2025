import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { useEditComment } from "../../api/commentApi"
import { useEffect, useState } from "react"
import { useComment } from "../../api/commentApi"

export default function CommentsEdit(){
    
    const navigate = useNavigate()
    const { postId, commentId } = useParams()
    const {edit} = useEditComment()   
    const {postComment} = useComment(commentId)
    
    const [username,setUsername] = useState('')
    const [comment,setComment] = useState('')

    useEffect(() => {
        if (postComment) {
            setUsername(postComment.username)
            setComment(postComment.comment)
        }
    },[postComment])
 

    const onEditComment = (formData) => {

      const {username,comment} = Object.fromEntries(formData)

        const payload = {
            username,
            comment
        }
      
        edit(commentId,payload)

        navigate(`/posts/${postId}/details`)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    const invalidForm = username.trim() === "" && comment.trim() === ""


    const onCancel = () => {
        navigate(`/posts/${postId}/details`)
    }

    return (
        <>
            <form action={onEditComment} className="w-1/2 ml-36 pt-18 ">
                <div className="space-y-12 p-8 max-w-xl ml-auto p-6 bg-white shadow-lg rounded-lg">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Edit Comment</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Share your updates on the topic.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">

                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Enter Username"
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            onChange={handleUsername}
                                            value={username}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">
                                    Comment
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        onChange={handleComment}
                                        value={comment}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={onCancel} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 focus:outline-none">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={invalidForm}
                    >
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}