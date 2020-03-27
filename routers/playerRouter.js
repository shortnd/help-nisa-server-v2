const { Router } = require('express');
const playersController = require('../controllers/playersController');
const checkJwt = require('../middleware/checkJWT');

const playerRouter = Router();

playerRouter.get('/', playersController.allPlayers);
playerRouter.get('/:playerId/', playersController.showPlayer);
if (process.env.NODE_ENV !== 'test') {
  playerRouter.use(checkJwt)
}
playerRouter.post('/', playersController.createPlayer);
playerRouter.put('/:playerId/', playersController.updatePlayer);
playerRouter.delete('/:playerId/', playersController.deletePlayer);

module.exports = playerRouter;
