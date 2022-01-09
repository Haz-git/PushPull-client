import * as React from 'react';
import { useState, useEffect, forwardRef } from 'react';
import { deviceMin } from '../../../devices/breakpoints';

//Redux:
import { RootStateOrAny, useSelector } from 'react-redux';

//Components:
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';
import DateColumn from './DateColumn';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section<IMainContainerProps>`
    width: ${({ width }) => `${width - 274}px`};
    height: ${({ height }) => `${height}px`};
    background: #ffffff;

    /*
        Incredibly frustrating working with this css. I have the exact same grid logic implemented for MainBuildProgramView, but for some reason grid-template-columns does not push the Editing surface the right of the Toolbar. It works perfectly without these media queries in the programview, but these below must be included in editing surface... css???
    */

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

    @media ${deviceMin.laptop} {
        margin-left: 15rem;
    }

    @media ${deviceMin.laptopL} {
        margin-left: 16rem;
    }
`;

const GridContainer = styled.div``;

const ListGridContainer = styled.div<IListGridContainer>`
    display: grid;
    grid-template-columns: repeat(7, minmax(auto, 20.5rem));
    width: 100%;
    height: ${(props) => `${props.height + 32}px`};
`;

//Interfaces:

interface IListGridContainer {
    height: number;
}

interface IMainContainerProps {
    height: number;
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
        const { width, height } = useWindowDimensions();

        return (
            <MainContainer height={height} width={width} ref={ref}>
                <GridContainer>
                    <ListGridContainer height={height}>
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
            </MainContainer>
        );
    }
);

export default EditingSurface;
