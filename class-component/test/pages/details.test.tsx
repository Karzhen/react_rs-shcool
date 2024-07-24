// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { MemoryRouter, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
// import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
// import '@testing-library/jest-dom';
// import Details from '../../src/pages/Details';
// import { fetchHomeworldName, fetchFilmTitles, fetchVehicleNames } from '../../src/utils/fetchPersonal';

// vi.mock('react-router-dom', () => ({
//     ...vi.importActual('react-router-dom'),
//     useLocation: vi.fn(),
//     useParams: vi.fn(),
//     useNavigate: vi.fn(),
// }));

// vi.mock('../../src/utils/fetchPersonal', () => ({
//     fetchHomeworldName: vi.fn(),
//     fetchFilmTitles: vi.fn(),
//     fetchVehicleNames: vi.fn(),
// }));

// const mockCharacter = {
//     name: 'Luke Skywalker',
//     height: '172',
//     mass: '77',
//     hair_color: 'blond',
//     skin_color: 'fair',
//     eye_color: 'blue',
//     birth_year: '19BBY',
//     gender: 'male',
//     homeworld: 'https://swapi.dev/api/planets/1/',
//     films: ['https://swapi.dev/api/films/1/'],
//     vehicles: ['https://swapi.dev/api/vehicles/14/'],
// };

// const mockHomeworld = 'Tatooine';
// const mockFilms = ['A New Hope'];
// const mockVehicles = ['Snowspeeder'];

// describe('Details Component', () => {
//     beforeEach(() => {
//         vi.resetAllMocks();
//         (useLocation as vi.Mock).mockReturnValue({ search: '?search=test&page=1' });
//         (useParams as vi.Mock).mockReturnValue({ id: '1' });
//         (useNavigate as vi.Mock).mockReturnValue(vi.fn());
//         (fetchHomeworldName as vi.Mock).mockResolvedValue(mockHomeworld);
//         (fetchFilmTitles as vi.Mock).mockResolvedValue(mockFilms);
//         (fetchVehicleNames as vi.Mock).mockResolvedValue(mockVehicles);

//         global.fetch = vi.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve(mockCharacter),
//             }),
//         );
//     });

//     afterEach(() => {
//         vi.restoreAllMocks();
//     });

//     test('renders character details after successful fetch', async () => {
//         render(
//             <MemoryRouter>
//                 <Details />
//             </MemoryRouter>
//         );

//         await waitFor(() => {
//             expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
//         });
//         expect(screen.getByText('Height: 172')).toBeInTheDocument();
//         expect(screen.getByText('Mass: 77')).toBeInTheDocument();
//         expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
//         expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
//         expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
//         expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
//         expect(screen.getByText('Gender: male')).toBeInTheDocument();
//         expect(screen.getByText('Homeworld: Tatooine')).toBeInTheDocument();
//         expect(screen.getByText('A New Hope')).toBeInTheDocument();
//         expect(screen.getByText('Snowspeeder')).toBeInTheDocument();
//     });

//     test('renders error message on fetch failure', async () => {
//         global.fetch = vi.fn(() =>
//             Promise.reject(new Error('Failed to fetch character details'))
//         );

//         render(
//             <MemoryRouter>
//                 <Details />
//             </MemoryRouter>
//         );

//         await waitFor(() => {
//             expect(screen.getByText('Error: Failed to fetch character details')).toBeInTheDocument();
//         });
//     });

//     test('navigates back to previous page on close button click', async () => {
//         const navigate = vi.fn();
//         (useNavigate as vi.Mock).mockReturnValue(navigate);

//         render(
//             <MemoryRouter>
//                 <Details />
//             </MemoryRouter>
//         );

//         await waitFor(() => {
//             expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
//         });

//         fireEvent.click(screen.getByText('Close'));

//         expect(navigate).toHaveBeenCalledWith('/?search=test&page=1');
//     });
// });
