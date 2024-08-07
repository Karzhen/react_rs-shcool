import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;