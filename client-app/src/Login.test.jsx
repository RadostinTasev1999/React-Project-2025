import { render,screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest'
import Login from './components/login/Login'


// describe('Login component', () => {
//     render(<Login />);
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
// })

describe('Login component', () => {
    test('should render Login component', () => {
        render(<Login />)
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    })
})

/*
screen - 
getByText() - find by element text content
toBeInTheDocument() - Assert whether an element is present in the document or not.
*/