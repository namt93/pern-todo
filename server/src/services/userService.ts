import Authentication from '../models/authentication';
import User from '../models/user';


export const getUserByIdORM = async (id: number) => {
    return await User.findByPk(id);
}

export const getUserAuthenticationByEmailORM = async (email: string) => {
    return await User.findOne({
        where: { email },
        include: {
            model: Authentication,
            attributes: { exclude: [ 'id', 'userId'] }
        }
    })
}

export const getUserByEmailORM = async ( email: string ) => {
    return await User.findOne({ where: { email: email } });
}

export const getUserBySessionTokenORM = async (sessionToken: string) => {
    return await User.findAll({
        include: {
            model: Authentication,
            where: { sessionToken },
            attributes: []
        },
    });
}

export const createUserORM = async ( data: { username: string, email: string } ) => {
    return await User.create(data);
}
