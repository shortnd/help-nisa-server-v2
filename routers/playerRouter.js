import { Router } from 'express';
import playersController from '../controllers/playersController';
import checkJwt from '../middleware/checkJWT';

const playerRouter = Router();

playerRouter.get('/', playersController.allPlayers);
playerRouter.get('/:playerId/', playersController.showPlayer);

playerRouter.use(checkJwt)
playerRouter.post('/', playersController.createPlayer);
playerRouter.put('/:playerId/', playersController.updatePlayer);
playerRouter.delete('/:playerId/', playersController.deletePlayer);

export default playerRouter;
