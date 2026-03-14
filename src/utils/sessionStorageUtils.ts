export const setToken = (token: string) => {
    sessionStorage.setItem('Token', token);
};



export const getToken = () => {
    return sessionStorage.getItem('Token');
};



export const removeToken = () => {
    sessionStorage.removeItem('Token');
};
