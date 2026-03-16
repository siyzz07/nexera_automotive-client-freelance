import { authAxiosInstance } from "../../config/axiosConfig"



export const login = async(data:{email:string , password:string}) =>{

    const response = await authAxiosInstance.post('auth/admin/login',data)
    return response

}

