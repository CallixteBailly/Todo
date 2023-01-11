import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Task from './Task';

const validationSchema = Yup.object().shape({
    newTask: Yup.string()
        .matches(/^[a-zA-Z0-9\s]*$/, 'Text must not contain special characters')
        .min(3, 'Text must be at least 3 characters long!')
        .max(25, 'Text must be at max 25 characters long!')
        .test('not-empty-spaces', 'Text must not contain only spaces',
            value => !(value!.trim().length === 0))
        .required('Required'),
});

function List(props) {
    const [tasks, setTasks] = useState(props.tasks);
    return (
        <>
            <p>To-do List:</p>
            {tasks.length === 0 ? (
                <p>No tasks to display</p>
            ) : (
                <ul>
                    {tasks.map((task: any, index: any) => (
                        <Task item={task} key={index} />
                    ))}
                </ul>
            )}
            <Formik
                initialValues={{ newTask: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTasks([...tasks, values.newTask]);
                    setSubmitting(false);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field type="text" name="newTask" />
                        {errors.newTask && touched.newTask && (
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
