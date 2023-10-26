import React from 'react';

import { Box } from '@mui/material';

function SpiralBindingPaper(props) {
    const { children, ...rest } = props;

    return (
        <Box
            sx={{
                margin: '0 auto',
                borderTop: (theme) => `30px solid ${'rgb(204,204,204)'}`,
                borderImage: `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iNTIuMzI2IgogICBoZWlnaHQ9IjQxLjg2MDAwMSIKICAgdmlld0JveD0iMCAwIDUyLjMyNTk5OSA0MS44NiIKICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDEuODYgNTIuMzI2IgogICB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aAogICAgIGZpbGw9IiNGRkZGRkYiCiAgICAgZD0iTSA1Mi4zMjYsMCBIIDI3LjE2MyB2IDcuMDk3IGMgNC45ODksMC41MDEgOC44ODQsNC43MTIgOC44ODQsOS44MzMgMCw1LjQ1OCAtNC40MjUsOS44ODQgLTkuODg0LDkuODg0IC01LjQ1OSwwIC05Ljg4NCwtNC40MjUgLTkuODg0LC05Ljg4NCAwLC01LjEyMSAzLjg5NSwtOS4zMzIgOC44ODQsLTkuODMzIFYgMCBIIDAgdiA0MS44NiBoIDUyLjMyNiB6IgogICAgIGlkPSJwYXRoMiIKICAgICBzdHlsZT0iZmlsbDojY2NjY2NjO2ZpbGwtb3BhY2l0eToxIiAvPjwvc3ZnPgo=) 100% 5% repeat`,
                borderImageWidth: '30px 0px 0px 0px',
            }}
            {...rest}
        >
            <Box
                sx={{
                    position: 'relative',
                    margin: 0,
                    padding: `5px 20px 20px 20px`,
                    border: 'none',
                    borderRadius: '0 0 2px 2px',
                    background: (theme) => `${'rgb(204,204,204)'}`,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default SpiralBindingPaper;
