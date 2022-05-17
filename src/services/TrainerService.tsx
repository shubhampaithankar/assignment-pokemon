//Modules
import axios from 'axios'

//Models
import { Trainer } from '../models'

export class TrainerService {

    //Variables
    private static apiKey = 'Y0r5g7sTATcGPcs4Pl'
    static apiURL = `https://noroff-assignment-api-shubham.herokuapp.com`

    //Functions
    static setDefaultConfig = () => {
        axios.defaults.baseURL = TrainerService.apiURL
        axios.defaults.headers.common['X-API-Key'] = TrainerService.apiKey
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        axios.defaults.headers.put['Content-Type'] = 'application/json'
        axios.defaults.headers.patch['Content-Type'] = 'application/json'
    }

    public static getAllTrainers = () => {
        return axios.get<Trainer[]>(`${this.apiURL}/trainers`).then(res => res.data)
    }
}