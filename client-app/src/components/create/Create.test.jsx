import { describe, it, expect } from 'vitest'
import { render,screen } from '@testing-library/react'
import Create from './Create'
import { MemoryRouter } from 'react-router'
import '@testing-library/jest-dom'

describe('Create component',() => {
    it('Should render Create form', () => {
        render(
            <MemoryRouter>
                <Create heading="Start a discussion"/>
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