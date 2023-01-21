import Link from 'next/link';
import React from 'react';

/**
 * Navbar component.
 *
 * @returns navbar component
 */
function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/" className="navbar-brand" style={{ textDecoration: 'none' }}>
                Note App
            </Link>

            <Link href="/new" className="navbar-create" style={{ textDecoration: 'none' }}>
                Create note
            </Link>
        </nav>
    );
}

export default Navbar;
