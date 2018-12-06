import { Router } from 'express';
import { UsersRepository } from '../../users/infrastructure/repositories';
import { getPostgresDB } from '../services';
import { LoginCommand } from '../../users/application/commands';

export const sessionRouter = Router();

sessionRouter.route('/session')
    .post(async (req, res) => {
        const usersRepository = new UsersRepository(getPostgresDB());
        const loginCommand = new LoginCommand(usersRepository);

        // Execute command
        const result = await loginCommand.execute(req.body);

        if (!result.hasErrors()) {
            // Generate new session
            req['session'].regenerate((error) => {
                if (error) {
                    return res.status(500).json({
                        code: 500,
                        msg: 'Internal server error',
                        data: null
                    });
                }

                // Save user in session
                this.req['session'].user = result.data;

                // Return response
                return res.status(result.getStatusCode()).json({
                    code: result.getStatusCode(),
                    msg: result.getMessage(),
                    data: result.data
                });
            });
        }
        else {
            // Return response
            return res.status(result.getStatusCode()).json({
                code: result.getStatusCode(),
                msg: result.getMessage(),
                data: result.data
            });
        }
    });

sessionRouter.route('/session/logout')
    .post((req, res) => {
        if (req['session'].user) {
            req['session'].destroy((err) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: 'Internal server error',
                        data: null
                    });
                }

                return res.json({
                    code: 200,
                    msg: null,
                    data: null
                });
            });
        }
        else {
            return res.json({
                code: 200,
                msg: null,
                data: null
            });
        }
    });
