const { Router } = require('express');

const playerRouter = require('./playerRouter');
const teamRouter = require('./teamsRouter');

const apiRouter = Router();

apiRouter.use('/players', playerRouter);
apiRouter.use('/teams', teamRouter);

module.exports = apiRouter;
