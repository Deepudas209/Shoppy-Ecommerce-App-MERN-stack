import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import Router from './routes/Router';
import { Provider } from 'react-redux';
import {store} from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={Router}/>
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
