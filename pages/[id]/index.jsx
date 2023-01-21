import fetch from 'isomorphic-unfetch';
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Note component which is displayed when user want to see the content of their note.
 *
 * @param {*} note - Note object to be displayed
 * @returns Note component
 */
function Note({ note }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    /**
     * Function which deletes the note in the database.
     */
    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: 'DELETE',
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting]);

    const handleDelete = async () => {
        setIsDeleting(true);
    };

    return (
        <div className="note-container">
            {
                isDeleting
                    ? (
                        <div className="loader--container">
                            <div className="loader--spinner" />
                        </div>
                    )
                    : (
                        <>
                            <h1>{note.title}</h1>
                            <p className="single-note-description">{note.description}</p>
                            <button className="single-note-delete" onClick={handleDelete} type="button">Delete</button>
                        </>
                    )
            }
        </div>
    );
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data };
};

export default Note;
