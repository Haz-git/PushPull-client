import React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';

//Redux:
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { addTemplateBlock } from '../../../redux/templates/templateActions';
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
            addTemplateBlock(currTemplate.id, {
                blockTitle: 'Test Block 1',
            })
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
