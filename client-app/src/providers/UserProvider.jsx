import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider(
    {children}
) {

    const [authData,setAuthData] = usePersistedState('auth',{})


    const userLoginHandler = (resultData) => {
        setAuthData(resultData)
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
        Provider component is special component that is used to make the 
        context value available to any child components that need it.
        We wrap the component tree and define a value prop, that will be
        passed down to the child components.
        
    */
}