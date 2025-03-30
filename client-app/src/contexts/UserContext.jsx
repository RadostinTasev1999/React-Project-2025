import { createContext, useContext } from 'react';

export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});

export function useUserContext(){

    const data = useContext(UserContext)
    // useContext lets you read and subscribe to context from your component

    return data
}