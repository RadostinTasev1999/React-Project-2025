import { render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Login from './Login'
import { MemoryRouter } from 'react-router';



// -----------------------------------------------------------------------
// describe('Login component', () => {
//     test('should render email and password inputs', () => {
//         render(     
//             <MemoryRouter>
//                 <Login />
//             </MemoryRouter>
//     )
//         expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//         expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     })
//     test('calls loginAction with valid data', async() => {
//         const handleSubmit = vi.fn()
//         const user = userEvent.setup();git 

//         render(
//             <MemoryRouter>
//                 <Login onSubmit={handleSubmit} />
//             </MemoryRouter>
//         )

//         await user.type(screen.getByLabelText(/email/i), 'peter@abv.bg');
//         await user.type(screen.getByLabelText(/password/i), '123456');
//         await user.click(screen.getByRole('button', { type: /submit/i}));

//         expect(handleSubmit).toHaveBeenCalledWith('peter@abv.bg', '123456')

//     })
// })
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