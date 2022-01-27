import * as React from 'react';
import { useState, useEffect, forwardRef } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import DateColumn from './DateColumn';
import { SheetsFooter } from './SheetsFooter';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section<IMainContainerProps>`
    width: ${({ width }) => `${width - 225}px`};
    position: relative;
    background: #ffffff;
    margin-bottom: 2.5rem;

    @media ${deviceMin.mobileS} {
        margin-left: 11rem;
    }

    @media ${deviceMin.mobileM} {
        margin-left: 12rem;
    }

    @media ${deviceMin.mobileL} {
        margin-left: 13rem;
    }

    @media ${deviceMin.browserSm} {
        margin-left: 14rem;
    }
`;

const GridContainer = styled.div``;

const ListGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(10rem, 1fr));
    width: 100%;
`;

//Interfaces:

interface IMainContainerProps {
    width: number;
}

interface IComponentProps {
    lists: any;
    elements: any;
}

const EditingSurface = forwardRef(
    ({ lists, elements }: IComponentProps, ref: any): JSX.Element => {
        const selectedBlock = useSelector(
            (state: RootStateOrAny) => state?.toolbarSelectedBlock
        );
        const { width } = useWindowDimensions();

        return (
            <MainContainer ref={ref} width={width}>
                <GridContainer>
                    <ListGridContainer>
                        {lists.map((listKey: any, index: any) => (
                            <DateColumn
                                elements={elements[listKey]}
                                key={listKey}
                                prefix={listKey}
                                columnIndex={index}
                            />
                        ))}
                    </ListGridContainer>
                </GridContainer>
                <SheetsFooter />
            </MainContainer>
        );
    }
);

export default EditingSurface;
