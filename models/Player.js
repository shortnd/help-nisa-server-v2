import cuid from 'cuid';
import slugify from 'slugify'

import db from '../db'

export const PlayerDocument = {
  _id: String,
  name: String,
  number: Number,
  position: String,
  photo: String,
  slug: String
}

const PlayerSchema = new db.Schema({
  _id: {
    type: String,
    default: cuid
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: Number,
    min: 0,
    max: 255,
  },
  position: {
    type: String,
    index: true,
    required: true,
    default: 'forward',
    enum: [
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
    type: String
  },
  // team: {
  //   type: String,
  //   ref: 'Team',
  //   index: true,
  //   required: true
  // },
  slug: {
    type: String,
    unique: true,
    index: true,
    lowercase: true
  }
})

PlayerSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name.toLowerCase());
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const playersWithSlug = await this.constructor.find({ slug: slugRegEx })
  console.log(playersWithSlug)
  if (playersWithSlug.length) {
    this.slug = `${this.slug}-${playersWithSlug.length + 1}`
  }
  next();
});

export const Player = db.model('Player', PlayerSchema)
