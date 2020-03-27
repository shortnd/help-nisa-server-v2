const cuid =  require('cuid');
const slugify =  require('slugify');

const db =  require('../db');

const PlayerDocument = {
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
      "Forward",
      "Defender",
      "Midfielder",
      "Goalkeeper",
      "Head Coach",
      "Assistant Coach",
      "Goalkeeper Coach",
      "Technical Director",
      "Associate Head Coach"
    ]
  },
  photo: {
    type: String
  },
  team: {
    type: String,
    ref: 'Team',
    index: true,
  },
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
  if (playersWithSlug.length) {
    this.slug = `${this.slug}-${playersWithSlug.length + 1}`
  }
  next();
});

const Player = db.model('Player', PlayerSchema)

module.exports = {
  Player,
  PlayerDocument
}
