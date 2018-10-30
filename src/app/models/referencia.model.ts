export class Referencia {

    constructor(
        cita = '',
        referencia = '',
        subReferencia = ''
    ) {
        this.cita = cita;
        this.referencia = referencia;
        this.subReferencia = subReferencia;
    }
    cita?: string;
    referencia?: string;
    subReferencia?: string;
}
