/* eslint-disable no-underscore-dangle */
import React from 'react';
import fetch from 'isomorphic-unfetch';
import Card from '../components/Card';

/**
 * Index component responsible for creating a home page.
 *
 * @param {*} notes - list of all notes fetched from the database.
 * @returns Index component
 */
function Index({ notes }) {
  return (
    <>
      <h1>Notes</h1>
      <div className="grid wrapper">
        {
          notes.map((note) => (
            <Card
              key={note._id}
              id={note._id}
              title={note.title}
            />
          ))
        }
      </div>
    </>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { notes: data };
};

export default Index;
