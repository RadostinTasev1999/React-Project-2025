import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import  Register  from './Register'

const mockRegister = vi.hoisted(() => 
    vi.fn().mockResolvedValue(
        {
            "email": "peterjohnson@gmail.com",
            "username": "PeterJohnson",
            "password": "12345678910",
            "rePassword": "12345678910",
            "_createdOn": 1772552267181,
            "_id": "0d005675-77ca-4b04-81d9-6cf71f94f540",
            "accessToken": "6e7cc034b9cecad4360a8bb1cf4064b08787799a1d36c6966c316a402e2fbff6"
        }
    )
)

vi.mock('../../api/authApi.js', () => ({
    useRegister: () => ({
        register: mockRegister
    })
}))

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
    it('Should call register on submitting form with valid data', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        await user.type(screen.getByLabelText(/email address/i), 'peterjohnson@gmail.com')
        await user.type(screen.getByLabelText(/username/i), 'PeterJohnson')
        await user.type(screen.getByLabelText(/^password$/i), '12345678910')
        await user.type(screen.getByLabelText(/^repeat password$/i), '12345678910')
        await user.click(screen.getByRole('button', { type: 'submit' }))

        expect(mockRegister).toHaveBeenCalled();
        expect(mockRegister).toHaveBeenCalledTimes(1);
        expect(mockRegister).toHaveBeenCalledWith('peterjohnson@gmail.com','PeterJohnson','12345678910','12345678910')
        // expect(mockRegister).toReturnWith({
        //     "email": "peterjohnson@gmail.com",
        //     "username": "PeterJohnson",
        //     "password": "12345678910",
        //     "rePassword": "12345678910",
        //     "_createdOn": 1772552267181,
        //     "_id": "0d005675-77ca-4b04-81d9-6cf71f94f540",
        //     "accessToken": "6e7cc034b9cecad4360a8bb1cf4064b08787799a1d36c6966c316a402e2fbff6"
        // })
    })
})
// This will search for the label that matches the given TextMatch, then find the element associated with that label