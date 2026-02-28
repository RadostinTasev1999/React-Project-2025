import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import  Register  from './Register'

describe('Register Component', () => {
    it('Should display Register', () => {
        render(
            <MemoryRouter>
                <Register heading='Register' />
            </MemoryRouter>
        )

        const textElement = screen.getByTestId('heading').textContent

        expect(textElement).toEqual('Register')
    })
    it('Should render email, username, password, rePassword inputs', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
    })
})
// This will search for the label that matches the given TextMatch, then find the element associated with that label