import { Router } from 'express';
import { getPlayers } from '../controllers/players';

const playerRouter = Router();

playerRouter.get('/', getPlayers);
