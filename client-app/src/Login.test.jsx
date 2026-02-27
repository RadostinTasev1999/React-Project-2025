import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Login from './components/login/Login'
import { MemoryRouter } from 'react-router';


// describe('Login component', () => {
//     render(<Login />);
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
// })

describe('Login component', () => {
    test('should render email and password inputs', () => {
        render(     
            <MemoryRouter>
                <Login />
            </MemoryRouter>
    )
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    })
    test('calls loginAction with valid data', async() => {
        const handleSubmit = vi.fn()
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

    })
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