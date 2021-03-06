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
        background: rgba(244, 244, 244, 1);
        font-family: 'Lato', sans-serif, helvetica;
        -webkit-overflow-scrolling: touch;

    }

    @media screen and (min-width: 320px) {
        body {
            padding-bottom: 3.5rem;
        }
    }

    @media screen and (min-width: 800px) {
        body {
            padding-bottom: 3.5rem;
        }
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


    .mantine-MultiSelectInput-input .mantine-MultiSelect-root {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }

    }

    .mantine-RichTextEditor-root {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }

    }

    .mantine-NumberInput-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-Select-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-TextInput-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-TextInput-filledVariant {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-Textarea-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }

    .mantine-TimeInput-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }
    }


    .mantine-Notification-root {


        @media(min-width: 320px) {
            bottom: 2.75rem;
        }

        @media(min-width: 768px) {
            bottom: 3.5rem;
        }
    }

`;

export default GlobalStyle;
