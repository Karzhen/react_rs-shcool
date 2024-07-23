import { useState, useEffect } from 'react';

export const useFetchFilmTitles = (filmUrls: string[]): string[] => {
    const [titles, setTitles] = useState<string[]>([]);

    useEffect(() => {
        const fetchTitles = async () => {
            const fetchedTitles = await Promise.all(
                filmUrls.map(async (url) => {
                    const response = await fetch(url);
                    const data = await response.json();
                    console.log(data.title);
                    return data.title;
                }),
            );
            setTitles(fetchedTitles);
        };

        fetchTitles();
    }, [filmUrls]);

    return titles;
};
