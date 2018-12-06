import * as pgp from 'pg-promise';

import settings from '../settings';
import { PostgresDatabaseAdapter } from './postgres-database-adapter';

// DB singleton
let db: PostgresDatabaseAdapter;

/**
 * Get Postgres DB connection
 */
export function getPostgresDB() {
    if (!db) {
        const postgres = pgp();
        db = new PostgresDatabaseAdapter(postgres(settings.postgresConnectionString));
    }

    return db;
}
