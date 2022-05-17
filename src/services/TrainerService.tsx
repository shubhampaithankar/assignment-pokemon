export class TrainerService {
    //Variables
    apiKey = ''

    //Functions
    getRandomNumber = () => {
        return Math.ceil((Math.random() * 1000) - 1)
    }
}