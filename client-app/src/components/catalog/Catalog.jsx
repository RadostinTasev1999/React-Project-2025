// import { usePosts } from "../../api/postApi"
import { formattedDate } from "../../utils/date"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router"

import { usePosts } from "../../api/postApi"

export default function Catalog() {

    const {posts } = usePosts()
    const { email } = useAuth()

   
    console.log('Posts are:', posts)

   

    return (
        <>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Latest posts</h2>
                        <p className="mt-2 text-lg/8 text-gray-600">Learn the latest features and news from the community hub.</p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article key={post._id} className="flex max-w-xl flex-col items-start justify-between">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={formattedDate(posts._createdOn)} className="text-gray-500">
                                        {formattedDate(posts._createdOn)}
                                    </time>
                                    <a
                                        href="#"
                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        {email}
                                    </a>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                        <a href="#">
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <img alt="Image" src={post.image} className="size-50  w-82 h-32" />
                                    <Link to={`/posts/${post._id}/details`}className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">More info</Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
)
}