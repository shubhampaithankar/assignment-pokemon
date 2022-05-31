import axios from "axios";

//Models
import { Pokemon } from "../models/"

export class PokemonService {
    //Variables
    static apiURL = 'https://pokeapi.co/api/v2'

    //Functions
    static setDefaults = () => {
        let pokemonData: any[] = []
        for (let i = 1; i <= 8; i++) {
            this.getGenerationData(i)
                .then((data) => {
                    pokemonData.push(data)
                })
        }
        setTimeout(() => {
            localStorage.setItem('pokemonData', JSON.stringify(pokemonData))
        }, 1000 * 1)
        return new Promise((res, rej) => res(true))
    }

    public static getPokemonsList = () => {
        return axios.get(`${this.apiURL}/pokemon?limit=910`)
            .then(({ data: { results } }) => results)
    }

    public static getPokemonData = (pokemon: any) => {
        let arr: Pokemon[] = []
        pokemon.forEach(async (p: Pokemon) => {
            const { data } = await axios.get<Pokemon>(`${this.apiURL}/pokemon/${p}`)
            arr.push(data)
        })
        return new Promise((res, rej) => res(arr))
    }

    public static getGenerationData = (gen: any) => {
        return axios.get(`${this.apiURL}/generation/${gen}`).then(({ data }) => data)
    }

}