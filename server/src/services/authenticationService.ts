import { Authentication } from '../models/authentication';


export const createAuthenticationORM = async (data: { userId: number, password: string, salt?: string, sessionToken?: string }) => {
    return await Authentication.create(data);
}

export const partialUpdateSessionTokenOfAuthenticationORM = async ( userId: number, sessionToken: string ) => {
    return await Authentication.update(
        { sessionToken },
        {
            where: {
                userId
            }
        }
    );
}