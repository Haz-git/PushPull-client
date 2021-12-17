import * as React from 'react';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

//Redux:
import { useDispatch } from 'react-redux';
import { updateTemplate } from '../../../redux/templates/templateActions';

//Components:
import { useNotifications } from '@mantine/notifications';
import Text from '../../general_components/Text';
import RelativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { ReactComponent as ConsSVG } from '../../../assets/template_working.svg';
import historyObject from '../../../utils/historyObject';
import { useContextMenu } from 'react-contexify';
import { TextInput } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import useWindowDimensions from '../../../utils/hooks/useWindowDimensions';

//Styles:
import styled from 'styled-components';
import { Template } from '@styled-icons/heroicons-solid/Template';
import { Options } from '@styled-icons/ionicons-outline/Options';

const OptionsIcon = styled(Options)`
    height: 1.5rem;
    width: 1.5rem;
    color: rgba(0, 0, 34, 0.7);
`;

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
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Likely future */
`;

const ImageContainer = styled.div<MainContainerProps>`
    height: 11rem;
    background: #f4f4f4;
    width: 100%;
    border-bottom: ${(props) =>
        props.isSelected ? '1px solid #e07133' : '1px solid #d6d6d6'};
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
`;

const DescContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DescWrapper = styled.div`
    height: 4rem;
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
    height: 0.25rem;
`;

const OptionsContainer = styled.div``;

const OptionsButton = styled.button`
    border-radius: 0.3rem;
    padding: 0.25rem 0.25rem;
    background: #ececec;
    border: none;
    text-decoration: none;
    margin-right: 1rem;
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
    projectUuid: string | null;
    toggleDeleteTemplateModal: (
        status: boolean,
        templateId: string,
        projectUuid?: string | null
    ) => void;
}

const TemplateComponent = ({
    templateFileTitle,
    templateSnapshot,
    createdAt,
    id,
    updatedAt,
    onSelectTemplate,
    isSelected,
    projectUuid,
    toggleDeleteTemplateModal,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();

    const [stateTitleInput, setStateTitleInput] = useState(false);
    const [newTemplateFileTitle, setNewTemplateFileTitle] =
        useState(templateFileTitle);

    const inputRef = useClickOutside(() => {
        dispatch(
            updateTemplate(
                () => {},
                id,
                {
                    templateFileTitle: newTemplateFileTitle,
                },
                projectUuid
            )
        );
        setStateTitleInput(false);
    });

    dayjs.extend(RelativeTime);
    const MENU_ID = 'TEMPLATECOMPONENTCONTEXTMENU';
    const optionsContainerRef = useRef<HTMLButtonElement | null>(null);
    const handleDeleteRequest = () => {
        toggleDeleteTemplateModal(true, id, projectUuid);
    };
    const { show } = useContextMenu({
        id: MENU_ID,
        props: {
            templateUuid: id,
            toggleNewTitleInput: (state: boolean) => setStateTitleInput(state),
            handleDeleteRequest,
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

    const onTextInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewTemplateFileTitle(e.target.value);

    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTemplateFileTitle !== '') {
            dispatch(
                updateTemplate(
                    () => {},
                    id,
                    {
                        templateFileTitle: newTemplateFileTitle,
                    },
                    projectUuid
                )
            );
            setStateTitleInput(false);
        }
    };

    const truncateTemplateNameOnWindowDimensions = () => {
        if (width <= 320) return '10rem';
        if (width <= 375) return '13rem';
        else return '13.5rem';
    };

    const renderTitleOrInputForRename = () => {
        if (!stateTitleInput)
            return (
                <Text
                    text={newTemplateFileTitle}
                    fontSize="1rem"
                    truncateWidth={truncateTemplateNameOnWindowDimensions()}
                />
            );

        return (
            <TextInput
                ref={inputRef}
                autoFocus
                value={newTemplateFileTitle}
                required
                onChange={onTextInput}
                size="xs"
                styles={{
                    root: {
                        padding: '0 0',
                        margin: '0 0',
                    },
                    input: {
                        border: 'none',
                        padding: '0rem 0rem 0rem .5rem',
                        margin: '0 0',
                        height: '.85rem',
                        fontSize: '.95rem',
                        fontWeight: 700,
                        width: '100%',
                    },
                }}
                onKeyPress={handleOnKeyPress}
            />
        );
    };

    const renderOptionsIconOnMobile = () => {
        if (isMobile) {
            return (
                <OptionsContainer>
                    <OptionsButton
                        onClick={renderContextMenuOnMobile}
                        ref={optionsContainerRef}
                    >
                        <OptionsIcon />
                    </OptionsButton>
                </OptionsContainer>
            );
        }
    };

    const renderContextMenuOnMobile = (event: React.MouseEvent) => {
        if (event.cancelable) event.preventDefault();
        const posRef = optionsContainerRef.current?.getBoundingClientRect();

        if (posRef) {
            return show(event, {
                position: {
                    x: posRef.x,
                    y: posRef.y,
                },
            });
        }

        return show(event, {
            position: {
                x: 0,
                y: 0,
            },
        });
    };

    return (
        <MainContainer
            onClick={EntityClickHandler}
            isSelected={isSelected}
            onContextMenu={displayContextMenu}
        >
            <ImageContainer isSelected={isSelected}>
                {processSnapshot()}
            </ImageContainer>
            <DescContainer>
                <DescWrapper>
                    <IconContainer>
                        <TemplateIcon />
                    </IconContainer>
                    <TextContainer>
                        {renderTitleOrInputForRename()}
                        <TextDivider />
                        <Text
                            subText={true}
                            text={`Edited ${processTime(updatedAt)}`}
                            fontSize=".9rem"
                        />
                    </TextContainer>
                </DescWrapper>
                {renderOptionsIconOnMobile()}
            </DescContainer>
        </MainContainer>
    );
};

export default TemplateComponent;
