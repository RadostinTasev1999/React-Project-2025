import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider(
    {children}
) {

    const [authData,setAuthData] = usePersistedState('auth',{})


    const userLoginHandler = (resultData) => {
        console.log('UserLoginHandler result data is:', resultData)
        setAuthData(resultData)
        // We have saved the authData to localStorage and updated 
        // the authData state property

        // invoking setter function will trigger a re-render of the
        // component
    };

    const userLogoutHandler = () => {
        setAuthData({})
    };

    return (
        <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
            {children}
        </UserContext.Provider>
    )
    /*
    When stateProperty authData is changed, this will trigger a re-render of any
    components that consume the UserContext, including all the children inside
    the UserCOntext.Provider
    */

    /*
    UserContext.Provider - allows you to provide values to all components
                           in its child tree that need access to this data.
    */
    /*
    authData = {
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    }
    */

}