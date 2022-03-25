import * as React from 'react';

//Redux:
import { useSelector, RootStateOrAny } from 'react-redux';

//Components:
import Text from '../../general_components/Text';
import { LegendColorList } from './LegendColorList';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';

export const MainContainer = styled.div`
    height: 100%;
    background: transparent;
    border-radius: 0.2rem;
`;

export const HeaderContainer = styled.div`
    background: #7678ed;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #2c2c2c;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
`;

export const BodyContainer = styled.div<IBodyContainer>`
    background: #ffffff;
    padding: 0.5rem 0.75rem;
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    max-height: ${({ height }) => `${height - 500}px`};
    overflow-y: scroll;

    -ms-overflow-style: 3px; /* Internet Explorer 10+ */
    scrollbar-width: thin; /* Firefox */

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #e07133;
    }

    &::-webkit-scrollbar {
        width: 3px;
    }
`;

//Interfaces:

interface IBodyContainer {
    height: number;
}

export const LegendPanel = () => {
    const { width, height } = useWindowDimensions();

    const legendColors = useSelector(
        (state: RootStateOrAny) =>
            state?.viewTemplate?.savedTemplate?.templateLegend
    );

    const hasLegendColors = (): boolean => {
        return legendColors?.length !== 0;
    };

    return (
        <MainContainer>
            <HeaderContainer>
                <Text
                    text="Color Legend"
                    textColor="#ffffff"
                    textShadow="#000000 0px 0px 2px"
                    fontSize="1.15rem"
                />
            </HeaderContainer>
            <BodyContainer height={height}>
                <LegendColorList
                    shouldDisplayColors={hasLegendColors()}
                    legendColors={legendColors}
                />
            </BodyContainer>
        </MainContainer>
    );
};
