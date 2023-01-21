import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

/**
 * Layout component which the display common content of every page.
 * @param children - unique element of each page
 * @returns webpage with the layout component
 */
function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Note App</title>
            </Head>
            <Navbar />
            {children}
        </>
    );
}

export default Layout;
