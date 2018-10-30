export class TopRanking {
    constructor(
        programa = '',
        contador = 0,
    ) {
        this.programa = programa;
        this.contador = contador;
    }
    programa?: string;
    contador?: number;
}
