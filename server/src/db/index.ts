import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: 'perntodo'
});