import { describe,expect,it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import PostDetails from "./PostDetails";
import { usePost } from "../../api/postApi";


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

const _id = "35c62d76-8152-4626-8712-eeb96381bea8"

vi.mock('../../api/commentApi.js', () => ({
    useCreateComments:() => ({
        create: mockComment
    })
}))

vi.mock('../../hooks/useAuth.js', async(importOriginal) => {
        const actual = await importOriginal();
        
        return {
            default: () => ({
                ...actual,
                 userId: _id
            })
            
        }
   })

    /*
        ({ }) - syntax is a shorthand way to return an object literal immediately from an arrow function.
    */
vi.mock('../../api/postApi.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        usePost: vi.fn(() => ({
        post: mockedData
    }))
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
        expect(screen.getByRole('link', {name: /edit/i})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /delete/i})).toBeInTheDocument();
    })
});