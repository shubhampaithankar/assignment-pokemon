export class PokemonService {
    //Variables
    apiKey = ''

    //Functions
    getRandomNumber = () => {
        return Math.ceil((Math.random() * 1000) - 1)
    }
}