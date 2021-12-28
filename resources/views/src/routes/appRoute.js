
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppMain from '../layouts/appMain';

function AppRoute() {

    return (
        <BrowserRouter>
            <AppMain />
        </BrowserRouter>
    );
};

export default AppRoute;
