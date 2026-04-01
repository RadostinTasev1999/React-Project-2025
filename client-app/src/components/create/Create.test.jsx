import { describe, it, expect,vi } from 'vitest'
import { render,screen } from '@testing-library/react'
import Create from './Create'
import { MemoryRouter, Route } from 'react-router'
import '@testing-library/jest-dom'
import AuthGuard from '../guards/AuthGuard'
import { Routes } from 'react-router'
import userEvent from '@testing-library/user-event'
//import { userEvent } from 'vitest/browser'
//import { mock } from 'node:test'

const mockPost = vi.hoisted(() =>

  vi.fn().mockResolvedValue({
      "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
      "title": "Mac Book",
      "image": "https://sm.pcmag.com/pcmag_me/photo/default/macbook-6_hgfm.jpg",
      "description": "MacBooks are Apple’s premium laptop lineup, recognized for their unibody aluminum construction, sleek, portable design, and high-performance M-series chips.",
      "_createdOn": 1772647385758,
      "_id": "a116670b-3e21-47e2-96cd-60ea088df222"
})
)

vi.mock('../../hooks/useAuth.js', () => ({
    default: () => ({
      isAuthenticated: true
    })
}))

vi.mock('../../api/postApi.js', () => ({
    useCreatePost: () => ({
        create: mockPost
    })
}))

describe('Create component',() => {
    it('Should render Create form', () => {
      /*
     MemoryRouter - Stores navigation history in memory
     initialEntries - defines the starting URL
      */
        render(
            <MemoryRouter initialEntries={['/create']}>
              <Routes>
                <Route element={<AuthGuard />}>
                    <Route path='/create' element={<Create heading="Start a discussion"/>}/>
                </Route>
              </Routes>
            </MemoryRouter>
        )

        const headingText = screen.getByText(/^start a discussion$/i).textContent;
        const titleInput = screen.getByLabelText(/^title$/i);
        const imageInput = screen.getByLabelText(/^image url$/i);
        const descriptionInput = screen.getByLabelText(/^description$/i);
        const publishButton = screen.getByText(/^publish$/i)
        const cancelButton = screen.getByText(/^cancel$/i)

        expect(headingText).toEqual('Start a discussion')
        expect(titleInput).toBeInTheDocument();
        expect(imageInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(publishButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();

    })

    it('Should call create function on form submission', async () => {
        
      const user = userEvent.setup();

      render(
            <MemoryRouter initialEntries={['/create']}>
              <Routes>
                <Route element={<AuthGuard />}>
                    <Route path='/create' element={<Create/>}/>
                </Route>
              </Routes>
            </MemoryRouter>
        )

        // Fill in input fields
        await user.type(screen.getByLabelText(/^title$/i), 'Mac Book');
        await user.type(screen.getByLabelText(/^image url$/i), 'https://sm.pcmag.com/pcmag_me/photo/default/macbook-6_hgfm.jpg');
        await user.type(screen.getByLabelText(/^description$/i), 'MacBooks are Apple’s premium laptop lineup, recognized for their unibody aluminum construction, sleek, portable design, and high-performance M-series chips.')
        await user.click(screen.getByText(/^publish$/i))
        // Assert that create has been called
        expect(mockPost).toHaveBeenCalled();
        expect(mockPost).toHaveBeenCalledWith({title: 'Mac Book', image: 'https://sm.pcmag.com/pcmag_me/photo/default/macbook-6_hgfm.jpg', description: 'MacBooks are Apple’s premium laptop lineup, recognized for their unibody aluminum construction, sleek, portable design, and high-performance M-series chips.'})
    })
})