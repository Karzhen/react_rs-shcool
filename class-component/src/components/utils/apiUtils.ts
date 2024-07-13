export const fetchFilmTitle = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const data = await response.json();
    return data.title;
};

export const fetchHomeworldName = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
};
