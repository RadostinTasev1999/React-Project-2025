import request from "../utils/request"

const baseUrl = 'http://localhost:3030/users'

export const useLogin = () => {

    const login = async(email, password) => {
       
        const payload = {
            email,
            password
        }

          const response = await request.post(`${baseUrl}/login`,payload)

          return response
    }

    return {
        login
    }

        
}

export const useRegister = () => {

    const register = async (email, username, password, rePassword) => {

        if (password !== rePassword) {
            throw new Error('Passwords do not match!')
        }

        const payload = {
            email,
            username,
            password,
            rePassword
        }

        const response = await request.post(`${baseUrl}/register`, payload)

        return response
    }

    return {
        register
    }
}

