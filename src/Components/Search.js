import React from 'react';

const Search = (props) => {
    return ( 
        <div className="searchBar">
            <input 
                placeholder='Search games' 
                type='text' 
                name='search'
                // value={props.search}
                // onChange={(event) => props.searchArticle(event)}
            />
        </div>
     );
}
 
export default Search;