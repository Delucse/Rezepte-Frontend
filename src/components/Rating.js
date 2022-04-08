import React from 'react';

import MuiRating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


function Rating(){
    return(
        <div style={{display: 'flex', alignItems: 'end'}}>
            <MuiRating
                readOnly
                defaultValue={Math.ceil(Math.random() * 100)/10}
                precision={0.1}
                sx={{
                    '.MuiRating-iconFilled': {
                        color: theme => theme.palette.primary.main,
                    }
                }}
                // mdiIcon muss angepasst werden: ehemaliges Style-Attribut durch folgendes ersetzen
                icon={
                    // mdiPotSteam
                    <svg style={{fill: 'currentColor', width: '1em', height: '1em', display: 'inline-block', fontSize: 'inherit', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: 0}} focusable="false" viewBox="0 0 24 24"><path d="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z"></path></svg>
                }
                emptyIcon={
                    <svg style={{fill: 'currentColor', width: '1em', height: '1em', display: 'inline-block', fontSize: 'inherit', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: 0}} focusable="false" viewBox="0 0 24 24"><path d="M19 19C19 20.11 18.11 21 17 21H7C5.9 21 5 20.11 5 19V12H3V10H21V12H19M8 1.5C6.15 1.5 4.65 3 4.65 4.85C4.65 6.7 6.15 8.2 8 8.2H9.53C9.92 8.2 10.29 8.3 10.61 8.5H12.63C12.05 7.45 10.86 6.75 9.53 6.75H8C7 6.75 6.15 5.77 6.15 4.75C6.15 3.73 7 3 8 3M12.85 2C12.85 3 12 3.85 11 3.85V5.35C12.92 5.35 14.5 6.7 14.89 8.5H16.42C16.12 6.67 14.96 5.15 13.35 4.38C13.97 3.77 14.35 2.93 14.35 2Z"></path></svg>
                }
            />
            <Typography variant="caption" color="textSecondary" component="div"> ({Math.ceil(Math.random() * 100)})</Typography>
        </div>
    );
}

export default Rating;