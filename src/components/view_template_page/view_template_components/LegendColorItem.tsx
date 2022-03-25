import * as React from 'react';
import { useState } from 'react';

//Redux

//Components
import Text from '../../general_components/Text';
import {
    IColorSwatch,
    ColorSwatch,
} from '../../build_template_page/build_template_components/ColorSelectables';

//Styles
import styled from 'styled-components';
import { Collapse } from '@mantine/core';

const ColorItemContainer = styled.div`
    // display: flex;
    // align-items: center;
    background: #ececec;
    padding: 0.5rem 0.5rem;
    border-radius: 0.2rem;
    transition: all 0.25s ease;
    border: 1px solid #ececec;
    margin-bottom: 0.75rem;

    &:hover {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px,
            rgba(0, 0, 0, 0.23) 0px 2px 4px;
        border: 1px solid #e07133;
    }
`;

const StyledColorSwatch = styled(ColorSwatch)`
    height: 1.3rem;
    width: 1.3rem;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DescriptionContainer = styled.div`
    font-size: 0.95rem;
    font-weight: 700;
    margin-top: 0.5rem;
`;

//Interfaces

interface IComponentProps {
    id: string;
    label: string;
    colorHex: string;
    description: string;
}

export const LegendColorItem = ({
    id,
    label,
    colorHex,
    description,
}: IComponentProps): JSX.Element => {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    const isDescriptionEmpty = (): boolean => {
        return description === '';
    };

    return (
        <ColorItemContainer
            key={id}
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
        >
            <HeaderContainer>
                <Text text={label} fontSize="1.05rem" />
                <StyledColorSwatch color={colorHex} />
            </HeaderContainer>
            <>
                {!isDescriptionEmpty() && (
                    <Collapse in={isCollapseOpen}>
                        <DescriptionContainer>
                            <Text
                                text={description}
                                subText={true}
                                fontSize=".95rem"
                                fontWeight="800"
                            />
                        </DescriptionContainer>
                    </Collapse>
                )}
            </>
        </ColorItemContainer>
    );
};
