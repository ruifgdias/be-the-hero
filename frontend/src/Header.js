import React from 'react/';
import App from './App';

function Hearder({children}) {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    )
}


export default Hearder;