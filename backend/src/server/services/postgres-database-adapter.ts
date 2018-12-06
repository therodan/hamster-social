import * as pgp from 'pg-promise';
import { IDatabaseAdapter } from '../../shared/infrastructure';

export class PostgresDatabaseAdapter implements IDatabaseAdapter {
    constructor(protected db: pgp.IBaseProtocol<any>) {
    }

    getRow(query: pgp.TQuery, values = null) {
        return this.db.oneOrNone(query, values);
    }

    get(query: pgp.TQuery, values = null) {
        return this.db.manyOrNone(query, values);
    }

    execute(query: pgp.TQuery, values?: any, qrm?: pgp.queryResult) {
        return this.db.query(query, values, qrm);
    }

    tx(cb) {
        return this.db.tx(cb);
    }
}
