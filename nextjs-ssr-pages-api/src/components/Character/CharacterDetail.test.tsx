import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';
import CharacterDetail from './CharacterDetail';
import styles from './CharacterCard.module.css';

describe('CharacterDetail Component', () => {
    test('renders as <p> with label and value', () => {
        render(<CharacterDetail label="Name" value="Luke Skywalker" />);

        // Проверяем, что элемент рендерится как <p>
        const element = screen.getByTestId('description-element');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('P');

        // Проверяем, что текст присутствует и корректен
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

        // Проверяем, что элемент имеет нужный класс
        expect(element).toHaveClass(styles.characterDetail);
    });

    test('renders as <li> without label', () => {
        render(<CharacterDetail value="Luke Skywalker" />);

        // Проверяем, что элемент рендерится как <li>
        const element = screen.getByTestId('description-element');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('LI');

        // Проверяем, что текст присутствует и корректен
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

        // Проверяем, что элемент имеет нужный класс
        expect(element).toHaveClass(styles.characterDetail);
    });

    test('renders correctly with empty value', () => {
        render(<CharacterDetail label="Vehicles" value="" />);

        // Проверяем, что элемент рендерится
        const element = screen.getByTestId('description-element');
        expect(element).toBeInTheDocument();

        // Проверяем, что текст присутствует и корректен (пустое значение)
        const strongElement = screen.getByText('Vehicles:');
        expect(strongElement).toBeInTheDocument();
        expect(strongElement.tagName).toBe('STRONG');

        // Проверяем, что элемент имеет нужный класс
        expect(element).toHaveClass(styles.characterDetail);
    });
});
