import * as React from 'react';

//Components:
import { Modal } from '@mantine/core';

//Styles:
import styled from 'styled-components';

//Interfaces:
interface IGeneralModal {
    openBoolean: boolean;
    closeFunc: () => void;
    children: React.ReactNode;
    size?: string;
    title?: string;
    closeOnClickOutside?: boolean;
    hideCloseButton?: boolean;
}

const GeneralModal = ({
    openBoolean,
    closeFunc,
    children,
    size = 'md',
    title = 'Modal',
    closeOnClickOutside = true,
    hideCloseButton = false,
}: IGeneralModal): JSX.Element => {
    return (
        <>
            <Modal
                centered={false}
                hideCloseButton={hideCloseButton}
                closeOnClickOutside={closeOnClickOutside}
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
                        padding: '0rem .5rem',
                    },
                }}
                opened={openBoolean}
                onClose={closeFunc}
                size={size}
                overflow="outside"
            >
                {children}
            </Modal>
        </>
    );
};

export default GeneralModal;
