import * as React from 'react';

//Components:
import { IMAGE_MIME_TYPE, Dropzone } from '@mantine/dropzone';
import Text from '../../general_components/Text';

//Styles:
import styled from 'styled-components';
import { ImageAdd } from '@styled-icons/boxicons-regular/ImageAdd';
import { ErrorCircle } from '@styled-icons/boxicons-regular';
import { Upload } from '@styled-icons/boxicons-regular/Upload';

const MainContainer = styled.section`
    padding: 0rem 0.5rem;
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
    height: 11rem;
    width: 11rem;
    color: ${(props) => props.imageColor};
`;

const UploadIcon = styled(Upload)<ImageIconProps>`
    height: 11rem;
    width: 11rem;
    color: ${(props) => props.imageColor};
`;

const CancelIcon = styled(ErrorCircle)<ImageIconProps>`
    height: 11rem;
    width: 11rem;
    color: ${(props) => props.imageColor};
`;

// const getIconColor = (status: any, theme: any) => {
//   return status.accepted
//     ? theme.colors[theme.primaryColor][6]
//     : status.rejected
//     ? theme.colors.red[6]
//     : theme.colorScheme === 'dark'
//     ? theme.colors.dark[0]
//     : theme.black;
// }

//Interfaces:

interface ImageUploadProps {
    status: any;
}

interface ImageIconProps {
    imageColor: string;
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

const UpdateProfileAvatarForm = () => {
    return (
        // See results in console after dropping files to Dropzone
        <MainContainer>
            <Dropzone
                onDrop={console.log}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
            >
                {(status) => (
                    <DropzoneWrapper>
                        <ImageUploadIcon status={status} />

                        <div>
                            <Text
                                text="Drag images here or click to select files"
                                fontSize="1.2rem"
                                mainText={true}
                                fontWeight="600"
                            />
                            <Text
                                text="Attach as many files as you like, each file
                                should not exceed 5mb"
                                subText={true}
                                fontSize=".9rem"
                                fontWeight="500"
                            />
                        </div>
                    </DropzoneWrapper>
                )}
            </Dropzone>
        </MainContainer>
    );
};

export default UpdateProfileAvatarForm;
