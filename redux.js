import {configureStore, createSlice} from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name:"favoriteCok",
    initialState:[],
    reducers:{
        addCoktail: (state,action) => {
            state.push(action.payload)
        },
        deleteCoktail: (state,action) => {
            state = state.filter((c) =>{return c.idDrink !== action.payload} );
            return state
        }
    }
})

export const store = configureStore({
    reducer: {
        favoriteCok: favoriteSlice.reducer
    }
})

// action creator (redux)
export const createFavorite = (item) => {
    return {
        type: "favoriteCok/addCoktail",
        payload: item
    }
}

export const deleteFavorite = (id) => {
    return {
        type: "favoriteCok/deleteCoktail",
        payload: id
    }
}