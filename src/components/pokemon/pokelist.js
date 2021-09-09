import React,{useState, useEffect} from 'react'
import axios from 'axios';
import PokemonCard from './pokecard';



export default function Pokelist() {

    const [url,setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [pokemon,setPokemon]= useState(null);
    const [allPokemon,setAllPokemon] =useState(null);

    useEffect(() => {
        componentDidMount();
      },[]);


    const componentDidMount= async()=>{
        const res = await axios.get(url);
        setPokemon(res.data['results']);
        setAllPokemon(res.data['results']);
        return res;
    };

    const handleFilter = (event) =>{
        const searchTerm = event.target.value;
        console.log(searchTerm);
        // eslint-disable-next-line array-callback-return
        const newFilter = 
            allPokemon.map(pokemon=>{
                if(pokemon.name.includes(searchTerm)){
                    return pokemon;
                }
            });

         const  Filtered = newFilter.filter(function( element ) {
                return element !== undefined;
             });
            setPokemon(Filtered);
    };


    return (
        <div>
            <React.Fragment>
            <div class="input-group">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
            aria-describedby="search-addon" onChange={handleFilter}/>
            <button type="button" class="btn btn-outline-primary">search</button>
            </div>
            <br></br>
                { 
            pokemon ?(
            <div className="row">
                {pokemon.map(pokemon =>(
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
        </div>
    )
}
