const {Router} = require('express');
const { registerUserController, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controllers');
const { authUser } = require('../middleware/auth.middleware');
const authRouter = Router();

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */
authRouter.post('/login',loginUserController);
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register',registerUserController );
/**
 * @route GET /api/auth/logout 
 * @description clear token  from user cookies and add the token to blacklist
 * @access public
 */
authRouter.get('/logout',logoutUserController )

/**
 * @route GET /api/auth/get-me
 * @description get the details of the logged in user
 * @access private
 */
authRouter.get('/get-me',authUser,getMeController)
module.exports = authRouter;