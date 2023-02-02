import axios, { AxiosResponse } from 'axios';

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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NTI4NGVhMy1lZGUwLTQ1YjItYjg3Ni0xODY1MjRhZTY3M2IiLCJnaXZlbl9uYW1lIjoiQW50aG9ueSIsImZhbWlseV9uYW1lIjoiQmFpbGx5IiwianRpIjoiMjFiMjIyMWUtZjBmYS00MDkyLTgyYmUtM2I4NDE2ZmZiODcxIiwiZXhwIjoxNjc1MzQ5MDI0LCJpc3MiOiJXZWF0IiwiYXVkIjoiV2VhdCJ9.n3Tbto9RDZeZXz9NYvZCGuSG9wYCua6DwlSj1WS-ZXk',
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
                console.log("Bearer token expired, please login again");
                return Promise.reject(new Error("Bearer token expired, please login again"));
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
export const getItems = () => {
    return api.get<TodoLists>('/TodoItems');
};

export const postItem = (listId: number, title: string) => {
    return api.post<TodoLists>('/TodoItems', { listId: listId, title: title });
}

export const deleteItem = (id: number) => {
    return api.delete<TodoLists>(`/TodoItems/${id}`);
}

export const putItem = (id: number, title: string) => {
    return api.post<TodoLists>(`/TodoItems/${id}`, { title: title });
}


export default api;