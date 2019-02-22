export class Usuario {

    constructor(
        nombre = '',
        correo = '',
        programa = '',
        edad = '',
        semestre = '',
        historial = '',
        contador = 0,
        rol = ''
    ) {
        this.nombre = nombre;
        this.correo = correo;
        this.programa = programa;
        this.edad = edad;
        this.semestre = semestre;
        this.historial = historial;
        this.contador = contador;
        this.rol = rol;
    }
    nombre?: string;
    correo?: string;
    programa?: string;
    edad?: string;
    semestre?: string;
    historial?: string;
    contador?: number;
    rol?: string;
}
