import React from 'react'
import './navbar.css';
import {Link} from 'react-router-dom';



export default function navbar() {
    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                <Link to="/">
                <a class="navbar-brand" href=".">Pokedex</a>
                </Link>
                </div>
            </nav>
        </div>
    )
}



