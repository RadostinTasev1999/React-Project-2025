import { useContext,useMemo,useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import request from "../utils/request";

// Custom React Hook
export default function useAuth() {

    const { 
        accessToken,
        email,
        _id,
     } = useContext(UserContext)

     // retrieve user authentication through UserContext object

    const requestWrapper = useCallback((method,url, data, options = {}) => {


            const authOption = {
                ...options,
                headers: {
                    'X-Authorization': accessToken,
                    ...options.headers
                }
            };
            /*
                We create a new authOption object that merges the provided options
                Add a custom X-Authorization header with the user's token if available.

            */

            return request.baseRequest(method, url, data, accessToken ? authOption : options);
            /*
                we call baseRequest which is a returned property from request method.
                if accessToken exists, the request includes the auth headers property
                otherwise, it falls back to options without adding X-Authorization
            */
    }, [accessToken])

    /*
    Creates a memoized function to make HTTP requests:

    */

    const requestObject = useMemo(() => ({
        get: requestWrapper.bind(null,'GET'),
        post: requestWrapper.bind(null,'POST'),
        put: requestWrapper.bind(null,'PUT'),
        patch:requestWrapper.bind(null,'PATCH'),
        delete: requestWrapper.bind(null,'DELETE')
    }),[requestWrapper])

    // builds an object with funciton for each HTTP method
    // each function is pre-configured to use a specific method
    // useMemo:  
    // - React hook returns a memoized value
    // - memoization is caching a value so that it does not need to be recalculated     
    // - the hook only runs when one of its dependencies updates (requestWrapper)   

    return {
        accessToken,
        email: email,
        userId:_id,
        isAuthenticated: !!accessToken,
        request: requestObject
    }
}