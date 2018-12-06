export enum queryResult {
    one = 1,
    many = 2,
    none = 4,
    any = 6
}

export interface IDatabaseAdapter {
    getRow(query: string, values?): Promise<any>;

    get(query: string, values?): Promise<Array<any>>;

    execute(query: string, values?: any, qrm?: queryResult): Promise<any>;

    tx(cb);
}
