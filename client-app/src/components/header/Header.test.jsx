import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import Header from "./Header";
import GuestGuard from "../guards/GuestGuard";
import useAuth from "../../hooks/useAuth";
import AuthGuard from "../guards/AuthGuard";
import { exec } from "child_process";
import { UserContext } from "../../contexts/UserContext";


const mockAuthValue = {
    _id: '',
    email: '',
    username: '',
    accessToken: true,
    userLoginHandler: vi.fn(),
    userLogoutHandler: vi.fn()

   }

vi.mock('../../hooks/useAuth.js', () => ({
    default: vi.fn()
}));

vi.mock('../../contexts/useUserContext', () => ({
    data: vi.fn()
}))


describe("Header Component", () => {
    it('should render navigation bar with correct links for guest user', () => {

        useAuth.mockReturnValue({ isAuthenticated: false })

        render(
            <MemoryRouter>
                <Routes>
                    <Route element={<GuestGuard />}>
                        <Route path='/' element={<Header />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        const navElement = screen.getByRole('navigation', {'name': 'Global'})
        const imgElement = screen.getByRole('img', {'name': 'navigation-logo'})
        const allPostsLink = screen.getByRole('link', {'name': 'All Posts'})
        const loginLink = screen.getByRole('link', {'name': 'Log in'})
        const registerLink = screen.getByRole('link', {'name': 'Register'})

        expect(navElement).toBeInTheDocument()
        expect(imgElement).toBeInTheDocument()
        expect(allPostsLink).toBeInTheDocument()
        expect(loginLink).toBeInTheDocument()
        expect(registerLink).toBeInTheDocument()
        // -------------------------------------------------------------------
        /*
        const logoutLink = screen.getByRole('link', {'name': 'Log out'})
        const createPostLink = screen.getByRole('link', {'name': 'Create Post'})
        const adminLink = screen.getByRole('link', {'name': 'Admin'})
        */

    })
    it.only('should render navigation bar with correct links for authenticated user',() => {
        render(
            <UserContext.Provider value={mockAuthValue}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Header />}/>            
                    </Routes>
            </MemoryRouter>
            </UserContext.Provider>
            
        )

        const navElement = screen.getByRole('navigation', {'name': 'Global'})
        const imgElement = screen.getByRole('img', {'name': 'navigation-logo'})
        const logoutLink = screen.getByRole('link', {'name': 'Log out'})
        const createPostLink = screen.getByRole('link', {'name': 'Create Post'})
        const adminLink = screen.getByRole('link', {'name': 'Admin'})

        // Assertions
        expect(navElement).toBeInTheDocument();
        expect(imgElement).toBeInTheDocument();
        expect(logoutLink).toBeInTheDocument();
        expect(createPostLink).toBeInTheDocument();
        expect(adminLink).toBeInTheDocument();
    })
})