import { postTodo, getTodos, putTodo, deleteTodo, postItem } from "../api";

export const fetchTodos = async () => {
    try {
        const response = await getTodos();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addTodo = async (title: string) => {
    try {
        const response = await postTodo(title);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTodoById = async (id: number) => {
    try {
        const response = await deleteTodo(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTodo = async (id: number, title: string) => {
    try {
        const response = await putTodo(id, title);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const addTodoItem = async (listId: number, title: string) => {
    try {
        const response = await postItem(listId, title);
        return response.data;
    } catch (error) {
        throw error;
    }
}