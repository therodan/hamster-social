import * as pgp from 'pg-promise';

import settings from '../settings';

// DB singleton
let db;

/**
 * Get Postgres DB connection
 */
export function getPostgresDB() {
    if (!db) {
        const postgres = pgp();
        db = postgres(settings.postgresConnectionString);
    }

    return db;
}
