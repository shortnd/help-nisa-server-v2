import cuid from 'cuid';

import db from '../db'

const PlayerSchema = new db.Schema({
  _id: {
    type: String,
    default: cuid()
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: Number,
    min: 0,
    max: 255
  },
  position: {
    type: String,
    index: true,
    default: 'forward',
    emum: [
      "forward",
      "defender",
      "midfielder",
      "goalkeeper",
      "head coach",
      "assistant coach",
      "goalkeeper coach",
      "technical director",
      "associate head_coach"
    ]
  },
  photo: {
  },
  team: {
    type: String,
    ref: 'Team',
    index: true,
    required: true
  },
  slug: {
    type: String,
    unqiue: true,
    index: true
  }
})

PlayerSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name.toLowerCase());
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const playersWithSlug = await this.contrustor.find({ slug: slugRegEx })
  if (playersWithSlug.length) {
    this.slug = `${this.slug}-${this.playersWithSlug.length + 1}`
  }
  next();
});

const Player = db.model('Player', PlayerSchema)
