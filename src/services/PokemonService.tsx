import axios from "axios";

export class PokemonService {
    //Variables
    static apiURL = 'https://pokeapi.co/api/v2/pokemon'

    //Functions
    static getRandomNumber = (gen?: any) => {
        let min: number = 1, max: number = 908
        return Math.floor((Math.random() * max - min) - min)
    }

    public static getPokemonsList = () => {
        return axios.get(`${this.apiURL}?limit=910`).then(({ data: { results } }) => results)
    }

}