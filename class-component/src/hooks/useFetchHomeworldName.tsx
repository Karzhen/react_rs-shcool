import { useState, useEffect } from 'react';

export const useFetchHomeworldName = (url: string): string => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        const fetchName = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setName(data.name);
        };

        fetchName();
    }, [url]);

    return name;
};
