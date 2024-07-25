import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux';
import { ThemeProvider } from './ThemeContext.tsx';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <header></header>
            <App />
            <footer></footer>
        </ThemeProvider>
    </Provider>,
);
