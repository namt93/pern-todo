import { pool } from "./index";

export const createTodo = async (values: Record<string, any>) => {
    const description = values['description'];

    const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
    );
    
    return newTodo.rows[0];
}

export const createTodoByAuthUser = async (values: Record<string, any>) => {
    const {description, user_id} = values;

    const newTodo = await pool.query(
        "INSERT INTO todo (description, user_id) VALUES($1, $2) RETURNING *",
        [description, user_id]
    );
    
    return newTodo.rows[0];
}

export const getTodos = async () => {
    const todos = await pool.query("SELECT * FROM todo");
    return todos.rows;
}

export const getTodosByAuthUser = async (user_id: Number) => {
    const todos = await pool.query("SELECT * FROM todo WHERE user_id = $1", [user_id]);
    return todos.rows;
}

export const updateTodoById = async (id: Number, user_id: Number, values: Record<string, any>) => {
    const { description } = values;

    const query = `
        UPDATE todo
        SET description = $1
        WHERE todo_id = $2 AND user_id = $3
        RETURNING *
    `;

    const result = await pool.query(query, [description, id, user_id]);

    return result.rows[0];
}

export const deleteTodoById = async (id: Number, user_id: Number) => {
    const query = `
        DELETE FROM todo
        WHERE todo_id = $1 AND user_id = $2
    `;

    const result = await pool.query(query, [id, user_id]);
}