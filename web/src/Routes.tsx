
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Pages/Landing';
import TeachersForm from './Pages/TeachersForm';
import TeachersList from './Pages/TeachersList';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeachersForm} />
            <Route path="/give-classes" component={TeachersList} />
        </BrowserRouter>
    );
}

export default Routes;