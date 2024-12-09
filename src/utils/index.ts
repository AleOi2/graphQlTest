type genericObj = {
    [key: string]: any
}

export function safeAccess(object: genericObj, keyArray: any[], defaultValue: any) {
    try {
        let aux = object;
        for (const key of keyArray) {
            if (typeof aux !== 'object') {
                return defaultValue;
            }
            if (aux !== undefined && aux[key] !== undefined) {
                aux = aux[key];
            }
        }
        if (aux === undefined) {
            return defaultValue;
        }
        return aux;
    } catch (error) {
        return defaultValue
    }
}
