import React from 'react';
import { TestWrapper } from '../../tests/test.utils';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

/*
 * Testing Navbar:
 * - Should render at all times.
 * - Check if isUserLoggedIn boolean is true -> render UserDropdown
 * - If isUserLoggedIn boolean is false -> render auth options
 * - Clicking auth options should open authentication drawer.
 */

describe('Navbar', () => {
    test('should render at all times', () => {
        expect(() =>
            render(
                <TestWrapper>
                    <Navbar
                        isUserLoggedIn={false}
                        toggleAuthDrawerWithView={(state, view) => {}}
                    />
                </TestWrapper>
            )
        ).not.toThrow();
    });
});

describe('when isUserLoggedin is false', () => {
    test('should render both login and signup buttons', () => {
        render(
            <TestWrapper>
                <Navbar
                    isUserLoggedIn={false}
                    toggleAuthDrawerWithView={(state, view) => {}}
                />
            </TestWrapper>
        );

        expect(
            screen.getByRole('button', {
                name: /Log in/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('button', {
                name: /Sign up/i,
            })
        ).toBeInTheDocument();
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

        expect(queryByTestId(/userDropdown/i)).toBeInTheDocument();
    });
});
