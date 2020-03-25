import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './router';
import { handleError } from './middleware/handleError'
import { handleValidationError } from './middleware/handleValidationError';
import { notFound } from './middleware/notFound';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.use(handleValidationError);
app.use(handleError);
app.use(notFound);

export default app
