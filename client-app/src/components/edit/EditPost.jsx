import { useParams } from "react-router"
import { usePost } from "../../api/postApi"
import { useEditPost } from "../../api/postApi"
import { useNavigate } from "react-router"

export default function EditPost() {

    const { postId } = useParams()
    const navigate = useNavigate()
    const { post } = usePost(postId)
    const { edit } = useEditPost()

    const onEditHandler = async(formData) => {
           
        const data = Object.fromEntries(formData)

        console.log('Data is:', data)

        const editPost = await edit(data,postId)

        console.log('Edited post is:', editPost)

        navigate(`/posts/${postId}/details`)

    }

    const onCancel = () => {
        navigate(`/posts/${postId}/details`)
    }


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://cdn-icons-png.flaticon.com/512/5909/5909173.png"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Edit Post
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action={onEditHandler} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                Device OEM
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    autoComplete="Title..."
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    defaultValue={post.title}
                               />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm/6 font-medium text-gray-900">
                                Image URL
                            </label>
                            <div className="mt-2">
                                <input
                                    id="image"
                                    name="image"
                                    type="text"
                                    required
                                    autoComplete="Image..."
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    defaultValue={post.image}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                    Description
                                </label>

                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    type="description"
                                    required
                                    autoComplete="input-text"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    defaultValue={post.description}
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Edit
                            </button>
                            <br />
                            <button
                                
                                onClick={onCancel}
                                className="flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm/6 font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
    
}