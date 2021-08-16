import React, { Component } from 'react';
import axios from 'axios';
import './pokedex.css';

class pokedex extends Component {
    state={
        name:'',
        pokemonIndex:'',
        imageUrl:'',
        types : [],
        description:'',
        stats:{
            hp:'',
            attack:'',
        },
        height:'',
        weight:''
    }
    async componentDidMount(){
        const {pokemonIndex}=this.props.match.params;

        const pokemonUrl =`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl =`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let {hp,attack}='';

        pokemonRes.data.stats.map(stat=>{
            // eslint-disable-next-line default-case
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
            }
        });

        //convert decimeters to feet
        const height=Math.round((pokemonRes.data.height *0.328084+0.001)*100)/100;

        //converts to lbs
        const weight= Math.round((pokemonRes.data.weight*0.220462+0.001)*100)/100;

        const types = pokemonRes.data.types.map(type=> type.type.name).join(',');

        //get description

        await axios.get(pokemonSpeciesUrl).then(res=>{
            let description='';
            res.data.flavor_text_entries.some(flavor=>{
                if(flavor.language.name==='en'){
                description=flavor.flavor_text;
                return;
                }

                this.setState({description});
            });
        });

        this.setState({
            name,
            imageUrl,
            pokemonIndex,
            types,
            stats:{
                hp,
                attack
            },
            height,
            weight
        });
        
    }
    render() {
        return (
            <div>
                <div className=" row container">
                    <div className="left-panel">
                        <div className="top-buttons">
                        <span className="dot" id="power-button"></span>
                        <span className="dot" id="red"></span>
                        <span className="dot" id="yellow"></span>
                        <span className="dot" id="green"></span>
                        </div>
                        
                        <hr></hr>
                        <div className="screen">
                                <div className="screen-buttons">
                                    <span className="dot" id="screen-button-small"></span>
                                    <span className="dot" id="screen-button-small"></span>
                                <div className="screen-inner">
                                    <img src={this.state.imageUrl} alt="loading..."/>
                                    <h6>{this.state.name}</h6>
                                </div>
                                <span className="dot" id="screen-button-large"></span>
                                <div class="sound col-md-2">
                                <div className="line"></div>
                                <div className="line"></div>
                                <div className="line"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row last-buttons">
                        <span className="dot" id="lower-gray-button"></span>
                        <span className="dot" id="lower-red"></span>
                        <span className="dot" id="lower-yellow"></span>
                        </div>
                        <div className="row last-section">
                            <div className="col-md-6">
                                <div className="screen-inner" id="screen-inner-2"></div>
                            </div>
                            <div className="col-md-6">
                                <div className="plus">
                                    <div id="plus-1"></div>
                                    <div id="plus-2"></div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <hr className="section"></hr>
                    </div>
                    <div className="right-panel">
                        <br></br>
                        <div className="poke-details-screen">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6><span>Height: </span>{this.state.height}ft</h6>
                                    <h6>HP:{this.state.stats.hp}</h6>
                                    <h6>Type:{this.state.types}</h6>
                                    
                                </div>
                                <div className="col-md-6">
                                    <h6>Weight:{this.state.weight}lbs</h6>  
                                    <h6>Attack:{this.state.stats.attack}</h6>
                                </div>
                                <div className="col-md-12">
                                <h6>Details:{this.state.description}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="button-group">
                        <div className="row">
                        <div className="col-md-4 padding-0">
                            <div className="button"></div>
                            <div className="button"></div>
                        </div>
                        <div className="col-md-4 padding-0">
                            <div className="button"></div>
                            <div className="button"></div>
                        </div>
                        <div className="col-md-4 padding-0">
                            <div className="button"></div>
                            <div className="button"></div>
                            <div className="dot" id="right-panel-dot"></div>
                        </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default pokedex;