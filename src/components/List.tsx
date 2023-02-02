import { useState, useEffect, useCallback } from 'react';

import { useQuery } from 'react-query';
import { Formik, Form, Field } from 'formik'; // Formik est une librairie qui permet de faciliter la gestion des formulaires en React
import * as Yup from 'yup'; // Yup est une librairie de validation de formulaire
import { fetchTodos, addTodo, deleteTodoById } from './TodoServices';
import Task from './Task';

// On définit notre schéma de validation pour le champ newTask
const validationSchema = Yup.object().shape({
    newTask: Yup.string() // on indique qu'on travaille sur un champ de type string
        .matches(/^[a-zA-Z0-9\s]*$/, 'Text must not contain special characters') // On vérifie que le champ ne contient pas de caractère spéciaux
        .min(3, 'Text must be at least 3 characters long!') // On vérifie que le champ a une longueur minimale de 3 caractères
        .max(25, 'Text must be at max 25 characters long!') // On vérifie que le champ a une longueur maximale de 25 caractères
        // .test('not-empty-spaces', 'Text must not contain only spaces', // On vérifie que le champ ne contient pas uniquement des espaces
        //     value => !(value!.trim().length === 0))
        .required('Required'), // Le champ est obligatoire
});

interface TodoList {
    id: number;
    title: string;
    items: any[];
}

interface TodoLists {
    lists: TodoList[];
}

// Composant List 
const List: React.FC = () => {
    const { data, isLoading, refetch } = useQuery('tasks', fetchTodos, {
        refetchOnWindowFocus: false,
    });
    
    const [error, setError] = useState('');

    const handleDelete = async (id: number) => {
        try {
            await deleteTodoById(id);
            refetch();
        } catch (error) {
            setError(error.message);
        }
    }

    const handleSubmit = async (newTask: string) => {
        try {
            await addTodo(newTask);
            refetch();
        } catch (error) {
            setError(error.message);
        }
    }

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <p>To-do List:</p>
            <Formik
                initialValues={{ newTask: '' }} // On définit les valeurs initiales pour le champ newTask
                validationSchema={validationSchema} // On utilise notre schéma de validation pour valider les données du formulaire
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values.newTask);
                    setSubmitting(false);
                }}
            >
                {({ errors, touched }) => ( // On utilise les propriétés errors et touched fournies par Formik pour gérer l'affichage des erreurs de validation
                    <Form >
                        <Field type="text" name="newTask" />
                        {errors.newTask && touched.newTask && ( // Si il y a des erreurs pour le champ newTask, on les affiche à l'utilisateur
                            <div className="error">{errors.newTask}</div>
                        )}
                        <button type="submit">Add task</button>
                    </Form>
                )}
            </Formik>
            {data?.lists && data?.lists.length === 0 ? ( // On vérifie si la liste de tâches est vide,
                <p>No Items to display</p>
            ) : (
                <>
                    <div>
                        {data?.lists.map((task: TodoList) => (
                            <>
                                <div key={task.id}>
                                    <div>
                                        <h1>Title: {task.title}</h1>
                                        <p>Id: {task.id}</p>
                                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                                    </div>
                                    <br></br>
                                    <div>
                                        <p>Add Items</p>
                                        <Task listId={task.id} items={task.items} />
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default List;
