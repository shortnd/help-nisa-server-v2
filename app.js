import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './router';

const app = express();

app.use('/', router);

export default app
