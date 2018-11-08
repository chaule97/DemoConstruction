import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import appReducers from './reducers/index';
import {Provider} from 'react-redux';
import router from './router.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery';
// import 'popper.js/dist/umd/popper';
// import 'bootstrap/dist/js/bootstrap.min.js';
import './stylesheets/main.scss';
const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
    <Provider store = {store}>
        <div>
        {router}
            {/* <ReduxToastr
            timeOut={10000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar={false}/> */}
        </div>
    </Provider>,
    document.getElementById('root')
);