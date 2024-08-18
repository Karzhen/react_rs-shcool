import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import HookForm from './pages/HookForm/HookForm';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
                <Route path="/hook-form" element={<HookForm />} />
            </Routes>
        </Router>
    );
};

export default App;
