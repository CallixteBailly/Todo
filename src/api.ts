import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

interface TodoList {
    id: number;
    title: string;
    items: any[];
}

interface TodoLists {
    lists: TodoList[];
}

const api = axios.create({
    baseURL: 'https://localhost:7049',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

// Ajouter un header d'autorisation
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Ajouter un intercepteur pour gérer les erreurs
api.interceptors.response.use(
    (response: AxiosResponse<TodoLists>) => {
        return response;
    },
    (error: any) => {
        if (error.response) {
            if (error.response.status === 401) {
                return Promise.reject(new Error("Your account is expired, please login again"));
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
        return Promise.reject(error);
    },
);



// Fonction pour obtenir la liste des todos
export const getTodos = () => {
    return api.get<TodoLists>('/TodoLists');
};

export const postTodo = (title: string) => {
    return api.post<TodoLists>('/TodoLists', { title: title });
}

export const deleteTodo = (id: number) => {
    return api.delete<TodoLists>(`/TodoLists/${id}`);
}

export const putTodo = (id: number, title: string) => {
    return api.post<TodoLists>(`/TodoLists/${id}`, { title: title });
}

// Fonction pour obtenir la liste des todos
export const getItems = async () => {
    return await api.get<TodoLists>('/TodoItems');
};

export const postItem = async (listId: number, title: string) => {
    return await api.post<TodoLists>('/TodoItems', { listId: listId, title: title });
}

export const deleteItem = async (id: number) => {
    return await api.delete<TodoLists>(`/TodoItems/${id}`);
}

export const putItem = async (id: number, title: string) => {
    return await api.post<TodoLists>(`/TodoItems/${id}`, { title: title });
}

export const login = async (email: string, password: string) => {
    const response = await api.post('/authentication/login', { Email: email, Password: password });
    const { token, firstName, lastName } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('firstname', firstName);
    localStorage.setItem('lastname', lastName);

    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
export default api;