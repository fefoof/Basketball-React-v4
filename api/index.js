const router = require('express').Router();
const taskRouter = require('./tasks');
const playerRouter = require('./middlewares/player.middlewares');

const championshipRouter = require('./championship/championship.middlewares');
const groupRouter = require('./group/group.middlewares');
const fieldRouter = require('./field/field.middlewares');
const leagueRouter = require('./league/league.middlewares');
const teamRouter = require('./team/team.middlewares');
const userRouter = require('./users/user.middlewares');
const gameRouter = require('./games/game.middlewares');

const { apiErrorHandler } = require('../middlewares/error-handler');

const { apiAuthorizationMiddleware } = require('../middlewares/authorization-middleware');

router.use(apiAuthorizationMiddleware);
router.use('/tasks', taskRouter);
router.use('/middlewares', apiAuthorizationMiddleware, playerRouter);
router.use('/championship', championshipRouter);
router.use('/field', fieldRouter);
router.use('/group', groupRouter);
router.use('/league', leagueRouter);
router.use('/team', teamRouter);
router.use('/users', userRouter);
router.use('/games', gameRouter);
 
router.use(apiErrorHandler);

module.exports = router;