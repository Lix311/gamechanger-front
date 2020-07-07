import React, { Component } from 'react';
import Game from '../Components/Game'
import Search from '../Components/Search'
import { CardDeck } from "react-bootstrap";
import styled from "styled-components";



class BuySellContainer extends Component {
    state = {  
        filteredGames: [],
        tearm: '',
        searchType: 'filter'
    }

    componentDidMount() {
        this.setState({ filteredGames: this.props.soldgames });
      }
    
    
      filterGames = () => {
        const filteredGames = this.props.soldgames.filter((game) =>
          game.title
            ? game.title.toLowerCase().includes(this.state.tearm) ||
              game.title.includes(this.state.tearm)
            : game.name.toLowerCase().includes(this.state.tearm) ||
              game.name.includes(this.state.tearm)
        );
        //debugger;
        return filteredGames;
        //this.setState({ filteredGames: filteredGames });
      };

      handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ tearm: e.target.value });
      };
    
    
    render() { 
        return (
            <div>
              <Search
                clickHandler={this.filterGames}
                handleChange={this.handleChange}
                tearm={this.state.tearm}
                searchType={this.state.searchType}
                placeholder='Filter Games'
              />
              <CardDeck>
                {this.filterGames().map((game) => (
                  <Game
                    usergames={this.props.usergames}
                    users={this.props.users}
                    key={game.id}
                    game={game}
                    buyGame={this.props.buyGame}
                    
                  />
                ))}
              </CardDeck>
            </div>
          );
    }
}
 
export default BuySellContainer;




