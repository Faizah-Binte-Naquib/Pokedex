import React,{useState, useEffect} from 'react'
import axios from 'axios';
import './pokedex.css';



export default function Pokedex(props) {

    //declaring all the properties and their states that we will be collecting from the api
    const [name,setName] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [pokemonIndex,setPokemonIndex] = useState("");
    const [types,setTypes] = useState([]);
    const [hp,setHp]=useState("");
    const [attack,setAttack]=useState("");
    const [desc,setDesc]=useState("");
    const [height,setHeight]=useState("");
    const [weight, setWeight]=useState("");


    useEffect(() => {
        componentDidMount();
      },[]);

    const  componentDidMount = async()=>{
        const {pokemonIndex}=props.match.params;

        const pokemonUrl =`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl =`https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);
        setName(pokemonRes.data.name);
        setImageUrl(pokemonRes.data.sprites.front_default);

        //let {hp,attack}='';

        // eslint-disable-next-line array-callback-return
        pokemonRes.data.stats.map(stat=>{
            // eslint-disable-next-line default-case
            switch(stat.stat.name){
                case 'hp':
                    setHp(stat['base_stat']);
                    break;
                case 'attack':
                    setAttack(stat['base_stat']);
                    break;
            }
        });

        //convert decimeters to feet
        setHeight(Math.round((pokemonRes.data.height *0.328084+0.001)*100)/100);
        //converts to lbs
        setWeight(Math.round((pokemonRes.data.weight*0.220462+0.001)*100)/100);
        setTypes(pokemonRes.data.types.map(type=> type.type.name).join(','));

        //get description
        await axios.get(pokemonSpeciesUrl).then(res=>{
            let description='';
            // eslint-disable-next-line array-callback-return
            res.data.flavor_text_entries.some(flavor=>{
                if(flavor.language.name==='en'){
                description=flavor.flavor_text;
                }

                setDesc(description);
            });
        });
    }


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
                            <img src={imageUrl} alt="loading..."/>
                            <h6>{name}</h6>
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
                            <h6><span>Height:</span>{height}ft</h6>
                            <h6>HP:{hp}</h6>
                            <h6>Type:{types}</h6>
                            
                        </div>
                        <div className="col-md-6">
                            <h6>Weight:{weight}lbs</h6>  
                            <h6>Attack:{attack}</h6>
                        </div>
                        <div className="col-md-12">
                        <h6>Details:{desc}</h6>
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