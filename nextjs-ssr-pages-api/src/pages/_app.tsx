import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import {store, wrapper} from '@/redux/store';
import { ThemeProvider } from '@/ThemeContext';
import '../index.css';
import Layout from "@/components/Layout/Layout";
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";

export type PageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: PageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
            </ThemeProvider>
        </Provider>
    );
}

// export default wrapper.withRedux(MyApp);