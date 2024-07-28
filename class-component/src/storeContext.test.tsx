// StoreContext.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import StoreContext from './storeContext';

// Тестовый компонент, который использует StoreContext
const TestComponent = () => {
    return (
        <StoreContext.Consumer>
            {(value) => <div data-testid="context-value">{value}</div>}
        </StoreContext.Consumer>
    );
};

describe('StoreContext', () => {
    test('provides the correct value to consuming components', () => {
        const testValue = 'test value';

        render(
            <StoreContext.Provider value={testValue}>
                <TestComponent />
            </StoreContext.Provider>,
        );

        expect(screen.getByTestId('context-value').textContent).toBe(testValue);
    });
});
