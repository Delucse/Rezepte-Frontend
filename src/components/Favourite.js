import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';

import Icon from '@mdi/react';
import { mdiNotebookHeart , mdiNotebookHeartOutline  } from '@mdi/js'; 

function Favourite(){

  const [mouseover, setMouseover] = useState(false)

    return (
        <IconButton 
            title="zum Kochbuch hinzufügen" 
            onClick={(e) => {e.stopPropagation(); alert('ich liebe es!');}} 
            color={mouseover ? 'primary' : 'default'}
            onMouseOver={() => setMouseover(true)}
            onMouseOut={() => setMouseover(false)}
            sx={{padding: 0}}
        >
            <Icon 
                path={mouseover ? mdiNotebookHeart : mdiNotebookHeartOutline } 
                size={1} 
            />
        </IconButton>
    );
}

export default Favourite;
