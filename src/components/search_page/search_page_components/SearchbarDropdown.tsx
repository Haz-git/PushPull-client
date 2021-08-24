import * as React from 'react';
import { useState } from 'react';

//Components:
import SearchBar from '../../general_components/SearchBar';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.div`
    width: 100%;
    position: relative;
`;

const DropdownContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
    overflow-y: scroll;
    max-height: 15rem;
`;

const EntityItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 99;
    background: #ffffff;
    width: 100%;
    border-bottom: 1px solid #ececec;
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
    font-weight: 600;
    color: ${(props) => props.theme.subText};
    padding-bottom: 0.05rem;
`;

//Interfaces:

interface IComponentProps {
    totalWorkoutPrograms?: any[];
}

const SearchbarDropdown = ({
    totalWorkoutPrograms,
}: IComponentProps): JSX.Element => {
    //Sorted workout program state:
    const [sortedWorkoutPrograms, setSortedWorkoutPrograms] = useState<any[]>(
        []
    );

    //Searchbar input state:
    const [searchbarInput, setSearchbarInput] = useState('');

    //Searchbar input handler:
    const onSearchbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            totalWorkoutPrograms !== undefined &&
            totalWorkoutPrograms !== null
        ) {
            setSearchbarInput(e.target.value);

            if (e.target.value !== '') {
                let filteredWorkoutPrograms = totalWorkoutPrograms.filter(
                    (program) => {
                        return program.workoutProgramTitle
                            .trim()
                            .toLowerCase()
                            .replace(/\s/g, '')
                            .includes(
                                e.target.value
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s/g, '')
                            );
                    }
                );

                setSortedWorkoutPrograms(filteredWorkoutPrograms);
            }
        }
    };

    //Map filtered workout programs

    const mapFilteredWorkoutPrograms = () => {
        if (sortedWorkoutPrograms.length !== 0 && searchbarInput !== '') {
            return sortedWorkoutPrograms.map((program) => (
                <EntityItem to={`/program/${program.id}`} key={program.id}>
                    <EntityNameText>
                        {program.workoutProgramTitle}
                    </EntityNameText>
                </EntityItem>
            ));
        }
    };

    //outsideClickHandler:

    const onClickOutside = () => {
        if (sortedWorkoutPrograms.length > 0) setSortedWorkoutPrograms([]);
    };

    return (
        <OutsideClickHandler onOutsideClick={onClickOutside}>
            <MainContainer>
                <SearchBar
                    inputHandler={onSearchbarChange}
                    placeholderText="Search again..."
                />
                <DropdownContainer>
                    {mapFilteredWorkoutPrograms()}
                </DropdownContainer>
            </MainContainer>
        </OutsideClickHandler>
    );
};

export default SearchbarDropdown;
