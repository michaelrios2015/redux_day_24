// so apperently we are not using creatStore anymore... for the time being I don't care and will keep on using it
// at somepoint I should try switching 
// well this is how they want me to do it so sure 
import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'


const initalState = {
    users: [],
    loading: true 
}

const rootReducer = (state = initalState, action) => {
// so by splatting things out we have a pure function or some such 
    if(action.type === 'LOAD_USERS'){
        state = {...state, users: action.users}
    }
    if(action.type === 'LOADED'){
        state = {...state, loading: false}
    }
    if(action.type === 'CREATE_USER'){
        state = {...state, users: [...state.users, action.user]}
    }
    return state 
}

// const store = createStore((state = initalState, action)=> {
//     return state
// });

const store = configureStore({
    reducer: rootReducer
});

export default store;