import { login } from "../api";

export const getUserData = () => {
    const lastname = localStorage.getItem('lastname');
    const firstname = localStorage.getItem('firstname');
    return { lastname, firstname };
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await login(username, password);
        return response;
    } catch (error) {
        throw error;
    }
};