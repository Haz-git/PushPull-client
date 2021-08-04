import * as React from 'react';

//Styles:
import { createUseStyles } from 'react-jss';
import { Container, theming } from '@mantine/core';

const useStyles = createUseStyles(
    (theme) => ({
        navbar__container: {
            boxShadow: theme.shadows.sm,
            padding: '1rem 1rem',
        },
        navbar__logo: {
            fontFamily: 'Lato, sans-serif',
            fontWeight: '700',
            fontSize: theme.fontSizes.sm,
            padding: '0',
            margin: '0',
        },
    }),
    { theming }
);

//Interfaces:

const Navbar = () => {
    const classes = useStyles();

    return (
        <nav className={classes.navbar__container}>
            <h1 className={classes.navbar__logo}>RankMyWorkout</h1>
        </nav>
    );
};

export default Navbar;
