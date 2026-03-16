import { formattedDate } from "../../../utils/date"
import { Link } from "react-router"
import useAuth from "../../../hooks/useAuth";
import { useDeletePostLike, useGetPostsLikes } from "../../../api/postApi";
import { useCheckIfLiked } from '../../../api/postApi'

export default function CatalogItem({
    post,
    toggleLike,
    likedPostsIds,
    likesRefreshKey,
    showDislike,
    toggleDislike
}) {

    const { userId } = useAuth(); // currently logged-in user _id
    const { likes } = useGetPostsLikes(post._id,likesRefreshKey) // likes array will consist of elements corresponding to the currentPost (each element in the array is a like associated to the post wiht ID postId)
    const { isLiked } = useCheckIfLiked(post._id, userId) // if true then the currently logged in user has liked the post on which we are iterating on
    // show like button depending on whether the userId matches the ownerId in likes
    
    

    console.log('Likes in CatalogItem component are:', likes)


    return (
        <article key={post._id} className="flex max-w-xl flex-col items-start justify-between border-4 border-gray-300 rounded-xl p-6 shadow-lg bg-white">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={formattedDate(post._createdOn)} className="text-gray-500">
                    {formattedDate(post._createdOn)}
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
            <div className="mt-4 flex items-center justify-between">
                <img alt="Image" src={post.image} className="w-full h-40 object-cover rounded-md" />
            </div>
            <div className="flex gap-12 mt-4">
                <Link to={`/posts/${post._id}/details`} className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">See post</Link>
                {
                   userId && userId !== post._ownerId && !isLiked && !likedPostsIds.has(post._id)
                   /*
                    new Set([
                              [
                                "7d306467-25ea-4124-a4c2-50e80b76c63f",
                                "7d306467-25ea-4124-a4c2-50e80b76c63f",
                                "7d306467-25ea-4124-a4c2-50e80b76c63f"
                              ]
                            ])
                   */
                        ?
                        <Link onClick={() => toggleLike(post._id)} className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" >Like</Link>
                        :
                        ''
                }
                {
                    userId && userId !== post._ownerId && showDislike
                                        ?
                    <Link onClick={() => toggleDislike(post._id)} className="px-4 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"> Dislike</Link>
                                        :
                                        ""
                }
                {
                    likes.length > 0
                        ?
                    <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded">
                            Likes: {likes.length}
                    </span>
                        :
                    <span>
                            No likes for this post
                    </span>
                }
            </div>
        </article>
    )
}