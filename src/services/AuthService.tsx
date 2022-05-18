export class AuthenticationService {

    public static logout = () => {
        localStorage.setItem('isLoggedIn', 'false')
        localStorage.setItem('currentUser', '')
    }

    public static login = (user: any) => {
        const trainers = JSON.parse(localStorage.getItem('trainers') as string)
        const userExists = trainers.filter((u: any) => u.username === user?.username)
        return userExists.length ? true : false
    }
}