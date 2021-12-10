import * as React from 'react';
import { useRef } from 'react';

//Components:
import Text from '../../general_components/Text';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ReactComponent as ConsSVG } from '../../../assets/template_working.svg';
import historyObject from '../../../utils/historyObject';
import { useContextMenu } from 'react-contexify';

//Styles:
import styled from 'styled-components';
import { Template } from '@styled-icons/heroicons-solid/Template';

const TemplateIcon = styled(Template)`
    height: 2rem;
    width: 2rem;
    color: #e07133;
`;

const MainContainer = styled.div<MainContainerProps>`
    height: 15rem;
    width: 100%;
    border: ${(props) =>
        props.isSelected ? '1px solid #e07133' : '1px solid #d6d6d6'};
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) =>
        props.isSelected
            ? 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
            : 'none'};
`;

const ImageContainer = styled.div<MainContainerProps>`
    height: 70%;
    background: #f4f4f4;
    width: 100%;
    border-bottom: ${(props) =>
        props.isSelected ? '1px solid #e07133' : '1px solid #d6d6d6'};
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
`;

const DescContainer = styled.div`
    height: 30%;
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

interface MainContainerProps {
    isSelected: boolean;
}
interface IComponentProps {
    templateFileTitle: string;
    templateSnapshot: string | null;
    createdAt: string;
    id: string;
    updatedAt: string;
    onSelectTemplate: () => void;
    isSelected: boolean;
}

const TemplateComponent = ({
    templateFileTitle,
    templateSnapshot,
    createdAt,
    id,
    updatedAt,
    onSelectTemplate,
    isSelected,
}: IComponentProps): JSX.Element => {
    dayjs.extend(RelativeTime);
    const MENU_ID = 'TEMPLATECOMPONENTCONTEXTMENU';
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { show } = useContextMenu({
        id: MENU_ID,
        props: {
            templateUuid: id,
        },
    });

    const processTime = (time: string) => {
        if (time) return dayjs(time).fromNow();
    };

    const processSnapshot = () => {
        if (!templateSnapshot) return <ConsSVG />;
        return <img src={templateSnapshot} alt="template snapshot img" />;
    };

    const EntityClickHandler = (e: React.MouseEvent) => {
        //Treat single click and double clicks differently:

        if (e.detail === 1) {
            onSelectTemplate();
        } else if (e.detail === 2) {
            //Highlight the entity:
            onSelectTemplate();
            historyObject.push(`/file/${id}`);
        }
    };

    const displayContextMenu = (event: React.MouseEvent) => {
        if (event.cancelable) event.preventDefault();
        onSelectTemplate();
        show(event);
    };

    return (
        <MainContainer
            onClick={EntityClickHandler}
            isSelected={isSelected}
            onContextMenu={displayContextMenu}
            ref={menuRef}
        >
            <ImageContainer isSelected={isSelected}>
                {processSnapshot()}
            </ImageContainer>
            <DescContainer>
                <IconContainer>
                    <TemplateIcon />
                </IconContainer>
                <TextContainer>
                    <Text
                        text={templateFileTitle}
                        fontSize="1rem"
                        truncateWidth="16rem"
                    />
                    <TextDivider />
                    <Text
                        subText={true}
                        text={`Edited ${processTime(updatedAt)}`}
                        fontSize=".9rem"
                    />
                </TextContainer>
            </DescContainer>
        </MainContainer>
    );
};

export default TemplateComponent;
