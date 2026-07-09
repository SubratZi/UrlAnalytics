import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const register= (data)=> api.post('/auth/register',data)
export const login = (data) => api.post('/auth/login', new URLSearchParams(data))
export const getMe = () => api.get('/auth/me')


export const getProjects = () => api.get('/projects')
export const getProject = (id) => api.get(`/projects/${id}`)
export const createProject = (data) => api.post('/projects', data)
export const deleteProject = (id) => api.delete(`/projects/${id}`)
export const getAnalytics = (id) => api.get(`/analytics/${id}`)
export const updateProject = (id,data) => api.patch(`/projects/${id}`,data)