import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { expect, it, describe } from 'vitest'
import Login from './Login'
import { MemoryRouter } from 'react-router';
import ReactDOM from 'react-dom/client'


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

//     it('Invoke loginAction with valid data', async () => {
        
//         const user = userEvent.setup();
// /*
// mock loginAction
// */

//         vi.spyOn()
// /*
// spyOn - observes a function’s behavior without changing it (unless you tell it to).
// Use vi.spyOn to track function calls and arguments while preserving the original behavior.
// */
//         render(
//             <MemoryRouter>
//                 <Login onSubmit={onSubmit}/>
//             </MemoryRouter>
//         )

//         await user.type(screen.getByLabelText(/email/i), 'admin@abv.bg')
//         await user.type(screen.getByLabelText(/password/i), 'admin')
//         await user.click(screen.getByRole('button'))
    
//         /*
//         screen.getByLabelText() - This will search for the label that matches the given TextMatch, then find the element associated with that label.
//         screen.getByRole() - Queries for elements with the given role
//         */
        
//         expect(onSubmit).toHaveBeenCalledWith('admin@abv.bg', 'admin');

//     })


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