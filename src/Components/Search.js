import React, { Component } from 'react';

class Search extends Component {
    state = {  
        search:''
    }
    
    
    handleChange = (event) => {
        this.setState({search: event.target.value})
    }
    
    render() { 
        return (  
            <div>
                <input type='text' value={this.state.search} onChange={(event) => this.handleChange(event)} />
                <button  onClick={() => this.props.search(this.state.search)}>Search</button>
            </div>
        );
    }
}
 

 
export default Search;