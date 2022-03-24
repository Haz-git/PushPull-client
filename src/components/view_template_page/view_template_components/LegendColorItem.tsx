import * as React from 'react';
import { useState } from 'react';

//Redux

//Components
import Text from '../../general_components/Text';

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

//Interfaces

interface IComponentProps {
    key: string;
    label: string;
    colorHex: string;
    description: string;
}

export const LegendColorItem = ({
    key,
    label,
    colorHex,
    description,
}: IComponentProps): JSX.Element => {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    return (
        <ColorItemContainer
            key={key}
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
        >
            <Text text={label} fontSize="1.05rem" />
            <Collapse in={isCollapseOpen}>
                <div>{description}</div>
            </Collapse>
        </ColorItemContainer>
    );
};
