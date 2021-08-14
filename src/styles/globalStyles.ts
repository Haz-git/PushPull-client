import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }

    body {
        height: 100%;
        background: rgba(244, 244, 244, 1);
        font-family: 'Lato', sans-serif, helvetica;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    h1 {
        margin: 0;
        padding: 0;
    }

    h2 {
        margin: 0;
        padding: 0;
    }

    h3 {
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyle;
