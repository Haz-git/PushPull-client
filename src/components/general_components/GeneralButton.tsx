import React from 'react';
import { createUseStyles } from 'react-jss';
import { Button, theming } from '@mantine/core';

const useStyles = createUseStyles(
    (theme) => ({
        buttonClass: {
            boxShadow: theme.shadows.md,

            '&:hover': {
                backgroundColor: 'red',
            },
        },
    }),
    { theming }
);

const GeneralButton = () => {
    const classes = useStyles();

    return (
        <Button size="lg" classNames={{ root: classes.buttonClass }}>
            Button
        </Button>
    );
};

export default GeneralButton;
