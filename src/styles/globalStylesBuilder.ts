import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }

    body {
        padding-top: 3.75rem;
        width: 100%;
        height: 100%;
        min-height: 100%;
        position: relative;
        background: #ffffff;
        font-family: 'Lato', sans-serif, helvetica;
        -webkit-overflow-scrolling: touch;

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

    .mantine-ColorInput-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }


    .mantine-multi-select-input-input .mantine-multi-select-root {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }

    }

    .mantine-rich-text-editor-root {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }

    }

    .mantine-number-input-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
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

    .mantine-notification-root {
        background-color: #393939;

        @media(min-width: 320px) {
            bottom: 1rem;
        }

        @media(min-width: 768px) {
            bottom: .5rem;
        }
    }

    .mantine-notification-title {
        color: #ffffff;
        font-weight: 900;
    }

    .mantine-notification-description {
        color: #ffffff;
        font-weight: 200;
    }

`;

export default GlobalStyle;
