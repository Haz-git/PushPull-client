import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

//Styles:
import styled from 'styled-components';
import { Template } from '@styled-icons/heroicons-solid/Template';

const TemplateIcon = styled(Template)`
    height: 1.75rem;
    width: 1.75rem;
    color: #e07133;
`;

const MainContainer = styled.div`
    height: 13.5rem;
    width: 18rem;
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    height: 10rem;
    background: #ececec;
`;

const DescContainer = styled.div`
    padding: 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 1rem;
`;

const IconContainer = styled.div``;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    dayjs.extend(RelativeTime);

    const processTime = (time: string) => {
        if (time) return dayjs(time).fromNow();
    };

    return (
        <MainContainer>
            <ImageContainer>Img</ImageContainer>
            <DescContainer>
                <IconContainer>
                    <TemplateIcon />
                </IconContainer>
                <TextContainer>
                    <Text text={templateFileTitle} fontSize=".9rem" />
                    <Text
                        subText={true}
                        text={processTime(updatedAt)}
                        fontSize=".8rem"
                    />
                </TextContainer>
            </DescContainer>
        </MainContainer>
    );
};

export default TemplateComponent;
