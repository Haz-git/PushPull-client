import * as React from 'react';
import { useRef, useState } from 'react';

//Redux:
import { useDispatch } from 'react-redux';
import {
    deleteTemplate,
    updateTemplate,
} from '../../../redux/templates/templateActions';

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

//Styles:
import styled from 'styled-components';
import { Template } from '@styled-icons/heroicons-solid/Template';
import {
    CancelIcon,
    CheckIcon,
} from '../../build_program_page/build_program_components/AddProjectForm';

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
    height: 0.25rem;
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
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const notifications = useNotifications();

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
    const menuRef = useRef<HTMLDivElement | null>(null);
    const handleDeleteRequest = () => {
        dispatch(
            deleteTemplate(
                toggleLoadingNotif,
                updateLoadingNotif,
                id,
                projectUuid
            )
        );
    };
    const { show } = useContextMenu({
        id: MENU_ID,
        props: {
            templateUuid: id,
            toggleNewTitleInput: (state: boolean) => setStateTitleInput(state),
            handleDeleteRequest,
        },
    });

    const toggleLoadingNotif = () => {
        let id = notifications.showNotification({
            title: 'Template is being deleted...',
            message: '',
            color: 'orange',
            autoClose: false,
            disallowClose: true,
            loading: true,
        });

        return id;
    };

    const updateLoadingNotif = (id: string, status: boolean) => {
        if (status !== true)
            return notifications.updateNotification(id, {
                id,
                color: 'red',
                title: 'Your template failed to be deleted',
                message: `An error might have occurred, or you aren't connected to the internet right now. Please report this issue, or try again later.`,
                autoClose: 3000,
                icon: <CancelIcon />,
            });
        return notifications.updateNotification(id, {
            id,
            color: 'teal',
            title: 'Your template has been deleted',
            message: '',
            autoClose: 3000,
            icon: <CheckIcon />,
        });
    };

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
        if (e.key === 'Enter') {
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

    const renderTitleOrInputForRename = () => {
        if (!stateTitleInput)
            return (
                <Text
                    text={newTemplateFileTitle}
                    fontSize="1rem"
                    truncateWidth="16rem"
                />
            );

        return (
            <TextInput
                ref={inputRef}
                autoFocus
                value={newTemplateFileTitle}
                variant="filled"
                required
                onChange={onTextInput}
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
                    },
                }}
                onKeyPress={handleOnKeyPress}
            />
        );
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
                    {renderTitleOrInputForRename()}
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
