import ReactDOM from 'react-dom/client';
import App from './components/App/App.tsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux';
import { ThemeProvider } from './ThemeContext.tsx';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <ErrorBoundary>
                <Header />
                <App />
                <Footer />
            </ErrorBoundary>
        </ThemeProvider>
    </Provider>,
);
