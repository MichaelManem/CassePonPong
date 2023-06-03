export class MathUtils {

    /**
     * Retourne un nombre aléatoire entre min (inclus) et max (exclus)
     */
    static getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

}
