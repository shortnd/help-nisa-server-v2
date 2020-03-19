import Team from '../models/Team';

async function index(req, res) {
  try {
    const teams = await Team.find({});
    res.json(teams);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default ({
  index
})
