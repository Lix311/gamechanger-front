import React from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'
import styled from 'styled-components'


const StyledContainer = styled.div`
    background-color: grey;
    height: 100%;
    width: 400px;

`


const GameContainer = (props) => {
    return ( 
        <div>
            <Search  clickHandler={props.searchGame}/>
            <StyledContainer>
            {props.games.map(game => 
                <Game 
                key={game.id}
                game={game}
                addGame={props.addGame}
            
                />
                )}
            </StyledContainer>
           
        </div>
     );
}
 
export default GameContainer;