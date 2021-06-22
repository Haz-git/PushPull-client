import * as React from 'react';
import styled from 'styled-components';

//Components
import GlobalStyle from '../globalstyle';
import Navbar from './nav_bar';
import Backdrop from './backdrop';

//Styles:
const MainWrapper = styled.section``;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <MainWrapper>
                <Navbar />
                <Backdrop />
            </MainWrapper>
        </>
    );
};

export default App;
