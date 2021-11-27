import * as React from 'react';
import styled from 'styled-components';

const StyledDividerLine = styled.div<DividerLineProps>`
    margin: ${(props) => props.margin};
    padding: 0;
    border-bottom: ${(props) => props.border};
    width: 100%;
`;

//Interfaces:

interface DividerLineProps {
    border?: string;
    margin?: string;
}

const DividerLine = ({
    border = '1px solid rgba(0, 0, 34, 1)',
    margin = '0',
}: DividerLineProps): JSX.Element => {
    return <StyledDividerLine border={border} margin={margin} />;
};

export default DividerLine;
