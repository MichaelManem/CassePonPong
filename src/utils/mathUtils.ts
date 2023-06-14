export class MathUtils {

    /**
     * Retourne un nombre aléatoire entre min (inclus) et max (exclus)
     */
    static getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * Retourne un booléen aléatoire (true ou false) avec 50% de chance qu'il soit à true
     */
    static getRandomBoolean() {
        return Math.random() < 0.5;
    }

}
