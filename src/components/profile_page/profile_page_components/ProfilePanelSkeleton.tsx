import * as React from 'react';

//Components:
import { SkeletonLoaderLine } from '../../general_components/WorkoutProgramSkeletonLoader';

//Styles:
import styled from 'styled-components';

import {
    MainContainer,
    AvatarContainer,
    DescriptionContainer,
    BioDescContainer,
    EditProfileContainer,
    OptionalMainContainer,
    OptionalContainer,
    LocationIcon,
    LinkIcon,
    TwitterIcon,
} from './ProfilePanel';

const SkeletonContainer = styled.section``;

const ProfileSkeleton = styled(SkeletonLoaderLine)`
    border-radius: 100%;
`;

const ProfilePanelSkeleton = () => {
    return (
        <MainContainer>
            <AvatarContainer>
                <ProfileSkeleton height="280px" width="280px" />
            </AvatarContainer>
            <DescriptionContainer>
                <SkeletonLoaderLine
                    height="3rem"
                    width="100%"
                    margin="1rem 0rem .5rem 0rem"
                />
                <SkeletonLoaderLine height="2rem" width="10rem" />
            </DescriptionContainer>
            <BioDescContainer>
                <SkeletonLoaderLine height="10rem" width="100%" />
            </BioDescContainer>
            <OptionalMainContainer>
                <OptionalContainer>
                    <LocationIcon />
                    <SkeletonLoaderLine
                        height="1.5rem"
                        width="100%"
                        margin="0rem 0rem 0rem .5rem"
                    />
                </OptionalContainer>
                <OptionalContainer>
                    <LinkIcon />
                    <SkeletonLoaderLine
                        height="1.5rem"
                        width="100%"
                        margin="0rem 0rem 0rem .5rem"
                    />
                </OptionalContainer>
                <OptionalContainer>
                    <TwitterIcon />
                    <SkeletonLoaderLine
                        height="1.5rem"
                        width="100%"
                        margin="0rem 0rem 0rem .5rem"
                    />
                </OptionalContainer>
            </OptionalMainContainer>
        </MainContainer>
    );
};

export default ProfilePanelSkeleton;
