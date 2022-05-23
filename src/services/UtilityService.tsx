export class UtilityService {
    public static randomNumberfromRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    public static randomItemfromArray = (arr: any[], n: number, promise?: boolean) => {
        return arr.sort(() => Math.random() - Math.random()).slice(0, n)
    }

    public static capitalizeString = (string: string) => {
        return  string ? string[0].toUpperCase() + string.slice(1) : ''
    }
}