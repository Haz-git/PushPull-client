import * as React from 'react';

//Components:
import FilterColumn from './FilterColumn';
import { Drawer } from '@mantine/core';

//Styles:
import styled from 'styled-components';

//Interfaces:

interface IComponentProps {
    isOpen: boolean;
    closeFunc: (status: boolean) => void;
    isResultsLoaded: boolean;
    handleIsResultsLoaded: (status: boolean) => void;
    handleDrawerState: (status: boolean) => void;
}

const MobileFilterDrawer = ({
    isOpen,
    closeFunc,
    isResultsLoaded,
    handleIsResultsLoaded,
    handleDrawerState,
}: IComponentProps): JSX.Element => {
    return (
        <>
            <Drawer
                position="bottom"
                size="95vh"
                shadow="xs"
                opened={isOpen}
                onClose={() => closeFunc(false)}
                styles={{
                    root: {
                        overflow: 'hidden',
                    },
                    drawer: {
                        background: 'rgb(239, 239, 239)',
                        overflowY: 'scroll',
                        padding: '1rem 0rem',
                    },
                    header: {
                        marginBottom: '-.5rem',
                        marginRight: '1rem',
                    },
                }}
            >
                <FilterColumn
                    handleIsResultsLoaded={handleIsResultsLoaded}
                    isResultsLoaded={isResultsLoaded}
                    handleDrawerState={handleDrawerState}
                />
            </Drawer>
        </>
    );
};

export default MobileFilterDrawer;
