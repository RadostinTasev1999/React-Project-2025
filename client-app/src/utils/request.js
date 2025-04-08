const request = async (method, url, data, options = {}) => {
    
    if (method !== 'GET') {
        options.method = method
    }
    // if method is not GET, we explicitly set the method in options object

    if (data) {
        options = {
            ...options,
            headers: {
                'Content-Type':'application/json',
                ...options.headers
               
            },
            body: JSON.stringify(data)
        }
        // if data is passed, options object will include Content-Type: application/json header.
        // we stringify the data into JSON format and attach it as body
        // this allows the back-end to parse the request as JSON
    }

     /*
                headers: {
                    'X-Authorization': accessToken,
                    ...options.headers
                }
     */

    const response = await fetch(url,options);
    // Use fetch funciton to make the actual http request
    const responseContentType = response.headers.get('Content-Type')
     // check if the response includes Content-Type header.
    if (!responseContentType) {
        return;
    }
    // if response does not include Content-Type header the function will stop execution.

    //! Error handling
    if (!response.ok) {
        const result = await response.json()

        throw result;
    };

    /*
    if the HTTP response status is not 200 OK it parses the error message from the response
    and throw the error
    */

    const result = await response.json()

    return result;

    // if the request was successful, it parses the response body as JSON and returns it.


}
/*
This exports an object with methods bound to specific HTTP verbs
*/
export default {
    get: request.bind(null,'GET'),
    post: request.bind(null,'POST'),
    put: request.bind(null,'PUT'),
    delete: request.bind(null,'DELETE'),
    patch: request.bind(null,'PATCH'),
    baseRequest:request
}
/*
.bind() - creates a new version of the request function where the first argument method is pre-filled as 'GET'
example: request.get() - first argument is pre-filled 'GET'


baseRequest: request - gives full access to the original funciton
*/

/*
This code defines reusable HTTP request function that exports a set of pre-configured methods.

*/