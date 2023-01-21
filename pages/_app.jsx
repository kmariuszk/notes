import React from 'react';
import Layout from '../components/Layout';
import style from '../styles/style.css';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
    return (
        <Layout style={style}>
            <Component {...pageProps} />
        </Layout>
    );
}
