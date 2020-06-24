import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`

    border: 0.5rem outset pink;
    outline: 0.5rem solid khaki;
    box-shadow: 0 0 0 2rem skyblue;
    border-radius: 12px;
    font: bold 1rem sans-serif;
    margin: 2rem;
    padding: 1rem;
    outline-offset: 0.5rem;

`
const GameImage = styled.img`

height:270px;
width:480px;
margin-right: 30px;
border-radius: 3px;


`
const Game = (props) => {
    return ( 
        <StyledDiv>
           <GameImage src={props.background_image}/>
            <h4>Game: {props.name}</h4>
            <h4>Consoles: {props.platforms.map(platform => platform.platform.name + ', ')}</h4>
            
        </StyledDiv>
     );
}
 
export default Game;