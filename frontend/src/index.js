import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {createStore} from 'redux';
import appReducers from './reducers/index';
import {Provider} from 'react-redux';
import router from './router.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery';
// import 'popper.js/dist/umd/popper';
// import 'bootstrap/dist/js/bootstrap.min.js';
const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
    <Provider store = {store}>
        {router}
    </Provider>,
    document.getElementById('root')
);