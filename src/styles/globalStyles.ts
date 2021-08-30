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

    .mantine-select-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-text-input-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-textarea-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }
`;

export default GlobalStyle;
