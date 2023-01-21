import { React, useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

/**
 * Component responsible for creating a webpage to create a new node.
 *
 * @returns NewNote component
 */
function NewNote() {
    const [form, setForm] = useState({ title: '', description: '' });
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    /**
     * Function which send a request to the database to create new note.
     */
    const createNote = async () => {
        try {
            await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Function validating provided note attributes.
     *
     * @returns list of possible errors
     */
    const validate = () => {
        const err = {};

        if (!form.title) {
            err.title = 'Title is required!';
        }
        if (!form.description) {
            err.description = 'Description is required!';
        }

        return err;
    };

    /**
     * Function handling submission of the newly created note.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const potentialErrors = validate();
        setErrors(potentialErrors);
        setSubmitting(true);
    };

    /**
     * Function handling changes in the title and description field.
     */
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            } else {
                setSubmitting(false);
            }
        }
    }, [errors]);

    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? (
                            <div className="loader--container">
                                <div className="loader--spinner" />
                            </div>
                        ) : (
                            <form className="form" onSubmit={handleSubmit}>
                                <label className="form-label" htmlFor="input-title">
                                    Title:
                                    <br />
                                    <input
                                        className="input-title"
                                        placeholder={
                                            errors.title
                                                ? errors.title
                                                : 'Title'
                                        }
                                        name="title"
                                        type="text"
                                        value={form.title}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </label>
                                <br />
                                <label className="form-label" htmlFor="input-description">
                                    Description:
                                    <br />
                                    <textarea
                                        className="input-description"
                                        placeholder={
                                            errors.description
                                                ? errors.description
                                                : 'Description'
                                        }
                                        name="description"
                                        type="text"
                                        value={form.description}
                                        onChange={(event) => handleChange(event)}
                                    />
                                </label>
                                <br />
                                <button className="form-button" type="submit">Create</button>
                            </form>
                        )
                }
            </div>
        </div>
    );
}

export default NewNote;
