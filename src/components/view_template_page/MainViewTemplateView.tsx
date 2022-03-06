import * as React from 'react';

//Redux:

//Components:
import { FixedToolbar } from './view_template_components/FixedToolbar';

//Styles:
import styled from 'styled-components';

const MainContainer = styled.section`
    // overflow: hidden;
    height: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`;

const DocumentContainer = styled.div`
    margin-left: 5rem;
    padding: 10rem 10rem 10rem 5rem;
`;

const ToolbarContainer = styled.div`
    position: fixed;
    background: #ececec;
    border-right: 1px solid black;
    padding: 1rem;
    height: 100%;
`;

//Interfaces:

export const MainViewTemplateView = () => {
    return (
        <MainContainer>
            <Wrapper>
                <ToolbarContainer>
                    <FixedToolbar />
                </ToolbarContainer>
                <DocumentContainer>
                    Non enim praesent elementum facilisis. Facilisis volutpat
                    est velit egestas dui id ornare. Lobortis mattis aliquam
                    faucibus purus. Volutpat consequat mauris nunc congue nisi
                    vitae. Quis auctor elit sed vulputate. Nisl nisi scelerisque
                    eu ultrices vitae auctor eu. Imperdiet sed euismod nisi
                    porta lorem. Sed faucibus turpis in eu mi bibendum neque. Id
                    eu nisl nunc mi. At erat pellentesque adipiscing commodo
                    elit at imperdiet dui accumsan. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor.met massa vitae. Mauris a diam
                    maecenas sed enim ut sem. Libero id faucibus nisl tincidunt.
                    Et malesuada fames ac turpis egestas maecenas pharetra
                    convallis. Adipiscing enim eu turpis egestas pretium aenean
                    pharetra magna ac. Nec feugiat in fermentum posuere urna nec
                    tincidunt praesent semper. Integer enim neque volutpat ac.
                    Mi in nulla posuere sollicitudin aliquam ultrices sagittis.
                    Ullamcorper a lacus vestibulum sed arcu non odio euismod
                    lacinia. Dolor sed viverra ipsum nunc aliquet bibendum. Nunc
                    vel risus commodo viverra maecenas. Id velit ut tortor
                    pretium viverra suspendisse potenti nullam. Maecenas sed
                    enim ut sem viverra aliquet. Faucibus turpis in eu mi
                    bibendum neque egestas congue. Cras tincidunt lobortis
                    feugiat vivamus at augue eget arcu. Mattis nunc sed blandit
                    libero. Quam pellentesque nec nam aliquam sem et tortor. Sed
                    ullamcorper morbi tincidunt ornare massa eget egestas purus.
                    Facilisis mauris sit amet massa vitae. Mauris a diam
                    maecenas sed enim ut sem. Libero id faucibus nisl tincidunt.
                    Et malesuada fames ac turpis egestas maecenas pharetra
                    convallis. Adipiscing enim eu turpis egestas pretium aenean
                    pharetra magna ac. Nec feugiat in fermentum posuere urna nec
                    tincidunt praesent semper. Integer enim neque volutpat ac.
                    Mi in nulla posuere sollicitudin aliquam ultrices sagittis.
                    Ullamcorper a lacus vestibulum sed arcu non odio euismod
                    lacinia. Dolor sed viverra ipsum nunc aliquet bibendum. Nunc
                    vel risus commodo viverra maecenas. Id velit ut tortor
                    pretium viverra suspendisse potenti nullam. Maecenas sed
                    enim ut sem viverra aliquet. Faucibus turpis in eu mi
                    bibendum neque egestas congue. Cras tincidunt lobortis
                    feugiat vivamus at augue eget arcu. Mattis nunc sed blandit
                    libero. Quam pellentesque nec nam aliquam sem et tortor.met
                    massa vitae. Mauris a diam maecenas sed enim ut sem. Libero
                    id faucibus nisl tincidunt. Et malesuada fames ac turpis
                    egestas maecenas pharetra convallis. Adipiscing enim eu
                    turpis egestas pretium aenean pharetra magna ac. Nec feugiat
                    in fermentum posuere urna nec tincidunt praesent semper.
                    Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor.met massa vitae. Mauris a diam
                    maecenas sed enim ut sem. Libero id faucibus nisl tincidunt.
                    Et malesuada fames ac turpis egestas maecenas pharetra
                    convallis. Adipiscing enim eu turpis egestas pretium aenean
                    pharetra magna ac. Nec feugiat in fermentum posuere urna nec
                    tincidunt praesent semper. Integer enim neque volutpat ac.
                    Mi in nulla posuere sollicitudin aliquam ultrices sagittis.
                    Ullamcorper a lacus vestibulum sed arcu non odio euismod
                    lacinia. Dolor sed viverra ipsum nunc aliquet bibendum. Nunc
                    vel risus commodo viverra maecenas. Id velit ut tortor
                    pretium viverra suspendisse potenti nullam. Maecenas sed
                    enim ut sem viverra aliquet. Faucibus turpis in eu mi
                    bibendum neque egestas congue. Cras tincidunt lobortis
                    feugiat vivamus at augue eget arcu. Mattis nunc sed blandit
                    libero. Quam pellentesque nec nam aliquam sem et tortor. Sed
                    ullamcorper morbi tincidunt ornare massa eget egestas purus.
                    Facilisis mauris sit amet massa vitae. Mauris a diam
                    maecenas sed enim ut sem. Libero id faucibus nisl tincidunt.
                    Et malesuada fames ac turpis egestas maecenas pharetra
                    convallis. Adipiscing enim eu turpis egestas pretium aenean
                    pharetra magna ac. Nec feugiat in fermentum posuere urna nec
                    tincidunt praesent semper. Integer enim neque volutpat ac.
                    Mi in nulla posuere sollicitudin aliquam ultrices sagittis.
                    Ullamcorper a lacus vestibulum sed arcu non odio euismod
                    lacinia. Dolor sed viverra ipsum nunc aliquet bibendum. Nunc
                    vel risus commodo viverra maecenas. Id velit ut tortor
                    pretium viverra suspendisse potenti nullam. Maecenas sed
                    enim ut sem viverra aliquet. Faucibus turpis in eu mi
                    bibendum neque egestas congue. Cras tincidunt lobortis
                    feugiat vivamus at augue eget arcu. Mattis nunc sed blandit
                    libero. Quam pellentesque nec nam aliquam sem et tortor.met
                    massa vitae. Mauris a diam maecenas sed enim ut sem. Libero
                    id faucibus nisl tincidunt. Et malesuada fames ac turpis
                    egestas maecenas pharetra convallis. Adipiscing enim eu
                    turpis egestas pretium aenean pharetra magna ac. Nec feugiat
                    in fermentum posuere urna nec tincidunt praesent semper.
                    Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor. Sed ullamcorper morbi
                    tincidunt ornare massa eget egestas purus. Facilisis mauris
                    sit amet massa vitae. Mauris a diam maecenas sed enim ut
                    sem. Libero id faucibus nisl tincidunt. Et malesuada fames
                    ac turpis egestas maecenas pharetra convallis. Adipiscing
                    enim eu turpis egestas pretium aenean pharetra magna ac. Nec
                    feugiat in fermentum posuere urna nec tincidunt praesent
                    semper. Integer enim neque volutpat ac. Mi in nulla posuere
                    sollicitudin aliquam ultrices sagittis. Ullamcorper a lacus
                    vestibulum sed arcu non odio euismod lacinia. Dolor sed
                    viverra ipsum nunc aliquet bibendum. Nunc vel risus commodo
                    viverra maecenas. Id velit ut tortor pretium viverra
                    suspendisse potenti nullam. Maecenas sed enim ut sem viverra
                    aliquet. Faucibus turpis in eu mi bibendum neque egestas
                    congue. Cras tincidunt lobortis feugiat vivamus at augue
                    eget arcu. Mattis nunc sed blandit libero. Quam pellentesque
                    nec nam aliquam sem et tortor.met massa vitae. Mauris a diam
                    maecenas sed enim ut sem. Libero id faucibus nisl tincidunt.
                    Et malesuada fames ac turpis egestas maecenas pharetra
                    convallis. Adipiscing enim eu turpis egestas pretium aenean
                    pharetra magna ac. Nec feugiat in fermentum posuere urna nec
                    tincidunt praesent semper. Integer enim neque volutpat ac.
                    Mi in nulla posuere sollicitudin aliquam ultrices sagittis.
                    Ullamcorper a lacus vestibulum sed arcu non odio euismod
                    lacinia. Dolor sed viverra ipsum nunc aliquet bibendum. Nunc
                    vel risus commodo viverra maecenas. Id velit ut tortor
                    pretium viverra suspendisse potenti nullam. Maecenas sed
                    enim ut sem viverra aliquet. Faucibus turpis in eu mi
                    bibendum neque egestas congue. Cras tincidunt lobortis
                    feugiat vivamus at augue eget arcu. Mattis nunc sed blandit
                    libero. Quam pellentesque nec nam aliquam sem et tortor. Sed
                    ullamcorper morbi tincidunt ornare massa eget egestas purus.
                    Facilisis mauris sit amet massa vitae. Mauris a diam
                    maecenas sed enim ut sem. Libero id faucibus nisl tincidunt.
                    Et malesuada fames ac turpis egestas maecenas pharetra
                    convallis. Adipiscing enim eu turpis egestas pretium aenean
                    pharetra magna ac. Nec feugiat in fermentum posuere urna nec
                    tincidunt praesent semper. Integer enim neque volutpat ac.
                    Mi in nulla posuere sollicitudin aliquam ultrices sagittis.
                    Ullamcorper a lacus vestibulum sed arcu non odio euismod
                    lacinia. Dolor sed viverra ipsum nunc aliquet bibendum. Nunc
                    vel risus commodo viverra maecenas. Id velit ut tortor
                    pretium viverra suspendisse potenti nullam. Maecenas sed
                    enim ut sem viverra aliquet. Faucibus turpis in eu mi
                    bibendum neque egestas congue. Cras tincidunt lobortis
                    feugiat vivamus at augue eget arcu. Mattis nunc sed blandit
                    libero. Quam pellentesque nec nam aliquam sem et tortor.
                </DocumentContainer>
            </Wrapper>
        </MainContainer>
    );
};
