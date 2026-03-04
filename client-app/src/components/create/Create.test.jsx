import { describe, it, expect,vi } from 'vitest'
import { render,screen } from '@testing-library/react'
import Create from './Create'
import { MemoryRouter, Route } from 'react-router'
import '@testing-library/jest-dom'
import AuthGuard from '../guards/AuthGuard'
import { Routes } from 'react-router'

vi.mock('../../hooks/useAuth.js', () => ({
    default: () => ({
      isAuthenticated: true
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
})