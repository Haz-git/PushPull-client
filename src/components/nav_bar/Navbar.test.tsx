import React from 'react';
import { TestWrapper } from '../../tests/test.utils';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

/*
 * Testing Navbar:
 * - Should render at all times.
 * - Check if isUserLoggedIn boolean is true -> render UserDropdown
 * - If isUserLoggedIn boolean is false -> render auth options
 * - Clicking auth options should open authentication drawer.
 */

afterEach(() => cleanup);

describe('Navbar', () => {
    test('should render at all times', () => {
        const { queryByTestId } = render(
            <TestWrapper>
                <Navbar
                    isUserLoggedIn={false}
                    toggleAuthDrawerWithView={(state, view) => {}}
                />
            </TestWrapper>
        );
        expect(queryByTestId(/navbar/i)).toBeTruthy();
    });
});

describe('when isUserLoggedin is false', () => {
    test('should render both login and signup buttons', () => {
        const { getByText } = render(
            <TestWrapper>
                <Navbar
                    isUserLoggedIn={false}
                    toggleAuthDrawerWithView={(state, view) => {}}
                />
            </TestWrapper>
        );

        expect(() =>
            getByText(/Log in/i, { selector: 'button' })
        ).not.toThrow();

        expect(() =>
            getByText(/Sign up/i, { selector: 'button' })
        ).not.toThrow();
    });
});

describe('when isUserLoggedIn is true', () => {
    test('should render userDropdown', () => {
        const { queryByTestId } = render(
            <TestWrapper>
                <Navbar
                    isUserLoggedIn={true}
                    toggleAuthDrawerWithView={(state, view) => {}}
                />
            </TestWrapper>
        );

        expect(queryByTestId(/userDropdown/i)).toBeTruthy();
    });
});
