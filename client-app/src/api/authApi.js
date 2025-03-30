import request from "../utils/request"

const baseUrl = 'http://localhost:3030/users'

export const useLogin = () => {
    const login = async(email, password) => {
       
        const payload = {
            email,
            password
        }

        console.log('Payload is:', payload)

          const response = await request.post(`${baseUrl}/login`,payload)
          console.log('Response data is:', response)

          return response
    }

    return {
        login
    }

        
}