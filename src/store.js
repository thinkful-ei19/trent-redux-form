import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers({
        form: formReducer
    }), 
    applyMiddleware(thunk)
);