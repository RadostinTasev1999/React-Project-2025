import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { expect, it, describe, vi } from 'vitest'
import Login from './Login'
import { MemoryRouter } from 'react-router';

const mockLogin = vi.hoisted(() => 
    vi.fn().mockResolvedValue({
            "email": "peter@abv.bg",
            "username": "Peter",
            "_id": "35c62d76-8152-4626-8712-eeb96381bea8",
            "accessToken": "fb4638389767ea3df7f2ee17a31277286d8f55880e1cc1cc5e002f6bfbf81c15"
    })
) 



vi.mock('../../api/authApi.js', () => ({
    useLogin: () => ({
        login: mockLogin
    })
}));

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
// -----------------------------------------------------------------

    it('Should call login with valid email and password on form submit',async () => {

        const user = userEvent.setup();
        
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

       // vi.waitUntil(() => document.getElementById('login'));

       await user.type(screen.getByLabelText(/email/i), 'peter@abv.bg');
       await user.type(screen.getByLabelText(/password/i), '123456');
       await user.click(screen.getByRole('button', { type: 'submit'}))

        // Assert that post was called:
        expect(mockLogin).toHaveBeenCalled();

        expect(mockLogin).toHaveBeenCalledTimes(1);

        expect(mockLogin).toHaveBeenCalledWith('peter@abv.bg', '123456');

        expect(mockLogin).toHaveResolvedWith({
            "email": "peter@abv.bg",
            "username": "Peter",
            "_id": "35c62d76-8152-4626-8712-eeb96381bea8",
            "accessToken": "fb4638389767ea3df7f2ee17a31277286d8f55880e1cc1cc5e002f6bfbf81c15"
    })

    })

})

/*
test cases ideas:

1. Sign in button submits form with correct data

2. Check if forms validate input properly

3. Confirm API is called with right values

4. Handle errors like network failures


*/


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