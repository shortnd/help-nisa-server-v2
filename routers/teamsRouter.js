import { Router } from 'express';
import teamController from '../controllers/teamsController';
import checkJwt from '../middleware/checkJWT';

const teamRouter = Router();

teamRouter.get('/', teamController.allTeams);
teamRouter.get('/:teamId/', teamController.showTeam);
teamRouter.use(checkJwt);
teamRouter.post('/', teamController.createTeam);
teamRouter.put('/:teamId/', teamController.updateTeam);
teamRouter.delete('/:teamId/', teamController.deleteTeam);

export default teamRouter;
