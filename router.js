import { Router } from 'express'

import TeamController from './controllers/teamsController';
import players from './controllers/players';

const router = Router();

router.get('/', (req, res) => {
  return res.json({
    message: 'Hello world!'
  })
});

router.get('/players/', players.allPlayers);
router.post('/players/', players.createPlayer);
router.get('/players/:playerId/', players.showPlayer);
router.put('/players/:playerId/', players.updatePlayer);
router.delete('/players/:playerId/', players.deletePlayer);

export default router;
