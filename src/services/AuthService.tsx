import axios from "axios"

export class AuthenticationService {

    private static apiKey = 'Y0r5g7sTATcGPcs4Pl'
    static apiURL = `https://noroff-assignment-api-shubham.herokuapp.com`

    static trainers = JSON.parse(localStorage.getItem('trainers') as string)

    public static login = (username: any, setIsLoggedIn: any) => {
        let user = this.trainers.filter((u: any) => u.username === username)
        if (user.length) {
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('currentUser', JSON.stringify(user))
            setIsLoggedIn(true)
            return true
        } else {
            this.logout(setIsLoggedIn)
            return false
        }
    }

    public static register = (username: any) => {
        const user = this.trainers.filter((u: any) => u.username === username)
        if (user.length) {
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
                this.trainers.push(data)
                localStorage.setItem('trainers',JSON.stringify(this.trainers))
                return data
            })
        }
    }

    public static logout = (setIsLoggedIn: any) => {
        localStorage.setItem('isLoggedIn', 'false')
        localStorage.setItem('currentUser', '')
        setIsLoggedIn(false)
    }
}