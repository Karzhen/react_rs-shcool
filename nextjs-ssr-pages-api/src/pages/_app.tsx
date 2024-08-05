import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/ThemeContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '../index.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;