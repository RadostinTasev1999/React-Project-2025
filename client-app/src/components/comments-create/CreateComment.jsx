export default function CommentsCreate(
    {createHandler}
) {


    return (
        <>
            <form action={createHandler} className="w-1/2 ml-36 pt-12 p-8 bg-white shadow-lg rounded-lg border-2">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Post a Comment</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Share your experience and thoughts on the topic.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">
                                    Comment
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        // onChange={handleChange}
                                        // value={formData.comment}
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

                                    />
                                    {/* {errors && <span className="border-red-500 bg-red-100 italic">{errors.comment}</span>} */}
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