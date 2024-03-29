export class MathUtils {

    /**
     * Retourne un nombre aléatoire entre min (inclus) et max (exclus)
     */
    static getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static randomIntStartTo1(max: number): number {
        return Math.floor(Math.random() * max) + 1
    }
    
    static randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Retourne un booléen aléatoire (true ou false) avec randomness en paramètre si 0.5 alors il y a 50% de chance qu'il soit à true
     */
    static getRandomBoolean(randomness: number = 0.5): boolean {
        return Math.random() < randomness;
    }

}
