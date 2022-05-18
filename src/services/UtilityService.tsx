export class UtilityService {
    public static randomNumberfromRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}