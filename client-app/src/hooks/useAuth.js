import { useContext,useMemo,useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import request from "../utils/request";

export default function useAuth() {

    const { accessToken, ...authData } = useContext(UserContext)

    const requestWrapper = useCallback((method,url, data, options = {}) => {


            const authOption = {
                ...options,
                headers: {
                    'X-Authorization': accessToken,
                    ...options.headers
                }
            };

            console.log('accessToken:', accessToken)

            return request.baseRequest(method, url, data, accessToken ? authOption : options);
            
    }, [accessToken])

    const requestObject = useMemo(() => ({
        get: requestWrapper.bind(null,'GET'),
        post: requestWrapper.bind(null,'POST'),
        put: requestWrapper.bind(null,'PUT'),
        delete: requestWrapper.bind(null,'DELETE')
    }),[requestWrapper])

    return {
        ...authData,
        accessToken,
        email: authData.email,
        userId:authData._id,
        isAuthenticated: !!authData.accessToken,
        request: requestObject
    }
}