export class Usuario {

    constructor(
        nombre = '',
        correo = '',
        programa = '',
        edad = '',
        semestre = '',
        historial = '',
        contador = 0,
    ) {
        this.nombre = nombre;
        this.correo = correo;
        this.programa = programa;
        this.edad = edad;
        this.semestre = semestre;
        this.historial = historial;
        this.contador = contador;
    }
    nombre?: string;
    correo?: string;
    programa?: string;
    edad?: string;
    semestre?: string;
    historial?: string;
    contador?: number;
}
