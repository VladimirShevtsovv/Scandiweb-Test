import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App-container';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Provider} from "react-redux";
import store from './redux/redux-store'


export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <App client={client}/>
                </Provider>
            </React.StrictMode>
        </BrowserRouter>
    </ApolloProvider>
);


