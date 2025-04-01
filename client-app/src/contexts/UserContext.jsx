import { createContext, useContext } from 'react';

export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});
/*
Here we define the shared data that we want to provide across the component tree.

*/

export function useUserContext(){

    const data = useContext(UserContext)
    // useContext lets you read and subscribe to context from your component
    console.log('Data from UserContext is:',data)
    return data
}