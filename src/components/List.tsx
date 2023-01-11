import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik'; // Formik est une librairie qui permet de faciliter la gestion des formulaires en React
import * as Yup from 'yup'; // Yup est une librairie de validation de formulaire
import Task from './Task'; // Composant Task

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

// Composant List 
function List(props) {
    const [tasks, setTasks] = useState(props.tasks); // On utilise un state pour stocker les tâches qui sont passées en propriété à ce composant
    return (
        <>
            <p>To-do List:</p>
            {tasks.length === 0 ? ( // On vérifie si la liste de tâches est vide,
                <p>No tasks to display</p>
            ) : (
                <ul>
                    {tasks.map((task: any, index: any) => (
                        <Task item={task} key={index} /> // Si non on affiche une liste de tâches en utilisant le composant
                    ))}
                </ul>
            )}
            <Formik
                initialValues={{ newTask: '' }} // On définit les valeurs initiales pour le champ newTask
                validationSchema={validationSchema} // On utilise notre schéma de validation pour valider les données du formulaire
                onSubmit={(values, { setSubmitting }) => { // On définit une fonction de soumission pour gérer la soumission du formulaire
                    setTasks([...tasks, values.newTask]); // On ajoute la nouvelle tâche à la liste de tâches
                    setSubmitting(false); // On met setSubmitting à false pour signaler à Formik que la soumission est terminée
                }}
            >
                {({ errors, touched }) => ( // On utilise les propriétés errors et touched fournies par Formik pour gérer l'affichage des erreurs de validation
                    <Form>
                        <Field type="text" name="newTask" /> // On ajoute un champ pour entrer une nouvelle tâche
                        {errors.newTask && touched.newTask && ( // Si il y a des erreurs pour le champ newTask, on les affiche à l'utilisateur
                            <div className="error">{errors.newTask}</div>
                        )}
                        <button type="submit">Add task</button> // On ajoute un bouton submit pour soumettre le formulaire
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default List;
