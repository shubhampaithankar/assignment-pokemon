//Modules
import axios from 'axios'

//Models
import { Trainer } from '../models'

export class TrainerService {
    
    //Variables
    private static apiKey = 'Y0r5g7sTATcGPcs4Pl'
    static apiURL = `https://noroff-assignment-api-shubham.herokuapp.com`

    //Functions
    public static getAllTrainers = () => {
        return axios.get<Trainer[]>(`${this.apiURL}/trainers`).then(({ data }) => data)
    }

    public static updateTrainer = (trainer: Trainer) => {
        const { id = '' } = trainer
        return axios.patch<Trainer>(`${this.apiURL}/trainers/${id}`, trainer).then(({ data }) => data)
    }
}