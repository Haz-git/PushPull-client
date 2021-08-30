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
    padding?: number;
}

const GeneralDrawer = ({
    openBoolean,
    closeFunc,
    children,
    size = 'md',
    title = 'Modal',
    padding = 25,
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
                    drawer: {
                        borderRadius: '.4rem',
                        background: 'rgba(244, 244, 244, 1)',
                    },
                    header: {
                        marginBottom: '.5rem',
                    },
                }}
                opened={openBoolean}
                onClose={closeFunc}
                size={size}
                padding={padding}
                noCloseOnClickOutside
                noCloseOnEscape
            >
                {children}
            </Drawer>
        </>
    );
};

export default GeneralDrawer;
