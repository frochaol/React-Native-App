import React, {useState, useEffect} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { getPokemonsApi, getPokemonDetailsByUrlApi } from "../api/pokemon";
import PokemonList from '../components/PokemonList';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    // console.log(pokemons);
    useEffect(() => {
        // Función anónima -- autoejecutable ()();
        (async () => {
            await loadPokemons();
        })();
    },[]);

    const loadPokemons = async () => {
        try {
            const response = await getPokemonsApi(nextUrl);
            setNextUrl(response.next);
            // for asíncrono 
            const pokemonsArray = [];
            for await (const pokemon of response.results) {
                const pokemonDetail = await getPokemonDetailsByUrlApi(pokemon.url);
                
                pokemonsArray.push({
                    id: pokemonDetail.id,
                    name: pokemonDetail.name,
                    type: pokemonDetail.types[0].type.name,
                    order: pokemonDetail.order,
                    image: pokemonDetail.sprites.other['official-artwork'].front_default
                })
            }
            // se agregan los datos de pokemonsArray a pokemons 1 por 1.
            setPokemons([...pokemons, ...pokemonsArray]);
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView>
            <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl}/>
        </SafeAreaView>
    )
}
