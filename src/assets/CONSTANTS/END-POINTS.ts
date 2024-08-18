const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";
export const IMG_URL ="https://upskilling-egypt.com:3006/"


export const AuthorizedToken = { headers: { Authorization: `Bearer ${localStorage.token}` } };

const BASE_USERS =`${BASE_URL}/Users`;

export const USERS_URLS ={
    login: `${BASE_USERS}/Login`,
    register: `${BASE_USERS}/Register`,
    delete: (id:any) => `${BASE_USERS}/${id}`,
    resetRequest: `${BASE_USERS}/Reset/Request`,
    reset: `${BASE_USERS}/Reset`,
    getlist: `${BASE_USERS}`,
    verify: `${BASE_USERS}/verify`,
}

export const BASE_CATEGORIES =`${BASE_URL}/Category/`;

export const CATEGORIES_URLS ={
    getlist: `${BASE_CATEGORIES}`,
    delete: (id: any)=> `${BASE_CATEGORIES}/${id}`,
    update: (id: any)=> `${BASE_CATEGORIES}/${id}`,
    
}


const BASE_RECIPIES = `${BASE_URL}/Recipe/`
export const RCIPIES_URLS ={
    getlist: `${BASE_RECIPIES}`,
    grtById:  (id: any)=> `${BASE_RECIPIES}/${id}`,
    delete: (id: any)=> `${BASE_RECIPIES}/${id}`,
    update: (id: any)=> `${BASE_RECIPIES}/${id}`,
    addnewrecipie : `${BASE_RECIPIES}`,
}


const BASE_USER_RECIPIES = `${BASE_URL}/userRecipe/`
export const USER_RECIPIES_URLS ={
    getlist: `${BASE_USER_RECIPIES}`,
    addtofav : `${BASE_USER_RECIPIES}`,
    delete: (id: any)=> `${BASE_USER_RECIPIES}/${id}`,
}