import axios from "axios";

//Models
import { Pokemon } from "../models/"

export class PokemonService {
    //Variables
    static apiURL = 'https://pokeapi.co/api/v2/pokemon'

    //Functions
    public static getPokemonsList = () => {
        return axios.get(`${this.apiURL}?limit=910`)
            .then(({ data: { results } }) => results)
    }

    public static getPokemonData = (pokemon: any) => {
        let arr: Pokemon[] = []
        pokemon.forEach(async (p: Pokemon) => {
            const { data } = await axios.get<Pokemon>(`${this.apiURL}/${p}`)
            arr.push(data)
        })
        return new Promise((res, rej) => res(arr))
        // return axios.get<Pokemon>(`${this.apiURL}/${pokemon}`)
        //     .then(({ data }) => data)
    }

}