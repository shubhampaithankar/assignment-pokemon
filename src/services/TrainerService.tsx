//Modules
import axios from 'axios'

//Models
import { Trainer } from '../models'

export class TrainerService {
    
    //Variables
    private static apiKey = 'Y0r5g7sTATcGPcs4Pl'
    static apiURL = `https://noroff-assignment-api-shubham.herokuapp.com`

    //Functions
    static setDefaults = () => {
        axios.defaults.baseURL = TrainerService.apiURL
        axios.defaults.headers.common['X-API-Key'] = TrainerService.apiKey
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        axios.defaults.headers.put['Content-Type'] = 'application/json'
        axios.defaults.headers.patch['Content-Type'] = 'application/json'

        this.getAllTrainers()
            .then((apiTrainers) => {
                localStorage.setItem('trainers', JSON.stringify(apiTrainers))
            })

        return new Promise((res, rej) => res(true))
    }

    public static getAllTrainers = () => {
        return axios.get<Trainer[]>(`${this.apiURL}/trainers`).then(({ data }) => data)
    }

    public static loginTrainer = (username: any, setIsLoggedIn: any) => {

        let trainers = localStorage.getItem('trainers') as string
        if (trainers == null) this.setDefaults()
        
        const user = JSON.parse(trainers).filter((u: Trainer) => u.username === username).shift()
        if (user) {
            sessionStorage.setItem('isLoggedIn', 'true')
            sessionStorage.setItem('currentUser', JSON.stringify(user))
            setIsLoggedIn(true)
            return true
        } else {
            this.logoutTrainer(setIsLoggedIn)
            return false
        }

    }

    public static logoutTrainer = (setIsLoggedIn: any) => {
        sessionStorage.setItem('isLoggedIn', 'false')
        sessionStorage.setItem('currentUser', '[]')
        setIsLoggedIn(false)
    }

    public static createTrainer = (username: any) => {

        let trainers = localStorage.getItem('trainers') as string
        if (trainers == null) return this.setDefaults()

        const user = JSON.parse(trainers).filter((u: Trainer) => u.username === username).shift()
            if (user) {
                return false
            } else {
                return axios.post(`${this.apiURL}/trainers`, JSON.stringify({
                    username,
                    pokemon: []
                }), { 
                    headers: {
                        'X-API-Key': this.apiKey,
                        'Content-Type': 'application/json'
                    }
                })
                .then(({ data }: any) => {
                    this.setDefaults()
                    return data
                })
            }
        }

    public static updateTrainer = (trainer: Trainer) => {
        const { id = '' } = trainer
        return axios.patch<Trainer>(`${this.apiURL}/trainers/${id}`, trainer).then(({ data }) => data)
    }
}