import * as React from 'react';

//Components:
import { Drawer } from '@mantine/core';

//Styles:

//Interfaces:

interface IGeneralDrawer {
    openBoolean: boolean;
    closeFunc: () => void;
    children: React.ReactNode;
    size?: string;
    title?: string;
}

const GeneralDrawer = ({
    openBoolean,
    closeFunc,
    children,
    size = 'md',
    title = 'Modal',
}: IGeneralDrawer): JSX.Element => {
    return (
        <>
            <Drawer
                title={title}
                styles={{
                    title: {
                        color: 'rgba(0, 0, 34, 1)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                    },
                    header: {
                        marginBottom: '.5rem',
                    },
                }}
                opened={openBoolean}
                onClose={closeFunc}
                size={size}
            >
                {children}
            </Drawer>
        </>
    );
};

export default GeneralDrawer;
