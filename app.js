const express =  require('express');
const cors =  require('cors');
const bodyParser =  require('body-parser');

const apiRouter =  require('./routers/api');
const { handleError } =  require('./middleware/handleError');
const { handleValidationError } =  require('./middleware/handleValidationError');
const { notFound } =  require('./middleware/notFound');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use(handleValidationError);
app.use(handleError);
app.use(notFound);

module.exports = app
