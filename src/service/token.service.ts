import jwt from 'jsonwebtoken'
const TOKEN ='token'
const userData='';
export const setToken = (token_data:any)=>{
    sessionStorage.setItem(TOKEN,token_data)
}

export const getToken = () => {
    return sessionStorage.getItem(TOKEN)
}

export const removeToken = ()=>{
    sessionStorage.removeItem('token')
}

export const logout = ()=>{
    sessionStorage.clear()
}

export  const isAuthenticated = ()=>{
    if(sessionStorage.getItem('token')){
        return true
    }
    return  false
}
