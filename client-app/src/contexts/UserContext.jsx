import { createContext, useContext } from 'react';


/*
if you call useContext(UserContext) in a component without a Provider,
it will use this object.

We wrap the App with a <UserContext.Provider> and provide the actual
user data and functions.
*/
export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null
});

/*
createContext() - is a React function that creates a Context object
A Context allows you to share data between components without having to pass
props manually through the components in the component tree
*/
/*
Here we define the shared data that we want to provide across the component tree.

*/

export function useUserContext(){

    const data = useContext(UserContext)
    
    return data
}