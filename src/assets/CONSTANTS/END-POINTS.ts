const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";

export const AuthorizedToken = { headers: { Authorization: `Bearer ${localStorage.token}` } };

const BASE_USERS =`${BASE_URL}/Users`;

export const USERS_URLS ={
    login: `${BASE_USERS}/Login`,
    register: `${BASE_USERS}/Register`,
    delete: (id:any) => `${BASE_USERS}/${id}`,
    resetRequest: `${BASE_USERS}/Reset/Request`,
    reset: `${BASE_USERS}/Reset`,
    getlist: `${BASE_USERS}`,
}

const BASE_CATEGORIES =`${BASE_URL}/Category/`;

export const CATEGORIES_URLS ={
    getlist: `${BASE_CATEGORIES}`,
    delete: (id: any)=> `${BASE_CATEGORIES}/${id}`,
}


const BASE_RECIPIES = `${BASE_URL}/Recipe/`
export const RCIPIES_URLS ={
    getlist: `${BASE_RECIPIES}`,
    delete: (id: any)=> `${BASE_RECIPIES}/${id}`,
}
