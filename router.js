import { Router } from 'express'

import TeamController from './controllers/teamsController';

const router = Router();

router.get('/', (req, res) => {
  return res.json({
    message: 'Hello world!'
  })
})

router.get('/teams', TeamController.index);

export default router;
