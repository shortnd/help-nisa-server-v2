const cuid = require('cuid');

const db = require('../db');

const TeamDocument = {
  _id: String,
  name: String,
  logo: String,
  website: String,
  external_roster: String,
  roster: Array
}

const TeamSchema = new db.Schema({
    _id: {
    type: String,
    default: cuid
  },
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  website: {
    type: String,
  },
  external_roster: String,
  // games: [
  //   {
  //     type: String,
  //     ref: 'Game'
  //   }
  // ],
  roster: [
    {
      type: String,
      ref: 'Player',
    }
  ],
  // standing: {
  //   type: String,
  //   ref: 'Team',
  // }
})

const Team = db.model('Team', TeamSchema);

module.exports = {
  Team,
  TeamDocument
}
