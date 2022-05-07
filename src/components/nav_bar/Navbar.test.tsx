import React from 'react';
import { TestWrapper } from '../../tests/test.utils';
import { render } from '@testing-library/react';
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
    test('Should render at all times', () => {
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

describe('when isUserLogged is false', () => {
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

//To be cont.
