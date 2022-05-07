import React, {useState, useRef} from 'react';

import StackGrid from "react-stack-grid";
import { LoremIpsum } from "lorem-ipsum";

import Favourite from '../components/Favourite';
// import Rating from '../components/Rating';
import NotePaper from '../components/NotePaper';

import { useNavigate } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Icon from '@mdi/react';
import { mdiBarleyOff, mdiEggOffOutline, mdiFoodSteakOff } from '@mdi/js';
import { Button } from '@mui/material';

const lorem = new LoremIpsum();

function Recipes(){

    const types = ['vegetarisch','vegan','glutenfrei','']
    const [items, setItems] = useState(Array.from({length: 40}, () => {
        return {
            title: lorem.generateWords(Math.ceil(Math.random() * 7)), 
            content: lorem.generateWords(Math.ceil(Math.random() * 20)),
            type: types[Math.floor(Math.random() * types.length)]
        }
    }));

    // const [expanded, setExpanded] = useState(false);
    const ref = useRef();
    const theme = useTheme();
    const lg = useMediaQuery((theme) => theme.breakpoints.up('lg'))
    const md = useMediaQuery((theme) => theme.breakpoints.up('md'))
    const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
    var column = lg ? 5 : md ? 4 : sm ? 2 : 1;

    // const toggleCollapse = () => {
    //     setExpanded(!expanded);
    // }

    const furtherItems = () => {
        setItems(items.concat(Array.from({length: 20}, () => {
            return {
                title: lorem.generateWords(Math.ceil(Math.random() * 7)), 
                content: lorem.generateWords(Math.ceil(Math.random() * 20)), 
                type: types[Math.floor(Math.random() * types.length)]
            }
        })))
    }

    const gutter = parseInt(theme.spacing(3).replace('px', ''))

    const navigate = useNavigate();

    return(
        <div style={{marginTop: '-10px'}}>
            <StackGrid
                gridRef={() => ref}
                style={{marginTop: '10px', marginBottom: '30px'}}
                columnWidth={`${100/column}%`}
                gutterHeight={gutter/1}
                gutterWidth={gutter}
            >
                {items.map((item, index) => {
                    return(
                        <NotePaper onClick={() => {navigate(`/rezepte/626cffa2a7d82ddeddf4127f`);}} style={{cursor: 'pointer'}} key={index}>
                            <Box sx={{display: 'flex', marginBottom: '24px'}}>
                                <Box sx={{fontWeight: 700, fontSize: '20px', lineHeight: '24px', marginRight: '5px', flexGrow: 1}}>
                                    {item.title + ' (' + (index+1) + ')'}
                                </Box>
                                <Box sx={{float: 'right', height: '24px'}}>
                                    <Favourite/>
                                </Box>
                            </Box>
                            <Box sx={{height: 'calc(24px * 10)', marginBottom: '24px', width: 'calc(100% + 24px)'}}>
                                <img src={"https://cheapandcheerfulcooking.com/wp-content/uploads/2020/05/vegan-feijoada-1.jpg"} alt="Title of dish" style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                            </Box>
                            <Box>
                                <div style={{display: 'flex'}}>
                                    {item.type === 'vegetarisch' || item.type === 'vegan' ?
                                        <Box title="vegetarisch" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiFoodSteakOff} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                    {item.type ==='vegan' ?
                                        <Box title="vegan" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiEggOffOutline} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                    {item.type ==='glutenfrei' ?
                                        <Box title="glutenfrei" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiBarleyOff} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                    {item.type === 'laktosefrei' ?
                                        <Box title="laktosefrei" sx={{'&:hover': {color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`}, color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`, marginRight: '10px', borderRadius: '50%', height: 'calc(24px - 1px - 1px)', width: 'calc(24px - 1px - 1px)', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiBarleyOff} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                </div>
                                <Typography variant="body2" color="textSecondary" component="p" sx={{lineHeight: '24px'}}>
                                    {item.content}
                                </Typography>
                            </Box>
                        </NotePaper>
                    );
                })}
            </StackGrid>
            
            <div style={{justifyContent: 'center', display: 'flex'}}><Button variant='contained' onClick={furtherItems}>weiter Rezepte laden</Button></div>
        </div>
   );
}

export default Recipes;