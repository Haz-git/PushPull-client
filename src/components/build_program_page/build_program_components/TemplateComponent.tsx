import * as React from 'react';

//Components:
import Text from '../../general_components/Text';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ReactComponent as ConsSVG } from '../../../assets/template_working.svg';

//Styles:
import styled from 'styled-components';
import { Template } from '@styled-icons/heroicons-solid/Template';

const TemplateIcon = styled(Template)`
    height: 1.75rem;
    width: 1.75rem;
    color: #e07133;
`;

const MainContainer = styled.div`
    height: 15rem;
    width: 100%;
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    height: 75%;
    background: #f4f4f4;
    width: 100%;
    border-bottom: 1px solid #d6d6d6;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
`;

const DescContainer = styled.div`
    height: 25%;
    padding: 0.5rem 1rem;
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

const TextDivider = styled.div`
    height: 0.1rem;
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
    templateSnapshot,
    createdAt,
    id,
    updatedAt,
}: IComponentProps): JSX.Element => {
    dayjs.extend(RelativeTime);

    const processTime = (time: string) => {
        if (time) return dayjs(time).fromNow();
    };

    const processSnapshot = () => {
        if (!templateSnapshot) return <ConsSVG />;
        return <img src={templateSnapshot} alt="template snapshot img" />;
    };

    return (
        <MainContainer>
            <ImageContainer>{processSnapshot()}</ImageContainer>
            <DescContainer>
                <IconContainer>
                    <TemplateIcon />
                </IconContainer>
                <TextContainer>
                    <Text
                        text={templateFileTitle}
                        fontSize=".9rem"
                        truncateWidth="16rem"
                    />
                    <TextDivider />
                    <Text
                        subText={true}
                        text={`Edited ${processTime(updatedAt)}`}
                        fontSize=".8rem"
                    />
                </TextContainer>
            </DescContainer>
        </MainContainer>
    );
};

export default TemplateComponent;
