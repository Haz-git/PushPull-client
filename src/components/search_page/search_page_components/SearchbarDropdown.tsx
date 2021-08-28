import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

//Redux:
import { useDispatch } from 'react-redux';
import { getWorkoutPrograms } from '../../../redux/workoutPrograms/workoutProgramActions';
import { updateSearchTerm } from '../../../redux/searchTerms/searchTermsActions';

//Components:
import SearchBar from '../../general_components/SearchBar';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

//Styles:
import styled from 'styled-components';
import { FileAlt } from '@styled-icons/fa-regular/FileAlt';
import { TimeFive } from '@styled-icons/boxicons-regular/TimeFive';

//Icons:
const FileIcon = styled(FileAlt)`
    height: 1.2rem;
    width: 1.2rem;
    color: ${(props) => props.theme.mainText};
    margin-right: 0.5rem;
    margin-bottom: 0.135rem;
`;

const TimeIcon = styled(TimeFive)`
    height: 1.2rem;
    width: 1.2rem;
    color: ${(props) => props.theme.mainText};
    margin-right: 0.5rem;
`;

const MainContainer = styled.div`
    width: 100%;
    position: relative;
`;

const DropdownContainer = styled.div<DropdownProps>`
    display: ${(props) => (props.isActive === true ? 'block' : 'none')};
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    overflow-y: scroll;
    max-height: 15rem;
    z-index: 10;
`;

const DropdownHeaderContainer = styled.div<DropdownProps>`
    display: ${(props) => (props.isActive === true ? 'block' : 'none')};
    width: 100%;
    background: #ffffff;
    padding: 1rem 0.5rem;
    border-top: 1px solid #ececec;
`;

const DropdownHeader = styled.h3<DropdownProps>`
    display: ${(props) => (props.isActive === true ? 'block' : 'none')};
    font-family: 'Lato', sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: ${(props) => props.theme.mainText};
`;

const EntityWrapper = styled.div<DropdownProps>`
    display: ${(props) => (props.isActive === true ? 'block' : 'none')};
    width: 100%;
`;

const EntityItem = styled(Link)<DropdownProps>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 10;
    background: #ffffff;
    width: 100%;
    /* border-bottom: 1px solid #ececec; */
    padding: 0.5rem 0.5rem;

    &:hover {
        text-decoration: none;
        background: #ececec;
    }

    &:focus {
        text-decoration: none;
    }
`;

const EntityNameText = styled.p`
    font-family: 'Lato', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: 400;
    color: ${(props) => props.theme.mainText};
    padding-bottom: 0.05rem;
`;

const RecentTermEntity = styled.button<DropdownProps>`
    display: ${(props) => (props.isActive === true ? 'flex' : 'none')};
    align-items: center;
    justify-content: flex-start;
    z-index: 99;
    background: #ffffff;
    width: 100%;
    /* border-bottom: 1px solid #ececec; */
    padding: 0.5rem 0.5rem;
    border: none;

    &:hover {
        text-decoration: none;
        background: #ececec;
    }

    &:focus {
        text-decoration: none;
    }
`;

//Interfaces:

interface DropdownProps {
    isActive?: boolean;
}

interface IComponentProps {
    recentSearchTerms?: any[];
    totalWorkoutPrograms: any[];
    loadingHandler: (status: boolean) => void;
}

const SearchbarDropdown = ({
    totalWorkoutPrograms,
    loadingHandler,
    recentSearchTerms,
}: IComponentProps): JSX.Element => {
    //Dispatch function:
    const dispatch = useDispatch();

    //render dropdown:
    const [renderDropdown, setRenderDropdown] = useState(false);

    //Searchbar input state:
    const [searchbarInput, setSearchbarInput] = useState('');

    //Searchbar input handler:
    const onSearchbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            totalWorkoutPrograms !== undefined &&
            totalWorkoutPrograms !== null
        ) {
            setRenderDropdown(true);
            setSearchbarInput(e.target.value);
        }
    };

    //Map filtered workout programs

    const mapFilteredWorkoutPrograms = () => {
        if (totalWorkoutPrograms && totalWorkoutPrograms.length !== 0) {
            return totalWorkoutPrograms.map((program) => (
                <EntityWrapper key={uuid()} isActive={renderDropdown}>
                    <EntityItem to={`/program/${program.id}`} key={program.id}>
                        <FileIcon />
                        <EntityNameText>
                            {program.workoutProgramTitle}
                        </EntityNameText>
                    </EntityItem>
                </EntityWrapper>
            ));
        }
    };
    //Map recently used terms:

    const mapRecentTerms = () => {
        if (recentSearchTerms) {
            return recentSearchTerms.map((term) => (
                <RecentTermEntity isActive={renderDropdown} key={uuid()}>
                    <TimeIcon />
                    <EntityNameText>{term}</EntityNameText>
                </RecentTermEntity>
            ));
        }
    };

    //outsideClickHandler:

    const onClickOutside = () => {
        setRenderDropdown(false);
    };

    //Searchbar submit handler:
    const handleSearchbarEnterPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            dispatch(updateSearchTerm(searchbarInput));
            dispatch(getWorkoutPrograms(loadingHandler, 1));
        }
    };

    return (
        <OutsideClickHandler onOutsideClick={onClickOutside}>
            <MainContainer onClick={() => setRenderDropdown(true)}>
                <SearchBar
                    inputHandler={onSearchbarChange}
                    placeholderText="Search again..."
                    keypressHandler={handleSearchbarEnterPress}
                />
                <DropdownContainer isActive={renderDropdown}>
                    <DropdownHeaderContainer isActive={renderDropdown}>
                        <DropdownHeader isActive={renderDropdown}>
                            Recent
                        </DropdownHeader>
                    </DropdownHeaderContainer>
                    {mapRecentTerms()}
                    <DropdownHeaderContainer isActive={renderDropdown}>
                        <DropdownHeader isActive={renderDropdown}>
                            Workout Programs
                        </DropdownHeader>
                    </DropdownHeaderContainer>
                    {mapFilteredWorkoutPrograms()}
                </DropdownContainer>
            </MainContainer>
        </OutsideClickHandler>
    );
};

export default SearchbarDropdown;
