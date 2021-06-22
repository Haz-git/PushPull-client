import * as React from 'react';
import styled from 'styled-components';

//Components
import Navbar from './nav_bar';
import GlobalStyle from '../globalstyle';

//Styles:
const MainWrapper = styled.section``;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <MainWrapper>
                <Navbar />
            </MainWrapper>
        </>
    );
};

export default App;
