import * as React from 'react';

//Components:
import GeneralButton from '../../general_components/GeneralButton';

//Styles:

//Interfaces:

interface IComponentProps {
    toggleUserUpdateForm: () => void;
}

const ProfilePanelUpdateForm = ({
    toggleUserUpdateForm,
}: IComponentProps): JSX.Element => {
    return (
        <div>
            This is the update panel
            <div>
                <GeneralButton
                    buttonLabel="cancel"
                    onClick={() => toggleUserUpdateForm()}
                />
            </div>
        </div>
    );
};

export default ProfilePanelUpdateForm;
