import { describe, test, expect, vi } from 'vitest';
import {
    fetchFilmTitles,
    fetchHomeworldName,
    fetchVehicleNames,
    fetchStarshipNames,
} from './fetchPersonal';

// Мокирование глобальной функции fetch
global.fetch = vi.fn();

describe('API functions', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('fetchFilmTitles successfully fetches film titles', async () => {
        const filmUrls = [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
        ];
        const filmData = [
            { title: 'A New Hope' },
            { title: 'The Empire Strikes Back' },
        ];

        fetch.mockImplementation((url) => {
            const film = filmData.find((f) =>
                url.includes(filmUrls[filmData.indexOf(f)]),
            );
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(film),
            });
        });

        const titles = await fetchFilmTitles(filmUrls);
        expect(titles).toEqual(['A New Hope', 'The Empire Strikes Back']);
    });

    test('fetchHomeworldName successfully fetches homeworld name', async () => {
        const homeworldUrl = 'https://swapi.dev/api/planets/1/';
        const homeworldData = { name: 'Tatooine' };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(homeworldData),
        });

        const name = await fetchHomeworldName(homeworldUrl);
        expect(name).toEqual('Tatooine');
    });

    test('fetchVehicleNames successfully fetches vehicle names', async () => {
        const vehicleUrls = [
            'https://swapi.dev/api/vehicles/1/',
            'https://swapi.dev/api/vehicles/2/',
        ];
        const vehicleData = [
            { name: 'Sand Crawler' },
            { name: 'T-16 Skyhopper' },
        ];

        fetch.mockImplementation((url) => {
            const vehicle = vehicleData.find((v) =>
                url.includes(vehicleUrls[vehicleData.indexOf(v)]),
            );
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(vehicle),
            });
        });

        const names = await fetchVehicleNames(vehicleUrls);
        expect(names).toEqual(['Sand Crawler', 'T-16 Skyhopper']);
    });

    test('fetchStarshipNames successfully fetches starship names', async () => {
        const starshipUrls = [
            'https://swapi.dev/api/starships/1/',
            'https://swapi.dev/api/starships/2/',
        ];
        const starshipData = [{ name: 'X-wing' }, { name: 'TIE Advanced x1' }];

        fetch.mockImplementation((url) => {
            const starship = starshipData.find((s) =>
                url.includes(starshipUrls[starshipData.indexOf(s)]),
            );
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(starship),
            });
        });

        const names = await fetchStarshipNames(starshipUrls);
        expect(names).toEqual(['X-wing', 'TIE Advanced x1']);
    });

    test('fetchFilmTitles throws an error when fetch fails', async () => {
        const filmUrls = ['https://swapi.dev/api/films/1/'];

        fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchFilmTitles(filmUrls)).rejects.toThrow(
            'Failed to fetch film data from https://swapi.dev/api/films/1/',
        );
    });

    test('fetchVehicleNames throws an error when fetch fails', async () => {
        const vehicleUrls = ['https://swapi.dev/api/vehicles/1/'];

        fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchVehicleNames(vehicleUrls)).rejects.toThrow(
            'Failed to fetch vehicle data from https://swapi.dev/api/vehicles/1/',
        );
    });

    test('fetchStarshipNames throws an error when fetch fails', async () => {
        const starshipUrls = ['https://swapi.dev/api/starships/1/'];

        fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(fetchStarshipNames(starshipUrls)).rejects.toThrow(
            'Failed to fetch starship data from https://swapi.dev/api/starships/1/',
        );
    });
});
