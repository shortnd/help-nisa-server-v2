import { Router } from 'express';

import playerRouter from './playerRouter';
import teamRouter from './teamsRouter'

const apiRouter = Router();

apiRouter.use('/players', playerRouter);
apiRouter.use('/teams', teamRouter);

export default apiRouter;
