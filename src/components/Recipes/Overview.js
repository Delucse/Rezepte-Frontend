import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import moment from 'moment';

import Ripped from './Ripped';
import Tape from '../Tape';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiClockOutline, mdiCalendar, mdiEggOffOutline, mdiFoodSteakOff, mdiBarleyOff } from '@mdi/js';
import { deleteRecipesFavorite, setRecipesFavorite } from '../../actions/recipeFilterActions';

function Overview(props){
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Tape 
                rotate={props.rotate} 
                top 
                heart={user} 
                check={props.favorite} 
                onClick={user ? props.favorite ? () => dispatch(deleteRecipesFavorite(props.id)) : () => dispatch(setRecipesFavorite(props.id)) : null}
            />
            <Box sx={{
                    margin: '2px 0',
                    background: '#f6f6f6',
                    boxShadow: '0 1px 4px hsla(0,0%,0%,.25)',
                    position: "relative",
                    backgroundImage: "radial-gradient(transparent 21%, transparent 21%), radial-gradient(transparent 10%, transparent 12%), linear-gradient(to top, hsla(0,0%,0%,0) 0%, hsla(0,0%,0%,0) 95%, hsla(180,25%,50%,.2) 95%, hsla(180,25%,50%,.2) 100%)",
                    backgroundPosition: "0px 6px, 6px 5px, 50% 18px",
                    backgroundRepeat: "repeat-y, repeat-y, repeat",
                    backgroundSize: "48px 48px, 48px 48px, 24px 24px",
                }}
            >
                <Box sx={{
                        height: 'calc(24px * 10)', 
                        width: 'calc(100%)',
                        background: 'white',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/rezepte/${props.id}`)}
                >
                    <img 
                        src={props.picture}
                        alt={props.title} 
                        style={{height: '100%', width: '100%', objectFit: 'cover'}}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = `${process.env.PUBLIC_URL}/logo512.png`;
                            currentTarget.style = "height: 100%; width: 100%; object-fit: cover; filter: grayscale(1);";
                        }}
                    />
                    <Ripped />
                </Box>
                
                <Box sx={{display: 'flex', padding: '20px 18px'}}>
                    <Box sx={{
                            fontWeight: 700, 
                            fontSize: '20px', 
                            lineHeight: '24px',
                            flexGrow: 1,
                            marginRight: '5px'
                        }}
                    >
                        {props.title}
                    </Box>
                    <Button
                        sx={{float: 'right', height: '24px', borderRadius: 0, boxShadow: 'none', minWidth: '20px', padding: 0}} 
                        onClick={handleClick}
                        disableRipple
                    >
                        <Icon path={mdiDotsHorizontal} size={1}/>
                    </Button>
                </Box>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {[
                    props.keywords.includes('vegan') ? {title: 'vegan', icon: mdiEggOffOutline} : {},
                    props.keywords.includes('vegetarisch') ? {title: 'vegetarisch', icon: mdiFoodSteakOff} : {},
                    props.keywords.includes('glutenfrei') ? {title: 'glutenfrei', icon: mdiBarleyOff} : {},
                    props.keywords.includes('laktosefrei') ? {title: 'laktosefrei', icon: mdiBarleyOff} : {},
                    {title: `${(props.time)/1000/60/60} Stunden Gesamtzeit`, icon: mdiClockOutline},
                    {title: `erstellt am ${moment(props.date).format('DD.MM.YYYY, HH:mm')} Uhr`, icon: mdiCalendar},
                ].map((item, index) => 
                    item.icon ?
                        <div key={index}>    
                            {item.icon === mdiClockOutline ? <Divider /> : null}
                            <MenuItem sx={{cursor: 'default'}}>
                                <ListItemIcon>
                                    <Icon path={item.icon} size={1}/>
                                </ListItemIcon>
                                <ListItemText>{item.title}</ListItemText>
                            </MenuItem>
                        </div>
                    :   null
                )}
            </Menu>
        </div>
    );
}

export default Overview;