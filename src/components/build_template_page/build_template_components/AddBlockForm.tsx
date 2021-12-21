import React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { updateTemplate } from '../../../redux/templates/templateActions';
//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    padding: 0rem 0.5rem;
`;

//Interfaces:

interface IComponentProps {
    closeModal: () => void;
}

const AddBlockForm = ({ closeModal }: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const currTemplate = useSelector(
        (state: RootStateOrAny) => state?.template
    );

    const dispatchBlock = () => {
        dispatch(
            updateTemplate(
                (status: boolean) => console.log('dispatched'),
                currTemplate.id,
                {
                    templateBlocks: { blockTitle: 'Test1' },
                },
                currTemplate.projectId
            )
        );

        closeModal();
    };

    return (
        <MainContainer>
            <div>
                <GeneralButton
                    buttonLabel="Click to add test block"
                    onClick={dispatchBlock}
                />
            </div>
        </MainContainer>
    );
};

export default AddBlockForm;
