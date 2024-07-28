import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage.tsx';
import NotFoundPage from '../../pages/NotFound/NotFound.tsx';
import Details from '../../pages/Details/Details.tsx';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="details/:id" element={<Details />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
