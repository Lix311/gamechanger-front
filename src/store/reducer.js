import * as actionTypes from './actions'

const initialState = {
    allGames: [], // everythin i searched
    games: [],
    usergames: [],
    soldgames: [],
    userInfo: [],
    currentUser: '',
    currentGame: '',
    userCurrentGames: [],
    currentGameIds: [],
    loggedIn: false, 
    deletedGames: []
}


const reducer = (state = initialState, action) => {
switch (action.type){
    case actionTypes.ADD_GAME:
        return {
            ...state,
        };
    case actionTypes.DELETE_GAME:
        return {

        };
    case actionTypes.UPDATE_GAME:
        return {
    
        };
    case actionTypes.SELL_GAME:
        return {
        
        };
    default:
        return state;
}

}

export default reducer;

