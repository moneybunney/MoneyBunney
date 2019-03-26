export class ValidataionUtilities {
    static isString(val: any | undefined | null) {
        const isTruthly = Boolean(val);
        return isTruthly &&
            (val instanceof String || typeof val === 'string');
    }
}
