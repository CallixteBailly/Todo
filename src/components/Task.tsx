import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup'; // Yup est une librairie de validation de formulaire
import { deleteItem } from '../api';
import { addTodoItem } from './TodoServices';

const validationSchema = Yup.object().shape({
    newTask: Yup.string() // on indique qu'on travaille sur un champ de type string
        .matches(/^[a-zA-Z0-9\s]*$/, 'Text must not contain special characters') // On vérifie que le champ ne contient pas de caractère spéciaux
        .min(3, 'Text must be at least 3 characters long!') // On vérifie que le champ a une longueur minimale de 3 caractères
        .max(25, 'Text must be at max 25 characters long!') // On vérifie que le champ a une longueur maximale de 25 caractères
        .required('Required'), // Le champ est obligatoire
});

interface TodoItem {
    id: number;
    title: string;
    items: any[];
}

interface TodoItems {
    listId: number;
    items: TodoItem[];
}

const Task: React.FC<TodoItems> = (props) => {
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState('');

    function handleClick() {
        setIsCompleted(prevState => !prevState);
    }
    const handleDelete = async (id: number) => {
        try {
            await deleteItem(id);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div>
                <Formik

                    initialValues={{ newTask: '' }} // On définit les valeurs initiales pour le champ newTask
                    validationSchema={validationSchema} // On utilise notre schéma de validation pour valider les données du formulaire
                    onSubmit={(values, { setSubmitting }) => {
                        addTodoItem(props.listId, values.newTask);
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched }) => ( // On utilise les propriétés errors et touched fournies par Formik pour gérer l'affichage des erreurs de validation
                        <Form>
                            <Field type="text" name="newTask" />
                            {errors.newTask && touched.newTask && ( // Si il y a des erreurs pour le champ newTask, on les affiche à l'utilisateur
                                <div className="error">{errors.newTask}</div>
                            )}
                            <button type="submit">Add Item</button>
                        </Form>
                    )}
                </Formik>
                {props.items && props.items.length === 0 ? ( // On vérifie si la liste de tâches est vide,
                    <p>No tasks to display</p>
                ) : (
                    props.items?.map((item: TodoItem) => (
                        <>
                            <div key={item.id}>
                                <p>Title: {item.title}</p>
                                <p>Item: {item.id}</p>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                            <br></br>
                        </>
                    ))
                )}
            </div>
        </>
    )
}

export default Task;