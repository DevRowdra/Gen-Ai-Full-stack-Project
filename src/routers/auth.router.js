const {Router} = require('express');
const { registerUserController, loginUserController } = require('../controllers/auth.controllers');
const authRouter = Router();

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login',loginUserController);
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register',registerUserController );

module.exports = authRouter;