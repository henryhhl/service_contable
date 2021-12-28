import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import App from './app';

function AppRaiz() {
    return (
        <>
            <App />
        </>
    );
}

export default AppRaiz;

if (document.getElementById('appRaiz')) {
    ReactDOM.render(<AppRaiz />, document.getElementById('appRaiz'));
}
