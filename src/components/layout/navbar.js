import React, { Component } from 'react'
import './navbar.css';
import {Link} from 'react-router-dom';

export default class navbar extends Component {
    render() {
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
        );
    }
}
