import React,{useState, useEffect} from 'react'
import './card.css';
import spinner from '../pokemon/spinner.gif';
import {Link} from 'react-router-dom';



export default function Pokecard(props) {


    const [name,setName] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [pokemonIndex,setPokemonIndex] = useState("");
    const [loaded,setLoaded] = useState(false);

    const componentDidMount=()=> {
        const name= props.name;
        const url = props.url;
        const pokemonIndex = url.split('/')[url.split("/").length=6];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        setName(name);
        setPokemonIndex(pokemonIndex);
        setImageUrl(imageUrl);
    }


    useEffect(() => {
        componentDidMount();
      },[]);


    return (
            <div className='col-md-3 col-sm-8 mb-5'>
                <Link to={`/pokedex/${pokemonIndex}`} style={{textDecoration:'none',color:'black'}}>
                <div className="card">
                    <h5 className="card-header">{pokemonIndex}</h5>
                    <img src={imageUrl} className="card-img" alt=""
                    onLoad={()=> setLoaded(true)}/>
                    <img style={{display:loaded===true?'none':'visible'}} src={spinner} alt="loading..." className="spinner"/>
                    <div className="card-body">
                        <h6 className="card-title">
                        {name.split(" ")
                        .map(
                            letter=> letter.charAt(0).toUpperCase()+letter.substring(1))}
                        </h6>
                    </div>
                </div>
                </Link>
            </div>
    );
}









