export const interesNominalJ = [
    { code: 'NM', value: 12, label: 'Nominal Mensual' },
    { code: 'NB', value: 6, label: 'Nominal Bimestral' },
    { code: 'NT', value: 4, label: 'Nominal Trimestral' },
    { code: 'NC', value: 3, label: 'Nominal Cuatrimestral' },
    { code: 'NS', value: 2, label: 'Nominal Semestral' },
    { code: 'MV', value: 12, label: 'Vencida Mensual' },
    { code: 'BV', value: 6, label: 'Vencida Bimestral' },
    { code: 'TV', value: 4, label: 'Vencida Trimestral' },
    { code: 'CV', value: 3, label: 'Vencida Cuatrimestral' },
    { code: 'SV', value: 2, label: 'Vencida Semestral' },
    { code: 'CM', value: 12, label: 'Convertible Mensual' },
    { code: 'CB', value: 6, label: 'Convertible Bimestral' },
    { code: 'CT', value: 4, label: 'Convertible Trimestral' },
    { code: 'CC', value: 3, label: 'Convertible Cuatrimestral' },
    { code: 'CS', value: 3, label: 'Convertible Semestral' },
    { code: 'CA', value: 2, label: 'Convertible Anual' },
];

export const interesEfectivaCapitalizar = [
    { code: 'EM', value: 12, label: 'Efectiva Mensual' },
    { code: 'EB', value: 6, label: 'Efectiva Bimestral' },
    { code: 'ET', value: 4, label: 'Efectiva Trimestral' },
    { code: 'EC', value: 3, label: 'Efectiva Cuatrimestral' },
    { code: 'ES', value: 2, label: 'Efectiva Semestral' },
    { code: 'EA', value: 1, label: 'Efectiva Anual' },
]

export const interesEfectivaI = [
    ...interesEfectivaCapitalizar,
    { code: 'PM', value: 12, label: 'Periódica Mensual' },
    { code: 'PB', value: 6, label: 'Periódica Bimestral' },
    { code: 'PT', value: 4, label: 'Periódica Trimestral' },
    { code: 'PC', value: 3, label: 'Periódica Cuatrimestral' },
    { code: 'PS', value: 2, label: 'Periódica Semestral' },
    { code: 'PA', value: 1, label: 'Periódica Anual' },
];



export const modalidadPago = [
    { value: 12, label: 'Mensual' },
    { value: 6, label: 'Bimestral' },
    { value: 4, label: 'Trimestral' },
    { value: 3, label: 'Cuatrimestral' },
    { value: 2, label: 'Semestral' },
    { value: 1, label: 'Anual' },
];

/**
 * Convierte la tasa de interes a decimales usando dependiendo de si está en efectiva  `i` o en nominal `j`
 * @param { modalidadPago } Modalidad de pago @see modalidadPago
 * @param { tasaInteres } Tasa de interes
 * @param { modalidadInteres } Código Modalidad del interes @see interesNominalJ @see interesEfectivaI
 * @returns 
 */
export const convertirInteres = (modalidadPago: number, tasaInteres: number, modalidadInteres: string) => {
    // Busca la modalidad de interes en la lista de j
    let val = interesNominalJ.filter(k => k.code === modalidadInteres);

    tasaInteres /= 100;

    // Si la modalidad de interes esta en j
    if (val.length > 0) {
        tasaInteres /= val[0].value;
    } else {
        // Busca la modalidad de interes en la lista de i
        val = interesEfectivaI.filter(k => k.code === modalidadInteres);
    }

    const valueI = val[0].value;

    // Valida si no están en el mismo periodo de tiempo el pago y el interes, si es asi, los convierte al mismo periodo de tiempo
    if (modalidadPago !== valueI) {
        const n = valueI;
        const value = Math.pow((1 + tasaInteres), n);
        tasaInteres = Math.pow(value, 1 / modalidadPago) - 1;
    }

    return tasaInteres;
}

//Agregar lo de anticipada
export const convertirTasasDeInteres = (tasaInteres: number, codigoTasaOrigen: string, codigoTasaDestino: string, anticipadaOrigen: boolean, anticipadaDestino: boolean) => {
    let origen = interesEfectivaI.filter(k => k.code === codigoTasaOrigen);
    const destinoOriginal = interesEfectivaI.filter(k => k.code === codigoTasaDestino);
    let destino = interesEfectivaI.filter(k => k.code === codigoTasaDestino);

    tasaInteres /= 100; 

    // Valida si origen es j y destino es i
    if (origen.length == 0 && destino.length > 0) {
        origen = interesNominalJ.filter(k => k.code === codigoTasaOrigen);
        if(origen.length == 0) {
            throw new Error('Origen not found');
        }
        //Pasando de J a I
        tasaInteres /= origen[0].value;//i
        //Preguantar si es anticipada
        if (anticipadaOrigen && !anticipadaDestino) { //Ja - I
            // Convertir a I
            tasaInteres = convertirAnticipadaAInteres(tasaInteres);
        }
        if (!anticipadaOrigen && anticipadaDestino) {
            //Convertir Ia
            tasaInteres = convertirInteresAnticipada(tasaInteres);
        }
    } else if (origen.length == 0 && destino.length == 0) {
        origen = interesNominalJ.filter(k => k.code === codigoTasaOrigen);
        tasaInteres/= origen[0].value;
    }

    if (origen.length == 0) {
        origen = interesNominalJ.filter(k => k.code === codigoTasaOrigen);
    }

    if (destino.length == 0) {
        destino = interesNominalJ.filter(k => k.code === codigoTasaDestino);
    }


    // Valida si no están en el mismo periodo de tiempo el origen y el destino, si es asi, los convierte al mismo periodo de tiempo
    if (origen[0].value != destino[0].value) {
        const n = origen[0].value;
        const m = destino[0].value;
        const value = Math.pow((1 + tasaInteres), n);
        tasaInteres = Math.pow(value, 1 / m) - 1;
    }

    //valida si es de I a J
    if (origen.length > 0 && destinoOriginal.length == 0) {
        const destinoJ = interesNominalJ.filter(k => k.code === codigoTasaDestino);
        if(destinoJ.length == 0) {
            throw new Error('Destino not found');
        }

        // Validar si es Ia y va a J
        if (anticipadaOrigen && !anticipadaDestino) {
            tasaInteres = convertirAnticipadaAInteres(tasaInteres);
        }
        // Si es I y va a Ja
        if (!anticipadaOrigen && anticipadaDestino) {
            tasaInteres = convertirInteresAnticipada(tasaInteres);
        }
        // Conversion de i a J
        tasaInteres *= destinoJ[0].value;
    }

    tasaInteres *= 100;

    return tasaInteres.toFixed(3);
}

//Tengo ia - pasar i
export const convertirAnticipadaAInteres = (valorInteresIa: number) => {
    const valorInteres = valorInteresIa/(1-valorInteresIa);
    return valorInteres;
}

//Tengo i - pasar ia
export const convertirInteresAnticipada = (valorInteres: number) => {
    const valorInteresIa = valorInteres/(1+valorInteres);
    return valorInteresIa;
}

/**
 * Calcula la cuota usando la formula de valor presente
 * @param { valorDeuda } El valor de la deuda 
 * @param { interes } El interes 
 * @param { nroPagos } El número de cuotas
 * @returns El valor de la cuota
 */
export const calcularCuota = (valorDeuda: number, interes: number, nroPagos: number) => {
    const bottomPart = (1 - Math.pow(1 + interes, (nroPagos * -1))) / interes;
    const a = valorDeuda / bottomPart;

    return parseFloat(a.toFixed(3));
}




/**
 * Calcula la cuota futura usando la formula de valor presente
 * @param { valorDeuda } El valor de la deuda 
 * @param { interes } El interes 
 * @param { nroPagos } El número de cuotas
 * @returns El valor de la cuota
 */
export const calcularCuotaFutura = (valorDeuda: number, interes: number, nroPagos: number) => {
    const bottomPart = (Math.pow(1 + interes, nroPagos) - 1) / interes;
    const a = valorDeuda / bottomPart;

    return parseFloat(a.toFixed(3));
}

/**
 * Convierte un valor a pesos colombianos
 * @param {El valor a convertir} value 
 * @returns 
 */
export const convertNumber = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
}

/**
 * Convierte un valor a pesos colombianos
 * @param {El valor a convertir} value 
 * @returns 
 */
export const calcularValorPresenteRP = (valorRentaPerpetua: number, interes: number) => {
    const valorPresente = valorRentaPerpetua / interes;
    return parseFloat(valorPresente.toFixed(3));
}