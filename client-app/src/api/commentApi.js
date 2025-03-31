import useAuth from "../hooks/useAuth"
const baseUrl = 'http://localhost:3030/data/comments'

export const useCreateComments = () => {

    const { request } = useAuth();

    const create = (payload,postId) => {

        const commentData = {
            ...payload
        }



        const newComment = request.post(`${baseUrl}/${postId}`,commentData)

        return newComment

    }

    return {
        create
    }


}
// create useComment hook
