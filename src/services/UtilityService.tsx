export class UtilityService {
    public static randomNumberfromRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    public static shuffleArray = (arr: any[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }

    public static randomItemfromArray = (arr: any[], n: number, promise?: boolean) => {   
        return this.shuffleArray(arr).slice(0, n)
    }


    // Math.ceil((Math.random() * (150 - 1 + 1) + 1)
    public static capitalizeString = (string: string) => {
        return  string ? string[0].toUpperCase() + string.slice(1) : ''
    }
}