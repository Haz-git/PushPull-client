import * as React from 'react';
import styled from 'styled-components';

const StyledDividerLine = styled.div<DividerLineProps>`
    margin: 0;
    padding: 0;
    border: ${(props) => props.border};
    width: 100%;
`;

//Interfaces:

interface DividerLineProps {
    border?: string;
}

const DividerLine = ({
    border = '1px solid rgba(0, 0, 34, 1)',
}: DividerLineProps): JSX.Element => {
    return <StyledDividerLine border={border} />;
};

export default DividerLine;
