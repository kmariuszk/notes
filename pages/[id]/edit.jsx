import { React, useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

/**
 * EditNote component which is a webpage allowing user to edit its notes.
 *
 * @param {*} note - Note object to be edited
 * @returns EditNote component
 */
function EditNote({ note }) {
  const [form, setForm] = useState({ title: note.title, description: note.description });
  // Keep tracking of when we actually submitting and when to display a loader
  const [isSubmitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  /**
   * Function to update the Note object in the database.
   */
  const updateNote = async () => {
    try {
      await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
        method: 'PUT',
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
   * Function which validates whether the editied note fulfills all of the Note criterias.
   *
   * @returns possible errors
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
   * Function which handles submitting changes of the note.
   *
   * @param {*} event - updated note event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const potentialErrors = validate();
    setErrors(potentialErrors);
    setSubmitting(true);
  };

  /**
   * Function which handles changes in the title and description field.
   *
   * @param {*} event - updated note event
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
        updateNote();
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  return (
    <div className="form-container">
      <h1>Update Note</h1>
      <div>
        {
          isSubmitting
            ? (
              <div className="loader--container">
                <div className="loader--spinner" />
              </div>
            )
            : (
              <form onSubmit={handleSubmit}>
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
                <button className="form-button" type="submit">Update</button>
              </form>
            )
        }
      </div>
    </div>
  );
}

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default EditNote;
