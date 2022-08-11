import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CountriesFetchingContextProvider} from "./context/CountriesFetching/CountriesFetching"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CountriesFetchingContextProvider>
        <App />
    </CountriesFetchingContextProvider>
    
);

