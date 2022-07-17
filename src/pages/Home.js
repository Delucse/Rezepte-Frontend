import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function Home() {
    const [title, setTitle] = useState('...');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/title`).then((response) => {
            response.data[0]
                ? setTitle(response.data[0].title)
                : setTitle('kein Titel verfügbar');
        });
    }, []);

    return (
        <div>
            <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
                Home
            </Typography>
            <Typography
                variant="h4"
                sx={{ color: (theme) => theme.palette.text.primary }}
            >
                {title}
            </Typography>
        </div>
    );
}

export default Home;
