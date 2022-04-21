import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }

    body {
        /* padding-top: 3.75rem; */
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


    .mantine-MultiSelectInput-input .mantine-MultiSelect-root {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1);
        }

    }

    .mantine-Input-input {
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

    .mantine-Notification-root {
        background-color: #393939;

        @media(min-width: 320px) {
            bottom: 1rem;
        }

        @media(min-width: 768px) {
            bottom: .5rem;
        }
    }

    .mantine-Notification-title {
        color: #ffffff;
        font-weight: 900;
    }

    .mantine-Notification-description {
        color: #ffffff;
        font-weight: 200;
    }

    .mantine-Accordion-item {
        border: none;
        border-bottom: 1px solid #525252;
        background: #2c2c2c;
    }

    .mantine-Accordion-control:hover {
        background-color: #2c2c2c;
    }

    .mantine-Accordion-item:hover {
        background-color: #2c2c2c!important;
        background: #2c2c2c !important;
    }

    .mantine-Accordion-icon {
        color: #ffffff;
    }

    .mantine-Accordion-label {
        color: #ffffff;
        font-weight: 700;
    }

    .mantine-Accordion-content {
        height: 100%;
    }

    .toolbar-block-dnd-copy {
        transform: none !important;
    }

    .toolbar-block-dnd-copy ~ [data-rbd-placeholder-context-id] {
        display: none !important;
    }

    .mantine-TimeInput-defaultVariant {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1) !important;
        }
    }

    .mantine-TimeInput-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1) !important;
        }
    }

    .mantine-TimeRangeInput-input {
        :focus {
            border: 1px solid rgba(224, 113, 51, 1) !important;
        }
    }

`;

export default GlobalStyle;
