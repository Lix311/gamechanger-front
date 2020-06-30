import React from 'react';
import { Card, CardGroup, button } from 'react-bootstrap';
import styled from 'styled-components'


const StyledCard = styled.div`
    background-color: grey;
    height: 100%;
    width: 400px;

`



const Game = (props) => {

    return ( 
  
  <StyledCard>
    <Card.Img variant="top" src={props.game.background_image} />
    <Card.Body>
    <Card.Title>{props.game.name}</Card.Title>
      <button>See Description</button>
      <button onClick={() => 
                props.buyGame
                ? props.buyGame(props.game)
                : props.addGame ? props.addGame(props.game) : props.sellGame(props.game)}>{
                
                props.buyGame ? 'Buy Game' : props.addGame ? 'Add Game' : 'Sell Game'}
        </button>
    </Card.Body>
    <Card.Footer>
    <small>{props.game.platforms.map(platform => platform.platform.name + ' ')}</small>
    </Card.Footer>
  </StyledCard>
  





     );
}
 
export default Game;