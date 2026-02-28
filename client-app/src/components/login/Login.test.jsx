import { render, screen } from '@testing-library/react';
//import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import Login from './Login'
import { MemoryRouter } from 'react-router';
import ReactDOM from 'react-dom/client'
import { describe } from 'node:test';

describe('Login Component', () => {
    it('Should display Sign in', () => {
        render(
            <MemoryRouter>
                <Login heading="Sign in"/>
            </MemoryRouter>   
        )

        const textElement = screen.getByTestId('heading').textContent
        
        expect(textElement).toEqual('Sign in')
    })
    it('Should render email and password inputs', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter> 
        )

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });


})


/*
screen - 
getByText() - find by element text content
toBeInTheDocument() - Assert whether an element is present in the document or not.
MemoryRouter - Does not interact with the real browser URL / Keeps routing history in memory / Provides the Router context needed by useNavigate()
vi.fn() - Creates a spy on a function. Every time a function is invoked,
          it stores its call arguments, returns and instances.
userEvent - https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent

Article: https://oneuptime.com/blog/post/2026-01-15-unit-test-react-vitest-testing-library/view
*/