import React, { Component } from "react";
import Game from "../Components/Game";
import Search from "../Components/Search";
import { CardDeck } from "react-bootstrap";
import styled from "styled-components";

const StyledPrice = styled.div`
  line-height: 1em;
  text-align: right;
  padding: 16px;
`;

class UserGameContainer extends Component {
  state = {
    filteredGames: [],
    totalPrice: 0,
  };

  componentDidUpdate(){
    if (this.props.currentgames.length !== this.state.filteredGames.length){
        this.setState({filteredGames: this.props.currentgames})
    }
  }

  componentDidMount() {
    this.setState({ filteredGames: this.props.currentgames });
  }

  filterGames = (searchTerm) => {
    const filteredGames = this.props.currentgames.filter((game) =>
      game.title
        ? game.title.toLowerCase().includes(searchTerm) ||
          game.title.includes(searchTerm)
        : game.name.toLowerCase().includes(searchTerm) ||
          game.name.includes(searchTerm)
    );
    this.setState({ filteredGames: filteredGames });
  };

  createGame = () => {};

  // getTotalPrice = () => {
  //     this.props.currentgames.map(game => {
  //         if (game.condition === 'Used') {
  //             this.setState({totalPrice: this.state.totalPrice + this.props.currentgames.loose_price})
  //         } else if (game.condition === 'New') {
  //             this.setState({totalPrice: this.state.totalPrice + this.props.currentgames.new_price})
  //         } else if (game.condition === 'Complete') {
  //             this.setState({totalPrice: this.state.totalPrice + this.props.currentgames.cib_price})
  //         }
  // })}

  render() {
    let total = 0;
    console.log("filtered", this.state.filteredGames);
    console.log("current", this.props.currentgames);
    // this.setState({filteredGames: this.props.currentgames})
    this.props.currentgames.map((game) => {
      // check out .reduce

      if (game.condition === "Loose") {
        total += parseInt(game.loose_price, 10);
      } else if (game.condition === "New") {
        total += parseInt(game.new_price, 10);
      } else if (game.condition === "Complete") {
        total += parseInt(game.cib_price, 10);
      }
    });

    return (
      <div>
        <Search clickHandler={this.filterGames} />
        <StyledPrice>
          <h1 style={{ color: "gold" }}>GameChange: {total}</h1>
        </StyledPrice>
        <CardDeck>
          {this.state.filteredGames.map((game) => (
            <Game
              updateGames={this.props.updateGames}
              updatePrice={this.updatePrice}
              key={game.id}
              game={game}
              sellGame={this.props.sellGame}
              deleteGame={this.props.deleteGame}
            />
          ))}
        </CardDeck>
      </div>
    );
  }
}

export default UserGameContainer;
