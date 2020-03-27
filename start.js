const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/help-nisa-server-v2')
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`Mongo Error: ${err.message}`);
});

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express listening on ${app.get('port')}`)
});

module.exports = server;
