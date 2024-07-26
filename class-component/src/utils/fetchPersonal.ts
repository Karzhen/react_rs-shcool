export const fetchFilmTitles = async (
    filmUrls: string[],
): Promise<string[]> => {
    const fetchedTitles = await Promise.all(
        filmUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch film data from ${url}`);
            }
            const data = await response.json();
            return data.title;
        }),
    );
    console.log(fetchedTitles);
    return fetchedTitles;
};

export const fetchHomeworldName = async (url: string): Promise<string> => {
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data.name;
};

export const fetchVehicleNames = async (
    vehicleUrls: string[],
): Promise<string[]> => {
    const vehicleNames = await Promise.all(
        vehicleUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch vehicle data from ${url}`);
            }
            const data = await response.json();
            return data.name;
        }),
    );
    return vehicleNames;
};

export const fetchStarshipNames = async (
    starshipUrls: string[],
): Promise<string[]> => {
    const starshipNames = await Promise.all(
        starshipUrls.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch starship data from ${url}`);
            }
            const data = await response.json();
            return data.name;
        }),
    );
    return starshipNames;
};
