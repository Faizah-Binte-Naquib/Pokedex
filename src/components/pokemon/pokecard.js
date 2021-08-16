import React, { Component } from 'react';
import './card.css';
import spinner from '../pokemon/spinner.gif';
import {Link} from 'react-router-dom';

export default class pokecard extends Component {
    state={
        name:'',
        imageUrl:'',
        pokemonIndex:'',
        loaded:false
    };

    componentDidMount() {
        const name= this.props.name;
        const url = this.props.url;
        const pokemonIndex = url.split('/')[url.split("/").length=6];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({name: name, 
            imageUrl: imageUrl, 
            pokemonIndex: pokemonIndex});
    }

    render() {

        return (
            <div className='col-md-3 col-sm-6 mb-5'>
                <Link to={`/pokedex/${this.state.pokemonIndex}`} style={{textDecoration:'none',color:'black'}}>
                <div className="card">
                    <h5 className="card-header">{this.state.pokemonIndex}</h5>
                    <img src={this.state.imageUrl} className="card-img" alt=""
                    onLoad={()=> this.setState({loaded:true})}/>
                    <img style={{display:this.state.loaded===true?'none':'visible'}} src={spinner} alt="loading..." className="spinner"/>
                    <div className="card-body">
                        <h6 className="card-title">
                        {this.state.name.split(" ")
                        .map(
                            letter=> letter.charAt(0).toUpperCase()+letter.substring(1))}
                        </h6>
                    </div>
                </div>
                </Link>
            </div>
        )
    }
}
