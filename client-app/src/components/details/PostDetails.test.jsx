import { describe,expect,it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import PostDetails from "./PostDetails";
import CommentsEdit from "../comments-edit/CommentEdit";
import { usePost } from "../../api/postApi";
//import { useDeleteComment } from "../../api/commentApi";
import userEvent from '@testing-library/user-event'
import EditPost from "../edit/EditPost";



    /*
     MemoryRouter - Stores navigation history in memory
     initialEntries - defines the starting URL
      */

const mockEditFn = vi.fn()

const mockCreateFn = vi.fn();

const mockNavigate = vi.fn()

const mockedAddComment = vi.fn();

const mockDeletePost = vi.fn();

const mockedData = {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "title": "Test title",
        "image": "Test image URL",
        "description": "Test description 12345678910",
        "_createdOn": 1772711227341,
        "_id": "aa6f3aaa-7be9-4474-b0ea-7468a2d8109a"
    }

// const mockComment = {
//         "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//         "username": "Raostin",
//         "comment": "test comment",
//         "postId": "98ab6a7d-6443-4f18-93d2-cd20bb0a674e",
//         "author": {
//         "email": "peter@abv.bg"
//         },
//         "_createdOn": 1772718980591,
//         "_id": "00a999af-3ff4-4584-8faa-37b6a4703672"
// }

const mockedComments = [
{
    "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "username": "Tasev",
    "comment": "This is a test comment",
    "postId": "6ae7391e-29bc-41b2-a905-36f501f925b9",
    "author": {
        "email": "peter@abv.bg",
        "username": "Peter",
        "_id": "35c62d76-8152-4626-8712-eeb96381bea8"
    },
    "_createdOn": 1772800104000,
    "_id": "02aff09b-6074-4bec-8199-46088345981b"
}
]
    
const mockDeleteComment = vi.fn();



let _id = "35c62d76-8152-4626-8712-eeb96381bea8"

vi.mock('../../api/commentApi.js', () => ({
    useCreateComments:() => ({
        create: mockCreateFn
    }),
    useComments: () => ({
        comments: mockedComments,
        addComment: mockedAddComment
    }),
     useDeleteComment: () => ({
        deleteComment: mockDeleteComment
     }),
     useCreateCommentLike: () => ({
        createLike: vi.fn()
     }),
     useCreateCommentDislike: () => ({
        createDislike: vi.fn()
     }),
     useGetTargetElement: () => ({
        getTargetLike: vi.fn(),
        getTargetDislike: vi.fn()
     }),
     useDeleteUserReaction: () => ({
        deleteLike: vi.fn(),
        deleteDislike: vi.fn()
     }),
     useGetCommentLikes: () => ({
        userLikes: []
     }),
     useGetCommentDislikes: () => ({
        userDislikes: []
     }),
     useEditComment: () => ({
        edit: vi.fn()
     }),
     useComment: () => ({
        postComment: {
            "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
            "comment": "This is the post Author's comment",
            "postId": "10868510-d326-4aa8-a80e-af445207193a",
            "username": "Peter",
            "author": {
              "email": "peter@abv.bg"
            },
            "_createdOn": 1774616376943,
            "_id": "6f67b4fe-fa55-4854-bb9d-5518d59bac5d"
          }
     })
    
}))

vi.mock('../../hooks/useAuth.js', async(importOriginal) => {
        const actual = await importOriginal();
        
        return {
            default: () => ({
                ...actual,
                 userId: _id,
                 isAuthenticated: true,
                 username: "Peter"
            })
            
        }
   })

    /*
        ({ }) - syntax is a shorthand way to return an object literal immediately from an arrow function.
    */
vi.mock('../../api/postApi.js', async (importOriginal) => {
    const actual = await importOriginal();
    /*
        importOriginal() - funciton provided by Vitest that lets you import the 
                           real unmocked version of the module         
    */
    return {
        ...actual,
        useDeletePost: () => ({
            deletePost: mockDeletePost
        }),
        useEditPost: () => ({
            edit: mockEditFn // mockEditFn = vi.fn();
        }),
        usePost: vi.fn(() => ({
        post: mockedData
    }))
    } 
    /*
        usePost function will return the value provided in the callback to vi.fn()

    */
})

vi.mock('react-router', async (importOriginal) => {
    const actual = await importOriginal();

    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

describe('Details component', () => {
    it('renders post-details correctly based on URL parameter', () => {

        // Define what the hook should return for this test.
        const postId = '2bb392a3-adc3-4f13-8d22-bacdfd02af7c'

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}>
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                </Routes>
            </MemoryRouter>
        )
        // Assert
        expect(usePost).toHaveBeenCalled();
        expect(usePost).toHaveReturnedWith({post: mockedData})
        expect(screen.getByText(/Test title/i)).toBeInTheDocument();
        expect(screen.getByText(/Test description 12345678910/i)).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'product image'})).toBeInTheDocument();
        const editLink = screen.getAllByRole('link', { name: /edit/i }).find(link => link.getAttribute('href') === `/posts/${postId}/edit`)
        expect(editLink).toBeInTheDocument();
        const deleteLink = screen.getAllByRole('link', { name: /delete/i }).find(link => link.getAttribute('class')?.includes('bg-blue-500'))
        expect(deleteLink).toBeInTheDocument()

        // Assert for Comments show section
        expect(screen.getByRole('heading', { 'level': 2, name: /comments/i })).toBeInTheDocument();

        // Assert for Comment Post Form section
        expect(screen.getByRole('heading', { 'level': 2, 'name': /post a comment/i})).toBeInTheDocument();
        expect(screen.getByText(/share your experience and thoughts on the topic./i)).toBeInTheDocument();
        expect(screen.getByLabelText('Comment')).toBeInTheDocument();
        expect(screen.getByRole('button', {'name': /post/i})).toBeInTheDocument();
    })
    it('renders edit-post form on Edit button click', async() => {

        const postId = '2bb392a3-adc3-4f13-8d22-bacdfd02af7c'

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}>
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                    <Route path='/posts/:postId/edit' element={<EditPost />} />
                </Routes>
            </MemoryRouter>
        )

        const editButton = screen.getByRole('link', {'name': /edit post/i})
        await userEvent.click(editButton)
        // target h2 element
        // getBy queries are synchronous
        const formHeading = await screen.findByRole('heading', {'level': 2, 'name': /^Edit Post$/})
        
        // target edit form element
        const editForm = await screen.findByRole('form')

        // target title imput
        const titleInput = await screen.findByLabelText(/^Title$/)
        // target Image URL input
        const imageInput = await screen.findByLabelText(/^Image URL$/)
        // Target description input
        const descriptionInput = await screen.findByLabelText(/^Description$/)
        // Target Edit button
        const editFormButton = await screen.findByRole('button', {'name': 'Edit'})

        // Target Cancel button
        const cancelButton = await screen.findByRole('button', {'name': 'Cancel'})

        // Assert:
        expect(formHeading).toBeInTheDocument();
        expect(formHeading.textContent).toEqual('Edit Post')
        expect(editForm).toBeInTheDocument();
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveValue('Test title');
        expect(imageInput).toBeInTheDocument();
        expect(imageInput).toHaveValue('Test image URL')
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toHaveValue('Test description 12345678910')
        expect(editFormButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

        /*
        const mockedData = {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "title": "Test title",
        "image": "Test image URL",
        "description": "Test description 12345678910",
        "_createdOn": 1772711227341,
        "_id": "aa6f3aaa-7be9-4474-b0ea-7468a2d8109a"
    }
        */
    })
    // Add unit test to test behavior when user clicks on Edit button in Edit form
    it('Invokes edit function on submitting edit form', async() => {
        const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'

        const user = userEvent.setup()

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/edit`]}>
                <Routes>
                    <Route path="/posts/:postId/edit" element={<EditPost />}/>
                </Routes>
            </MemoryRouter>
        )

        const titleInput = screen.getByLabelText(/^Title$/)
        await user.clear(titleInput)
        await user.type(titleInput, 'This is a test title')
        const imageInput = screen.getByLabelText(/^Image URL$/)
        await user.clear(imageInput)
        await user.type(imageInput, 'https://d8iqbmvu05s9c.cloudfront.net/ajprhqgqg1otf7d5sm7u3brf27gv')
        const descriptionInput = screen.getByLabelText(/^Description$/)
        await user.clear(descriptionInput)
        await user.type(descriptionInput, 'This is a test description')
        const editButton = screen.getByRole('button', { 'name': /edit/i });
        await user.click(editButton)

        // Assert that edit method has been called after edit form has been submitted
        expect(mockEditFn).toHaveBeenCalled();

        expect(mockEditFn).toHaveBeenCalledWith({
            "title": "This is a test title",
            "image": "https://d8iqbmvu05s9c.cloudfront.net/ajprhqgqg1otf7d5sm7u3brf27gv",
            "description": "This is a test description"
        },
        postId
        )
    })
    // Add unit test to test behavior when user clicks on Cancel buttonn on Edit form
    it('should navigate to post details page after clicking on cancel button', async () => {

        const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'

        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/edit`]}>
                <Routes>
                    <Route path="/posts/:postId/edit" element={<EditPost />} />
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                </Routes>
            </MemoryRouter>
        )

        const cancelButton = screen.getByRole('button', { 'name': /^Cancel$/})
        await user.click(cancelButton)


        // Assert navigation to post-details has happened:
        expect(mockNavigate).toHaveBeenCalledWith(`/posts/${postId}/details`);

    })
    // Add unit-test to test behavior when user clicks on Post button on Comment form
    it('should invoke create and addComment after submitting post-comment form',async () => {
        
        const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}>
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                </Routes>
            </MemoryRouter>
        )

        const textArea = screen.getByLabelText(/^Comment$/)
        await user.type(textArea, 'This is an example comment for this post')
        const postButton = screen.getByRole('button', {'name': /^Post$/})
        await user.click(postButton);

        // Assert that create function has been called

        expect(mockCreateFn).toHaveBeenCalled();
        expect(mockCreateFn).toHaveBeenCalledWith({
            "comment": "This is an example comment for this post",
            "username": "Peter"
        },postId)

        expect(mockedAddComment).toHaveBeenCalled();

    })
    // Add unit-test to test behavior when user clicks on Delete button in Post Details component
    it('should invoke deletePost on Delete button click',async() => {

        const user = userEvent.setup();
        const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}> 
            {/* The test will initialize with initial URL `/posts/${postId}/details*/}
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                </Routes>
            </MemoryRouter>
        )

        
        const deleteButton = screen.getByRole('link', { 'name': /^Delete post$/})
        await user.click(deleteButton)

        // Assert that deletePost has been called
        expect(mockDeletePost).toHaveBeenCalled();
        expect(mockDeletePost).toHaveBeenCalledWith(postId)
        // Assert that mockNavigate has been called with '/posts'
        expect(mockNavigate).toHaveBeenCalledWith('/posts')
    })

    // Add unit test to verify that after user creates a comment, the comment is rendered in details page

    // it('should render comment after post button click on comment-post form',async () => {

    //     const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'
    //     const user = userEvent.setup()
        
    //     render(
    //         <MemoryRouter initialEntries={[`/posts/${postId}/details`]}>
    //             <Routes>
    //                 <Route path="/posts/:postId/details" element={<PostDetails />} />
    //             </Routes>
    //         </MemoryRouter>
    //     )

    //     //use userEvent in order to fill in post-comment form
       
    //     const commentInput = screen.getByLabelText(/^Comment$/)
    //     await user.type(commentInput, 'This is an example comment')
    //     const postButton = screen.getByRole('button', { 'name': /^Post$/})

    //     await user.click(postButton)

    //     // ------------------------------------------------------------- //
    //     const commentContainer = await screen.findByTestId('comment-container')

    //     // Assert that comment container is in the document
    //     expect(commentContainer).toBeInTheDocument();

    //     const userP = await screen.findByRole('paragraph', { 'name': 'user-paragraph'})
    //     const commentP = await screen.findByRole('paragraph', { 'name': 'comment-paragraph'})

    //     // Assert 
    //     expect(userP.textContent).toEqual("Tasev");
    //     expect(commentP.textContent).toEqual('This is a test comment');
    // })

    it('should render Edit and Delete buttons on comment card for comment owners', async () => {
        
        const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'
        _id = "35c62d76-8152-4626-8712-eeb96381bea8"

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}> 
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                </Routes>
            </MemoryRouter>
        )

        // target edit and delete buttons
        const container = await screen.findByTestId('comment-container')
        const editCommentButton = within(container).getByRole('link', { name: /^Edit$/i})
        const deleteCommentButton = within(container).getByRole('button', { name: /^Delete$/i})
        
       
       expect(container).toBeInTheDocument();
       expect(editCommentButton).toBeInTheDocument();
       expect(deleteCommentButton).toBeInTheDocument();

    })

    it('should render like and dislike buttons on comment card',async () => {
        
            const postId = "6ae7391e-29bc-41b2-a905-36f501f925b9"

            _id = "54a5731d-3968-4497-90e4-2cf373de26e1"

            render(
                <MemoryRouter initialEntries={[`/posts/${postId}/details`]}> 
                    <Routes>
                        <Route path="/posts/:postId/details" element={<PostDetails />}/>
                    </Routes>
                </MemoryRouter>
            )

            const container = await screen.findByTestId('comment-container')
            const likeButton = within(container).getByRole('button', { name: 'regular-thumbs-up' })
            const dislikeButton = within(container).getByRole('button', { name: 'regular-thumbs-down'})

            console.log('like button is:', likeButton)
            console.log('dislike button is:', dislikeButton)

            expect(likeButton).toBeInTheDocument();
            expect(dislikeButton).toBeInTheDocument()

        /*
            test when this condition is true: userId && comment._ownerId !== userId

                this element is rendered:
                    <button onClick={() => onLikeComment(comment._id)}>
                                                            <i class="fa-regular fa-thumbs-up"></i>
                                                        </button>  
                and this element is rendered:

                    <button onClick={() => onDislikeComment(comment._id)}>
                                                                <i class="fa-regular fa-thumbs-down"></i>
                    </button>  
        */
    })

    // Add unit test for rendering edit comment form after comment owner clicks on Edit button
    it('should render edit-comment form after comment-author clicks on Edit button', async() => {

            const user = userEvent.setup()

            const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'
            _id = "35c62d76-8152-4626-8712-eeb96381bea8"

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}> 
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                    <Route path='/posts/:postId/comment/:commentId' element={<CommentsEdit />} />
                </Routes>
            </MemoryRouter>
        )

        const container = await screen.findByTestId('comment-container')
        const editCommentButton = within(container).getByRole('link', { name: /^Edit$/i})

        await user.click(editCommentButton)

        const editCommentForm = await screen.findByRole('form', { name: 'edit-comment-form'})
        const cancelButton = await within(editCommentForm).findByRole('button', { name: /^Cancel$/i})
        const saveButton = await within(editCommentForm).findByRole('button', {name: /^Save$/i})

        expect(editCommentForm).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();


    })
    // Add unit test for performing DELETE request when comment owner clicks on Delete button
    it('should invoke deleteComment after comment author clicks on Delete button',async () => {
        const user = userEvent.setup()

        const postId = 'aa6f3aaa-7be9-4474-b0ea-7468a2d8109a'
        _id = "35c62d76-8152-4626-8712-eeb96381bea8"

        render(
            <MemoryRouter initialEntries={[`/posts/${postId}/details`]}> 
                <Routes>
                    <Route path="/posts/:postId/details" element={<PostDetails />}/>
                </Routes>
            </MemoryRouter>
        )

        const container = await screen.findByTestId('comment-container')
        const deleteButton = await within(container).findByRole('button', { name: /^Delete$/i})

        

        vi.spyOn(window, 'confirm').mockReturnValue(true)
        vi.spyOn(window, 'alert').mockImplementation(() => {})

        await user.click(deleteButton)

        /*
            So that line is mainly used to silence the dialog during tests while still letting you verify it was invoked.
        */
        expect(mockDeleteComment).toHaveBeenCalled();
        expect(mockDeleteComment).toHaveBeenCalledWith(mockedComments[0]._id);


    })

    /*
        TODO
            - Add unit tests for edit-comment form functionality (Cancel / Save)
    */

    //TODO:
        /*
            1. Add unit test for Edit and Delete buttons for comment owners
            2. Add unit test for like and dislike buttons for comment non-owners
        */
});