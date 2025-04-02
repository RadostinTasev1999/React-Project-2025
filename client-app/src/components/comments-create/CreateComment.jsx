import { useCreateComments } from "../../api/commentApi"
import {  useParams } from "react-router"
import useAuth from "../../hooks/useAuth"
import { v4 as uuid } from 'uuid'
import { useState } from "react"

export default function CommentsCreate() {

    const { postId } = useParams()
    const {create} = useCreateComments()
    const { userId } = useAuth()
    const { email } = useAuth()

    const [formData,setFormData] = useState({
        
        username: '',
        comment:''
        
      })
    
      // create errors state property
      const [errors,setErrors] = useState({})
    
      const handleChange = (event) => {
        event.preventDefault()
    
        const { name,value } = event.target
    
        setFormData((prevState) => ({
          ...prevState,
          [name]: value
        }))
    
      }
    
    
      // create validation function
    
      const validateForm = (data) => {
    
        let errors = {};
       
    
        if (!data.username.trim()) {
          errors.username = 'Username is required'
        }
    
        if (!data.comment.trim()) {
            errors.comment = 'Comment is required'
        } else if(data.comment.length < 5 ){
          errors.comment = 'Comment must be at least  5 characters'
        }
    
        return errors
      }
    
      // implement email validation logic

    const onCreateComment = (formData) => {

        const { username, comment} = Object.fromEntries(formData)

        const validationErrors = validateForm({username,comment})

        if (Object.keys(validationErrors).length === 0) {
            const payload = {
                _id:uuid(),
                username,
                comment,
                _ownerId:userId,
                postId,
                author:{
                    email
                }
            }
    
            create(payload)
    
            window.location.reload()
        }else {
            setErrors(validationErrors)
        }

       

    }


    return (
        <>
            <form action={onCreateComment} className="w-1/2 ml-36 pt-12 p-8 bg-white shadow-lg rounded-lg border-2">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Post a Comment</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Share your experience and thoughts on the topic.
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
                                            onChange={handleChange}
                                            value={formData.username}
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        />
                                        
                                    </div>
                                    {errors && <span className="border-red-500 bg-red-100 italic">{errors.username}</span>}
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
                                        onChange={handleChange}
                                        value={formData.comment}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                                    />
                                    {errors && <span className="border-red-500 bg-red-100 italic">{errors.comment}</span>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Post
                    </button>
                </div>
            </form>
        </>
    )
}