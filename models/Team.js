import cuid from 'cuid';

import db from '../db';

const Team = db.model('Team', {
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
  games: {
    type: String,
    ref: 'Game',
    required: true,
    index: true
  },
  roster: [
    {
      type: String,
      ref: 'Player',
      required: true,
      index: true
    }
  ],
  standing: {
    type: String,
    ref: 'Team',
    required: true,
    index: true
  }
})

export default Team
