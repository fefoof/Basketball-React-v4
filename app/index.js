const router = require('express').Router();
const todoListRouter = require('./pages/to-do-list');
const playerRouter = require('./pages/players');
const userRouter = require('./pages/users');
const gameRouter = require('./pages/games');
const autenticationRouter = require('./pages/autentication');
const { appErrorHandler } = require('../middlewares/error-handler');
const { appAuthorizationMiddleware } = require('../middlewares/authorization-middleware');

router.use(appAuthorizationMiddleware);
router.use('/players', appAuthorizationMiddleware, playerRouter);
router.use('/users', userRouter);
router.use('/games', gameRouter);
router.use('/to-do-list', todoListRouter);
router.use('/autentication', autenticationRouter);
//router.use('/*', todoListRouter);/// ACA METER LA FUNCION DE SESSION cuando voy a usar antes de llamar a todoListRouter

router.use(appErrorHandler);

module.exports = router;