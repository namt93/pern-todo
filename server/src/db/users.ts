import { pool } from "./index";

export const getUserByEmail = async (email: string) => {
    const user = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    return user.rows[0];
}

export const getUserAuthenticationByEmail = async (email: string) => {
    const query = `
        SELECT users.id, users.username, users.email, authentication.password, authentication.salt, authentication.session_token
        FROM users
        INNER JOIN authentication ON users.id = authentication.user_id
        WHERE users.email = $1
    `;
    const result = await pool.query(query, [email]);

    return result.rows[0];
}

export const getUserBySessionToken = async (sessionToken: string) => {
    const query = `
        SELECT users.*
        FROM users
        INNER JOIN authentication ON users.id = authentication.user_id
        WHERE authentication.session_token = $1
    `;
    const user = await pool.query(query, [sessionToken]);

    return user.rows[0];
}

export const getUserById = async (id: Number) => {
    const user = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );

    return user.rows[0];
}

export const createUser = async (values: Record<string, any>) => {
    const {email, username, salt, password} = values;

    const client = await pool.connect();

    await client.query('BEGIN');

    const user = await client.query(
        'INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *',
        [email, username]
    )
    const userId = user.rows[0].id;

    await client.query(
        'INSERT INTO authentication (user_id, salt, password) VALUES ($1, $2, $3)',
        [userId, salt, password]
    )
    await client.query('COMMIT');

    return user.rows[0];
}

export const partialUpdateSessionTokenOfAuthentication = async (user_id: Number, session_token: string) => {
    const query = `
        UPDATE authentication
        SET session_token = $1
        WHERE user_id = $2
    `;

    const result = await pool.query(query, [session_token, user_id]);
}
