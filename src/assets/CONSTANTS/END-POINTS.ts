const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";
const BASE_USERS =`${BASE_URL}/Users`;

export const USERS_URLS ={
    login: `${BASE_USERS}/Login`,
    register: `${BASE_USERS}/Register`,
    delete: (id: any) => `${BASE_USERS}/${id}`,
    resetRequest: `${BASE_USERS}/Reset/Request`,
    reset: `${BASE_USERS}/Reset`,
}