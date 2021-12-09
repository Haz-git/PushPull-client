import * as React from 'react';

//Components:

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    height: 15rem;
    width: 18rem;
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
`;

//Interfaces:
interface IComponentProps {
    templateFileTitle: string;
    templateSnapshot: string | null;
    createdAt: string;
    id: string;
    updatedAt: string;
}

const TemplateComponent = ({
    templateFileTitle,
    createdAt,
    id,
    updatedAt,
}: IComponentProps): JSX.Element => {
    return <div>test</div>;
};

export default TemplateComponent;
