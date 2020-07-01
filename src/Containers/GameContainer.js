import React from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'
import styled from 'styled-components'


const StyledContainer = styled.div`
    display: flex;
    background-color: grey;
    height: 100%;
    width: 400px;

`



const GameContainer = (props) => {
    return ( 
        <div>
            <Search  clickHandler={props.searchGame}/>
                
            {props.games.map(game => 
                <Game 
                key={game.id}
                game={game}
                addGame={props.addGame}
            
                />
                )}
               
           
        </div>
     );
}
 
export default GameContainer;