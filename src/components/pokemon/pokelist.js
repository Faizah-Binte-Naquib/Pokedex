import React, { Component } from 'react'
import axios from 'axios';
import PokemonCard from './pokecard';

export default class pokelist extends Component {

    state={
        url: 'https://pokeapi.co/api/v2/pokemon/',
        pokemon: null,
        allpokemon:null
    };
    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results']});
        this.setState({allpokemon: res.data['results']});
        return res;
    };

    handleFilter = (event) =>{
        const searchTerm = event.target.value;
        console.log(searchTerm);
        // eslint-disable-next-line array-callback-return
        const newFilter = 
            this.state.allpokemon.map(pokemon=>{
                if(pokemon.name.includes(searchTerm)){
                    return pokemon;
                }
            });

         const  Filtered = newFilter.filter(function( element ) {
                return element !== undefined;
             });
                this.setState({pokemon:Filtered});
    };

render(){
        return (
            <React.Fragment>
            <div class="input-group">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
            aria-describedby="search-addon" onChange={this.handleFilter}/>
            <button type="button" class="btn btn-outline-primary">search</button>
            </div>
            <br></br>
                { 
            this.state.pokemon ?(
            <div className="row">
                {this.state.pokemon.map(pokemon =>(
                    <PokemonCard name={pokemon.name}
                    url={pokemon.url}
                    key={pokemon.name} />
                ))}
            </div>
                ):(
                    <h1>Loading Pokemon...</h1>
                )
                }
             
            </React.Fragment>
        );
    }
}

