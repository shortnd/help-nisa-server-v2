const { Router } = require('express');
const teamController = require('../controllers/teamsController');
const checkJwt = require('../middleware/checkJWT');

const teamRouter = Router();

teamRouter.get('/', teamController.allTeams);
teamRouter.get('/:teamId/', teamController.showTeam);
if (process.env.NODE_ENV !== 'test') {
teamRouter.use(checkJwt);
}
teamRouter.post('/', teamController.createTeam);
teamRouter.put('/:teamId/', teamController.updateTeam);
teamRouter.delete('/:teamId/', teamController.deleteTeam);

module.exports = teamRouter;
