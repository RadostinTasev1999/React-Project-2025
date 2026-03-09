import { describe,expect,it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import PostDetails from "./PostDetails";
import { usePost } from "../../api/postApi";
//import { useDeleteComment } from "../../api/commentApi";
import userEvent from '@testing-library/user-event'
import EditPost from "../edit/EditPost";


    /*
     MemoryRouter - Stores navigation history in memory
     initialEntries - defines the starting URL
      */

const mockedData = {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "title": "Test title",
        "image": "Test image URL",
        "description": "Test description 12345678910",
        "_createdOn": 1772711227341,
        "_id": "aa6f3aaa-7be9-4474-b0ea-7468a2d8109a"
    }

const mockComment = {
        "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
        "username": "Raostin",
        "comment": "test comment",
        "postId": "98ab6a7d-6443-4f18-93d2-cd20bb0a674e",
        "author": {
        "email": "peter@abv.bg"
        },
        "_createdOn": 1772718980591,
        "_id": "00a999af-3ff4-4584-8faa-37b6a4703672"
}

const mockedComments = [
    {
    "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "username": "Tasev",
    "comment": "this is my comment here 123",
    "postId": "6ae7391e-29bc-41b2-a905-36f501f925b9",
    "author": {
        "email": "peter@abv.bg",
        "username": "Peter",
        "_id": "35c62d76-8152-4626-8712-eeb96381bea8"
    },
    "_createdOn": 1772800104000,
    "_id": "02aff09b-6074-4bec-8199-46088345981b"
},
{
    "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
    "username": "TasevRadostin",
    "comment": "This is my comment 123",
    "postId": "6ae7391e-29bc-41b2-a905-36f501f925b9",
    "author": {
        "email": "peter@abv.bg"
    },
    "_createdOn": 1772800209432,
    "_id": "2b7562c6-2f25-48ce-b513-a1bd6cb0842f"
}
]
    
//const mockDeleteComment = vi.fn()



const _id = "35c62d76-8152-4626-8712-eeb96381bea8"

vi.mock('../../api/commentApi.js', () => ({
    useCreateComments:() => ({
        create: mockComment
    }),
    useComments: () => ({
        comments: mockedComments,
        addComment: vi.fn()
    }),
     useDeleteComment: () => ({
        deleteComment: vi.fn()
     })
    
}))

vi.mock('../../hooks/useAuth.js', async(importOriginal) => {
        const actual = await importOriginal();
        
        return {
            default: () => ({
                ...actual,
                 userId: _id,
                 isAuthenticated: true
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
        usePost: vi.fn(() => ({
        post: mockedData
    }))
    } 
    /*
        usePost function will return the value provided in the callback to vi.fn()

    */
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
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Comment')).toBeInTheDocument();
        expect(screen.getByRole('button', {'name': /post/i})).toBeInTheDocument();
    })
    it.only('renders edit-post form on Edit button click', async() => {

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
});