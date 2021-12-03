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
    position?: 'right' | 'left' | 'top' | 'bottom' | undefined;
    background?: string;
}

const GeneralDrawer = ({
    openBoolean,
    closeFunc,
    children,
    size = 'md',
    title = 'Modal',
    padding = 25,
    position = 'left',
    background = 'rgba(244, 244, 244, 1)',
}: IGeneralDrawer): JSX.Element => {
    return (
        <>
            <Drawer
                position={position}
                title={title}
                styles={{
                    title: {
                        color: 'rgba(0, 0, 34, 1)',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                    },
                    drawer: {
                        overflowY: 'scroll',
                        borderRadius: '.4rem',
                        background: `${background}`,
                    },
                    header: {
                        marginBottom: '0rem',
                        padding: '.5rem .5rem',
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
