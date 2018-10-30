export class ProgramasContador {

    constructor(
        nombre = '',
        contador = 0,
    ) {
        this.nombre = nombre;
        this.contador = contador;
    }
    nombre?: string;
    contador?: number;
}
