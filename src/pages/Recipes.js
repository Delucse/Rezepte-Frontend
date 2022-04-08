import React, {useState, useRef} from 'react';

import StackGrid from "react-stack-grid";
import { LoremIpsum } from "lorem-ipsum";

import Favourite from '../components/Favourite';
// import Rating from '../components/Rating';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
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

    const [expanded, setExpanded] = useState(false);
    const ref = useRef();
    const theme = useTheme();
    const lg = useMediaQuery((theme) => theme.breakpoints.up('lg'))
    const md = useMediaQuery((theme) => theme.breakpoints.up('md'))
    const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
    var column = lg ? 5 : md ? 4 : sm ? 2 : 1;

    const toggleCollapse = () => {
        setExpanded(!expanded);
    }

    const furtherItems = () => {
        setItems(items.concat(Array.from({length: 20}, () => {
            return {
                title: lorem.generateWords(Math.ceil(Math.random() * 7)), 
                content: lorem.generateWords(Math.ceil(Math.random() * 20)), 
                type: types[Math.floor(Math.random() * types.length)]
            }
        })))
    }

    const gutter = parseInt(theme.spacing(2).replace('px', ''))

    return(
        <div>
            <StackGrid
                gridRef={() => ref}
                style={{marginTop: '10px', marginBottom: '30px'}}
                columnWidth={`${100/column}%`}
                gutterHeight={gutter/2}
                gutterWidth={gutter}
            >
                {items.map((item, index) => {
                    return(
                        <Card square key={index} sx={{marginBottom: '10px'}}>
                            <CardHeader
                                sx={{tectAlign: 'left', '.MuiCardHeader-title': {fontWeight: 'bold', fontSize: '20px'}}}
                                // avatar={<Avatar sx={{backgroundColor: theme => theme.palette.primary.light}}>LN</Avatar>}
                                action={<Favourite />}
                                title={item.title + ' (' + (index+1) + ')'}
                                // subheader={`von ${'Luc'}`}
                            />
                            <CardMedia
                                sx={{height: '0px', paddingTop: '56.25%' /*16:9*/}}
                                image="https://cheapandcheerfulcooking.com/wp-content/uploads/2020/05/vegan-feijoada-1.jpg"
                                title="Title of dish"
                            />
                            <CardContent sx={{textAlign: 'justify', paddingBottom: '10px !important', paddingTop: '10px !important'}}>
                                <div style={{display: 'flex', marginBottom: '10px'}}>
                                    {item.type === 'vegetarisch' || item.type === 'vegan' ?
                                        <Box title="vegetarisch" sx={{'&:hover': {color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`}, color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`, marginRight: '10px', borderRadius: '50%', height: '30px', width: '30px', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiFoodSteakOff} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                    {item.type === 'vegan' ?
                                        <Box title="vegan" sx={{'&:hover': {color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`}, color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`, marginRight: '10px', borderRadius: '50%', height: '30px', width: '30px', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiEggOffOutline} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                    {item.type === 'glutenfrei' ?
                                        <Box title="glutenfrei" sx={{'&:hover': {color: theme => theme.palette.primary.main, border: theme => `1px solid ${theme.palette.primary.main}`}, color: theme => theme.palette.primary.light, border: theme => `1px solid ${theme.palette.primary.light}`, marginRight: '10px', borderRadius: '50%', height: '30px', width: '30px', justifyContent: 'center', display: 'grid', alignContent: 'center'}}>
                                            <Icon path={mdiBarleyOff} size={0.8} style={{color: 'inherit'}}/>
                                        </Box>
                                    : null}
                                </div>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.content}
                                </Typography>
                                {/* <Rating /> */}
                            </CardContent>
                        </Card>
                    );
                })}
            </StackGrid>
            
            <div style={{justifyContent: 'center', display: 'flex'}}><Button variant='contained' onClick={furtherItems}>weiter Rezepte laden</Button></div>
        </div>
   );
}

export default Recipes;