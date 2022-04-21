import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {changeIngredientsTitle, changeIngredientsPosition, addIngredients, changeAmount, changeUnit, changeAliment, addFood, removeFood, changeFoodPosition, removeIngredients } from "../../actions/recipeActions";

import Textfield from "../Textfield";

import Icon from '@mdi/react';
import { mdiFoodVariant, mdiDelete, mdiChevronUp, mdiChevronDown, mdiPlus, mdiTextShadow } from '@mdi/js'; 

import { Button } from "@mui/material";


function Title(props){
    
    const dispatch = useDispatch();
    
    return (
        <div style={{display: 'flex', width: '60%'}}>
            <div style={{display: 'grid', marginRight: '5px', height: '56px'}}>
                <Button onClick={() => dispatch(changeIngredientsPosition(props.iIndex, props.iIndex-1))} disabled={props.iIndex===0} sx={{height: 'calc(56px / 3)', borderRadius: 0, minWidth: '23px', boxShadow: 'none', padding: '0px'}} variant="contained">
                    <Icon path={mdiChevronUp} size={1}/>
                </Button>
                <Button onClick={() => dispatch(addIngredients(props.iIndex))} sx={{height: 'calc(56px / 3)', borderRadius: 0, minWidth: '23px', boxShadow: 'none', padding: '0px'}} variant="contained">
                    <Icon path={mdiPlus} size={0.7}/>
                </Button>
                <Button onClick={() => dispatch(changeIngredientsPosition(props.iIndex, props.iIndex+1))} disabled={props.length -1 === props.iIndex} sx={{height: 'calc(56px / 3)', borderRadius: 0, minWidth: '23px', boxShadow: 'none', padding: '0px'}} variant="contained">
                    <Icon path={mdiChevronDown} size={1}/>
                </Button>
            </div>
            <Textfield 
                value={props.title} 
                onChange={(e) => dispatch(changeIngredientsTitle(props.iIndex, e.target.value))}
                // error
                margin
                label='Titel' 
                start={
                    <Icon path={mdiTextShadow  } size={1}/>
                }
            />
            <Button disabled={props.length === 1} onClick={() => dispatch(removeIngredients(props.iIndex))} sx={{height: '56px', marginLeft: '5px', borderRadius: 0, minWidth: '20px', boxShadow: 'none', padding: '0px'}} variant='outlined'>
                <Icon path={mdiDelete} size={1}/>
            </Button>
        </div>
    );
}


function Food(props){

    const dispatch = useDispatch();

    return (
        <div style={{display: 'flex', marginLeft: '5%', marginRight: '5%', marginBottom: props.length - 1 === props.fIndex ? 0 : '10px'}}>
            <div style={{display: 'grid', marginRight: '5px'}}>
                <Button onClick={() => dispatch(changeFoodPosition(props.iIndex, props.fIndex, props.fIndex-1))} disabled={props.fIndex===0} sx={{height: 'calc(56px / 3)', borderRadius: 0, minWidth: '23px', boxShadow: 'none', padding: '0px'}} variant="contained">
                    <Icon path={mdiChevronUp} size={1}/>
                </Button>
                <Button onClick={() => dispatch(addFood(props.iIndex, props.fIndex))} sx={{height: 'calc(56px / 3)', borderRadius: 0, minWidth: '23px', boxShadow: 'none', padding: '0px'}} variant="contained">
                    <Icon path={mdiPlus} size={0.7}/>
                </Button>
                <Button onClick={() => dispatch(changeFoodPosition(props.iIndex, props.fIndex, props.fIndex+1))} disabled={props.length -1 === props.fIndex} sx={{height: 'calc(56px / 3)', borderRadius: 0, minWidth: '23px', boxShadow: 'none', padding: '0px'}} variant="contained">
                    <Icon path={mdiChevronDown} size={1}/>
                </Button>
            </div>
            <div style={{width: '20%', marginRight: '5px'}}>
                <Textfield 
                    value={props.amount} 
                    onChange={(e) => dispatch(changeAmount(props.iIndex, props.fIndex, e.target.value))}
                    // error
                    label='Menge' 
                    // start={
                    //     <Icon path={mdiWeight  } size={1}/>
                    // }
                />
            </div>
            <div style={{width: '25%', marginRight: '5px'}}>
                <Textfield 
                    value={props.unit} 
                    onChange={(e) => dispatch(changeUnit(props.iIndex, props.fIndex, e.target.value))}
                    // error
                    label='Einheit' 
                    // start={
                    //     <Icon path={mdiWeight  } size={1}/>
                    // }
                />
            </div>
            <Textfield 
                value={props.aliment} 
                onChange={(e) => dispatch(changeAliment(props.iIndex, props.fIndex, e.target.value))}
                // error
                label='Zutat' 
                start={
                    <Icon path={mdiFoodVariant } size={1}/>
                }
            />
            <Button disabled={props.length === 1} onClick={() => dispatch(removeFood(props.iIndex, props.fIndex))} sx={{height: '56px', marginLeft: '5px', borderRadius: 0, minWidth: '20px', boxShadow: 'none', padding: '0px'}} variant='outlined'>
                <Icon path={mdiDelete} size={1}/>
            </Button>
        </div>
    );
}

function Ingredients() {

    const recipe = useSelector((state) => state.recipe);
    var {ingredients} = recipe;

    return(
        <div>
            {ingredients.map((ingredient, iIndex) => (
                <div key={iIndex} style={{position: 'relative', marginTop: iIndex > 0 ? '58px': 0}}>
                    {/* Eingabefelder */}
                    <div style={{padding: '0px 10px'}}>
                        {/* Titel */}
                        <Title key={iIndex} iIndex={iIndex} title={ingredient.title} length={ingredients.length}/>
                        {/* Zutaten */}
                        {ingredient.food.map((food, fIndex) => (
                            <Food key={fIndex} iIndex={iIndex} fIndex={fIndex} length={ingredient.food.length} amount={food.amount} unit={food.unit} aliment={food.aliment}/>
                        ))}
                    </div>
                    {/* Umrandung */}
                    <div style={{position: 'absolute', borderLeft: '1px solid grey', borderTop: '1px solid grey', height: '100%', top: 28, left: 0, width: '7px'}}/>
                    <div style={{position: 'absolute', borderRight: '1px solid grey', height: '100%', top: 28, right: 0}}/>
                    <div style={{position: 'absolute', borderTop: '1px solid grey', top: 28, right: 0, width: '40%'}}/>
                    <div style={{position: 'absolute', borderBottom: '1px solid grey', height: '28px', width: '100%'}}/>
                </div>
            ))}
        </div>
    );
}

export default Ingredients;