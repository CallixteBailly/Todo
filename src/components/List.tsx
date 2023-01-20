import { useState, useEffect, useCallback } from 'react';

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
        .test('not-empty-spaces', 'Text must not contain only spaces', // On vérifie que le champ ne contient pas uniquement des espaces
            value => !(value!.trim().length === 0))
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
    const [tasks, setTasks] = useState<TodoLists>(); // On utilise un state pour stocker les tâches qui sont passées en propriété à ce composant
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTodos()
            .then(data => {
                setTasks(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteTodoById(id);
            refresh();
        } catch (error) {
            setError(error.message);
        }
    }

    function refresh() {
        fetchTodos()
            .then(data => {
                setTasks(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    return (
        <>
            <p>To-do List:</p>
            {tasks && tasks.lists.length === 0 ? ( // On vérifie si la liste de tâches est vide,
                <p>No tasks to display</p>
            ) : (
                <ul>
                    {tasks?.lists.map((task: TodoList, index: number) => (
                        <>
                            <h3>{task.title}</h3>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                            <Task key={index} items={task.items} />
                        </>
                    ))}
                </ul>
            )}
            <Formik
                initialValues={{ newTask: '' }} // On définit les valeurs initiales pour le champ newTask
                validationSchema={validationSchema} // On utilise notre schéma de validation pour valider les données du formulaire
                onSubmit={(values, { setSubmitting }) => {
                    addTodo(values.newTask);
                    refresh();
                    setSubmitting(false);
                }}
            >
                {({ errors, touched }) => ( // On utilise les propriétés errors et touched fournies par Formik pour gérer l'affichage des erreurs de validation
                    <Form>
                        <Field type="text" name="newTask" />
                        {errors.newTask && touched.newTask && ( // Si il y a des erreurs pour le champ newTask, on les affiche à l'utilisateur
                            <div className="error">{errors.newTask}</div>
                        )}
                        <button type="submit">Add task</button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default List;
