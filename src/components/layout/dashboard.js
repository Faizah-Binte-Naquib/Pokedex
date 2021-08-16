import React, { Component } from 'react';
import PokemonList from '../pokemon/pokelist';

export default class dashboard extends Component {
    render() {
        return (
            <div>
                <PokemonList/>
            </div>
        )
    }
}
