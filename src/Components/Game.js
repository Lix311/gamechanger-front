import React from 'react';
import styled from 'styled-components'
import { CardGroup, Card } from 'react-bootstrap';

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
        // <StyledDiv>
        //    <GameImage src={props.game.background_image}/>
        //     <h4>Game: {props.game.name}</h4>
        //     <h4>Consoles: {props.game.platforms.map(platform => platform.platform.name + ', ')}</h4>
            
        // </StyledDiv>
<div>

    
<Card>
    <Card.Img variant="top" src={props.game.background_image} />
    <Card.Body>
    <Card.Title>{props.game.name}</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
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
  </Card>

</div>



     );
}
 
export default Game;