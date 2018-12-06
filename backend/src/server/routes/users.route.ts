import { Router } from 'express';
import { UsersRepository } from '../../users/infrastructure/repositories';
import { getPostgresDB } from '../services';
import { RegistrationCommand } from '../../users/application/commands';

export const usersRouter = Router();

usersRouter.route('/users')
    .post(async (req, res) => {
        const usersRepository = new UsersRepository(getPostgresDB());
        const registrationCommand = new RegistrationCommand(usersRepository);

        const result = await registrationCommand.execute(req.body);

        // Check for success
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
