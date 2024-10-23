import { ServerRoute } from '@hapi/hapi';
import UserController from '../controllers/user.controller';

const userRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/users',
        handler: UserController.getUsers,
        options: {
            auth: 'jwt'
        }
    },
    {
        method: 'GET',
        path: '/api/users/{id}',
        handler: UserController.getUserById,
        options: {
            auth: 'jwt'
        }
    }
];

export default userRoutes;
