import { describe, it, vi, expect } from "vitest";

import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from "react-router";
import  Admin  from "./Admin"
import { UserContext } from "../../contexts/UserContext";

const mockedContext = {
    _id: '35c62d76-8152-4626-8712-eeb96381bea8',
    email:'peter@abv.bg',
    username: 'Peter',
    accessToken: '1c8f830401ee8624a7ae949625fa219c96db632fb44813a7408b69962e6bff8f',
    userLoginHandler: vi.fn(),
    userLogoutHandler: vi.fn()
}

describe('Admin Component',() => {
    it('should render Admin component with correct data', () => {

        render(
            <UserContext.Provider value={mockedContext}>
                <MemoryRouter initialEntries={["/admin"]}>
                    <Routes>
                        <Route path="/admin" element={<Admin />}/>
                    </Routes>           
                </MemoryRouter>
            </UserContext.Provider>         
        )

        // Assert
        expect(screen.getByRole('img', { name: 'admin-image' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { 'level' : 1, 'name': /peter@abv.bg/i})).toBeInTheDocument()
        expect(screen.getByRole('heading', { 'level' : 1, 'name': /peter@abv.bg/i})).toHaveTextContent(/^peter@abv.bg$/)
        const userParagraph = screen.getAllByRole('paragraph').find(link => link.getAttribute('class')?.includes('text-gray-600'))    
        expect(userParagraph).toBeInTheDocument();
        expect(userParagraph).toHaveTextContent(/^Peter$/);
        const memberParagraph = screen.getAllByRole('paragraph').find(link => link.getAttribute('class')?.includes('text-gray-500'))
        expect(memberParagraph).toBeInTheDocument()

    })
})