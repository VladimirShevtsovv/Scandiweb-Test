import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App-container';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './redux/redux-store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
        </BrowserRouter>
);


