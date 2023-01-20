import { useEffect } from "react";

import { postTodo, getTodos, putTodo, deleteTodo } from "../api";

interface TodoList {
    id: number;
    title: string;
    items: any[];
}

interface TodoLists {
    lists: TodoList[];
}




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