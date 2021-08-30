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
}

const GeneralModal = ({
    openBoolean,
    closeFunc,
    children,
    size = 'md',
    title = 'Modal',
}: IGeneralModal): JSX.Element => {
    return (
        <>
            <Modal
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
                overflow="outside"
            >
                {children}
            </Modal>
        </>
    );
};

export default GeneralModal;
