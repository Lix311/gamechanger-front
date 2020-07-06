import React, { Component } from "react";

class Search extends Component {
  // state = {
  //   search:''
  // }

  //handleChange = (event) => {
  //  this.setState({search: event.target.value})
  //}

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.tearm}
          onChange={this.props.handleChange}
        />
        <button onClick={() => this.props.clickHandler(this.props.term)}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
