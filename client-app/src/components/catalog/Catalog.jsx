import { formattedDate } from "../../utils/date"
import { Link } from "react-router"
import { usePosts } from "../../api/postApi"

export default function Catalog({
    heading="Latest posts"
}) {

    const { posts } = usePosts() 

    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 data-testid="heading" className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 sm:text-5xl italic shadow-lg p-6 rounded-lg text-center max-w-3xl mx-auto">{heading}</h2>
                        <p className="mt-4 text-lg text-gray-700 sm:text-xl italic tracking-tight leading-relaxed max-w-3xl mx-auto">Learn the latest product feedback and features from the community hub.</p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article key={post._id} className="flex max-w-xl flex-col items-start justify-between border-4 border-gray-300 rounded-xl p-6 shadow-lg bg-white">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={formattedDate(posts._createdOn)} className="text-gray-500">
                                        {formattedDate(posts._createdOn)}
                                    </time>

                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                        <Link to={`/posts/${post._id}/details`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="Image" src={post.image} className="w-full h-40 object-cover rounded-md" />
                                </div>
                                <Link to={`/posts/${post._id}/details`} className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2">See post</Link>

                            </article>

                        ))}
                    </div>
                </div>
            </div>
        </>
)
}