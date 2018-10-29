export class ReferenciaWhitKey {

    constructor(
        $key = '',
        cita = '',
        referencia = '',
        subReferencia = ''
    ) {
        this.$key = $key;
        this.cita = cita;
        this.referencia = referencia;
        this.subReferencia = subReferencia;
    }
    $key?: string;
    cita?: string;
    referencia?: string;
    subReferencia?: string;
}
