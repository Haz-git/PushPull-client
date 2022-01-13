import * as React from 'react';

//Components:
import { Modal } from '@mantine/core';
import { LoadingOverlay } from '@mantine/core';

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
    isLoading?: boolean;
}

const GeneralModal = ({
    openBoolean,
    closeFunc,
    children,
    size = 'md',
    title = 'Modal',
    closeOnClickOutside = true,
    hideCloseButton = false,
    isLoading = false,
}: IGeneralModal): JSX.Element => {
    return (
        <>
            <Modal
                centered={false}
                hideCloseButton={hideCloseButton}
                closeOnClickOutside={closeOnClickOutside}
                zIndex={99}
                title={title}
                styles={{
                    modal: {
                        position: 'relative',
                    },
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
                <LoadingOverlay
                    visible={isLoading}
                    overlayColor="#d6d6d6"
                    overlayOpacity={0.6}
                    loaderProps={{ size: 'lg', color: 'orange' }}
                    transitionDuration={500}
                />
                <>{children}</>
            </Modal>
        </>
    );
};

export default GeneralModal;
