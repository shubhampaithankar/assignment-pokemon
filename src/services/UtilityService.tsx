import _ from 'lodash'

export class UtilityService {
    public static randomNumberfromRange = (min: number, max: number) => {
        return _.random(min, max)
    }

    public static shuffleArray = (arr: any[]) => {
        return _.shuffle(arr)
    }

    public static randomItemfromArray = (arr: any[], n: number) => {   
        return this.shuffleArray(arr).slice(0, n)
    }

    public static capitalizeString = (string: string) => {
        return  string ? _.capitalize(string) : ''
    }

    public static compareTwoObjects = (a: any, b: any) => {
        return _.isEqual(a, b)
    }
}