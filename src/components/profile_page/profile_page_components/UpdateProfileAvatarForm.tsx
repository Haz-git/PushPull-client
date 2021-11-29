import * as React from 'react';
import { useState } from 'react';

//redux:
import { updateUserAvatar } from '../../../redux/profile/profileActions';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

//Components:
import { IMAGE_MIME_TYPE, Dropzone } from '@mantine/dropzone';
import Text from '../../general_components/Text';
import { Group } from '@mantine/core';
import { Transition } from '@mantine/core';
import GeneralButton from '../../general_components/GeneralButton';
import getBase64 from '../../../utils/getBase64';
import { Loader } from '@mantine/core';

//Styles:
import styled from 'styled-components';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';
import { ErrorCircle } from '@styled-icons/boxicons-regular';
import { Upload } from '@styled-icons/boxicons-regular/Upload';

const MainContainer = styled.section`
    padding: 1rem 0.5rem 0rem 0.5rem;
`;

const DropzoneWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
`;

const ImageIcon = styled(ImageAdd)<ImageIconProps>`
    height: 10rem;
    width: 10rem;
    color: ${(props) => props.imageColor};
`;

const UploadIcon = styled(Upload)<ImageIconProps>`
    height: 10rem;
    width: 10rem;
    color: ${(props) => props.imageColor};
`;

const CancelIcon = styled(ErrorCircle)<ImageIconProps>`
    height: 10rem;
    width: 10rem;
    color: ${(props) => props.imageColor};
`;

const UploadedTextContainer = styled.div`
    margin: 2rem 0rem;
    padding: 1rem 1rem;
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
`;

const UploadContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    column-gap: 5rem;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;

const FileNameContainer = styled.div`
    max-width: 100%;
    max-height: 5rem;
    overflow-y: scroll;
    padding: 0.25rem 0.25rem;
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
`;

const PreviewContainer = styled.div`
    border: 1px solid #d6d6d6;
    border-radius: 0.3rem;
    padding: 0.25rem 0.25rem;
    margin: 0.5rem 0rem;
`;

const ImgPreview = styled.img`
    display: block;
    max-height: 18rem;
    max-width: 18rem;
    border-radius: 0.3rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
`;

//Interfaces:

interface ImageUploadProps {
    status: any;
}

interface ImageIconProps {
    imageColor: string;
}

interface IComponentProps {
    toggleModal: (status: boolean) => void;
}

//Helper Functions

const ImageUploadIcon = ({ status }: ImageUploadProps) => {
    if (status.accepted) {
        return <UploadIcon imageColor="rgba(43, 90, 147,1)" />;
    }

    if (status.rejected) {
        return <CancelIcon imageColor="#AF1432" />;
    }

    return <ImageIcon imageColor="rgba(0, 0, 34, .6)" />;
};

const UpdateProfileAvatarForm = ({
    toggleModal,
}: IComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const { fileId } = useSelector(
        (state: RootStateOrAny) =>
            state?.user?.user?.data?.imageKitAvatarDetails
    );

    const [isUpdateRequestLoading, setIsUpdateRequestLoading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploadedFileURL, setUploadedFileURL] = useState('');
    const [openTransition, setOpenTransition] = useState(false);
    const [uploadedFileBase64, setUploadedFileBase64] = useState('');

    const handleOnFileDrop = (files: File[]) => {
        setUploadedFileName(files[0].name);
        setUploadedFileURL(URL.createObjectURL(files[0]));

        getBase64(files[0], (result: any) => {
            setUploadedFileBase64(result);
        });

        setOpenTransition(true);
    };

    const stateUpdateRequest = (state: boolean) =>
        setIsUpdateRequestLoading(state);

    const disableUserInputOnRequestHandle = () => {
        if (isUpdateRequestLoading) return true;
        else return false;
    };

    const handleOnNewAvatarSubmit = () => {
        if (uploadedFileName !== '' && uploadedFileBase64 !== '') {
            setIsUpdateRequestLoading(true);
            dispatch(
                updateUserAvatar(stateUpdateRequest, toggleModal, {
                    fileName: uploadedFileName,
                    file: uploadedFileBase64,
                    previousAvatarId: fileId,
                })
            );
        }
    };

    return (
        // See results in console after dropping files to Dropzone
        <MainContainer>
            <Dropzone
                onDrop={(files: File[]) => handleOnFileDrop(files)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                loading={disableUserInputOnRequestHandle()}
            >
                {(status) => (
                    <Group
                        position="center"
                        spacing="xl"
                        style={{ pointerEvents: 'none' }}
                    >
                        <ImageUploadIcon status={status} />

                        <div>
                            <Text
                                text="Drag image here or click to select file"
                                fontSize="1.2rem"
                                mainText={true}
                                fontWeight="600"
                            />
                            <Text
                                text="Attach your new avatar, the file
                                should not exceed 5mb"
                                subText={true}
                                fontSize=".9rem"
                                fontWeight="600"
                            />
                        </div>
                    </Group>
                )}
            </Dropzone>
            <Transition
                mounted={openTransition}
                transition="slide-down"
                duration={400}
                timingFunction="ease"
            >
                {(styles) => (
                    <UploadedTextContainer style={styles}>
                        <UploadContainerWrapper>
                            <TextContainer>
                                <Text
                                    text="File Uploaded"
                                    fontSize="1rem"
                                    mainText={true}
                                    fontWeight="800"
                                />
                                <FileNameContainer>
                                    <Text
                                        text={`${uploadedFileName}`}
                                        fontSize="1rem"
                                        fontWeight="600"
                                        subText={true}
                                    />
                                </FileNameContainer>
                            </TextContainer>
                            <PreviewContainer>
                                <ImgPreview src={uploadedFileURL} />
                            </PreviewContainer>
                        </UploadContainerWrapper>
                        <ButtonContainer>
                            <GeneralButton
                                buttonLabel={
                                    isUpdateRequestLoading
                                        ? 'Updating...'
                                        : 'Save'
                                }
                                onClick={() => {
                                    handleOnNewAvatarSubmit();
                                }}
                                width={
                                    isUpdateRequestLoading ? '8.5rem' : '5rem'
                                }
                                buttonBackground="#41A312"
                                fontSize="1rem"
                                height="2rem"
                                isDisabledOnLoading={disableUserInputOnRequestHandle()}
                                buttonIconLeft={
                                    isUpdateRequestLoading ? (
                                        <Loader color="white" size="xs" />
                                    ) : null
                                }
                                leftIconMargin="0rem .3rem -.2rem 0rem"
                            />
                            <GeneralButton
                                buttonLabel="Cancel"
                                width="6rem"
                                buttonBackground="#ececec"
                                buttonTextColor="rgba(0, 0, 34, 1)"
                                textShadow="none"
                                disableShadow={true}
                                hoverShadow="none"
                                border="1px solid #c6c6c6"
                                fontSize="1rem"
                                height="2rem"
                                onClick={() => toggleModal(false)}
                            />
                        </ButtonContainer>
                    </UploadedTextContainer>
                )}
            </Transition>
        </MainContainer>
    );
};

export default UpdateProfileAvatarForm;
