import React from 'react';

import { useTheme } from '@mui/material/styles';

function DelucseLogo(props) {
    const theme = useTheme();
    const color =
        props.color === 'primary'
            ? theme.palette.primary.main
            : theme.palette.primary.contrastText;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 190.262 51.884"
            style={props.style}
        >
            <title id="delucseLogo">Delucse-Logo</title>
            <g>
                <path
                    fill={color}
                    d="M22.576,6.392v39.305c1.7,1.292,3.332,1.768,4.76,1.768c7.004,0,9.588-11.492,9.588-21.353c0-16.796-4.556-23.664-16.388-23.664c-8.228,0-15.368,5.236-15.368,14.076c0,5.236,2.652,7.004,3.74,7.752 C3.4,24.276,0,21.964,0,15.98C0,7.548,9.248,0,21.488,0c17.34,0,23.528,12.852,23.528,26.044c0,12.852-5.508,25.84-13.056,25.84c-2.72,0-5.78-1.224-9.384-3.943V51h-7.344V7.412L22.576,6.392z"
                />
                <path
                    fill={color}
                    d="M56.371,37.4c0.68,7.209,3.944,8.841,7.82,8.841c4.284,0,8.364-2.108,10.744-7.412h2.176c-2.312,6.664-8.772,12.58-15.708,12.58c-6.256,0-12.308-4.08-12.308-15.708c0-7.616,3.196-19.041,12.988-19.041c4.488,0,9.044,1.633,9.044,8.841C71.127,31.825,65.551,36.38,56.371,37.4z M66.775,24.82c0-3.399-1.224-4.828-3.4-4.828c-4.76,0-7.072,8.093-7.072,14.757C62.695,33.728,66.775,29.92,66.775,24.82z"
                />
                <path
                    fill={color}
                    d="M81.735,3.4v36.721c0,1.768,0.136,6.12,3.06,6.12c2.177,0,3.877-2.517,4.896-7.412h2.516c-2.04,11.355-6.46,12.58-9.451,12.58c-6.257,0-7.82-5.44-7.82-9.86V4.352L81.735,3.4z"
                />
                <path
                    fill={color}
                    d="M112.539,17v23.12c0,1.768,0.136,6.12,3.06,6.12c2.177,0,3.877-2.517,4.896-7.412h2.516c-2.04,11.355-6.46,12.58-9.452,12.58c-4.147,0-5.916-3.061-6.596-6.393c-1.7,4.42-4.76,6.393-7.82,6.393c-5.304,0-9.588-2.788-9.588-10.54V17h6.8v23.12c0,4.42,1.7,6.12,4.08,6.12c2.584,0,5.305-2.721,5.305-7.412V17H112.539z"
                />
                <path
                    fill={color}
                    d="M137.019,23.868c0-2.107-1.36-3.604-3.74-3.604c-4.896,0-6.393,7.956-6.393,14.416c0,9.521,3.604,11.561,8.024,11.561c4.76,0,8.024-2.38,10.336-7.412h2.313c-2.177,6.664-8.229,12.58-14.893,12.58c-6.256,0-12.988-4.08-12.988-15.845c0-7.548,2.313-18.904,12.58-18.904c5.712,0,8.772,2.856,8.772,8.16c0,2.244-0.884,4.013-2.652,4.013c-1.088,0-1.904-0.544-2.516-1.429C136.611,26.792,137.019,25.161,137.019,23.868z"
                />
                <path
                    fill={color}
                    d="M171.359,38.829c-2.584,3.604-5.509,5.848-8.093,7.684c-2.04,3.536-6.527,4.896-9.452,4.896c-7.956,0-10.132-5.645-10.132-10.064c0-2.38,1.088-4.216,2.448-4.964c2.38-6.732,5.032-13.464,5.712-20.128l6.868-1.36c4.284,17.272,5.576,20.196,5.645,27.132c1.495-1.02,2.924-2.176,4.147-3.195H171.359z M153.338,22.168c-0.544,5.032-2.584,9.52-3.944,14.416c0.816,0.544,1.496,1.496,1.496,2.992c0,1.699-1.088,2.651-2.176,2.651c-0.68,0-1.292-0.271-1.836-0.952c0.68,3.196,2.516,5.032,5.508,5.032c2.856,0,4.76-1.428,4.76-4.76 C157.146,35.972,155.854,34,153.338,22.168z"
                />
                <path
                    fill={color}
                    d="M174.962,37.4c0.68,7.209,3.944,8.841,7.82,8.841c2.924,0,5.644-0.885,7.344-3.332c0.068,0.611,0.136,1.224,0.136,1.7c0,4.079-4.556,6.8-9.588,6.8c-6.12,0-12.988-4.216-12.988-15.708c0-7.616,3.196-19.041,12.988-19.041c4.488,0,9.044,1.633,9.044,8.841C189.718,31.825,184.142,36.38,174.962,37.4z M185.367,24.82c0-3.399-1.225-4.828-3.4-4.828c-4.76,0-7.072,8.093-7.072,14.757C181.287,33.728,185.367,29.92,185.367,24.82z"
                />
            </g>
        </svg>
    );
}

export default DelucseLogo;
