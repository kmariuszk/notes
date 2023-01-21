import React from 'react';
import Link from 'next/link';

/**
 * Card component which is displayed in the home page.
 *
 * @param {*} Note - note object to be displayed
 * @returns Card component
 */
function Card({ id, title }) {
    return (
        <div className="card" key={id}>
            <Link className="card-title" href={`/${id}`} style={{ textDecoration: 'none' }}>
                {title}
            </Link>

            <div className="card-buttons-container">
                <Link href={`/${id}`}>
                    <button className="card-button" type="button">View</button>
                </Link>

                <Link href={`/${id}/edit`}>
                    <button className="card-button" type="button">Edit</button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
