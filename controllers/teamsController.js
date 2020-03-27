const express = require('express');
const { Team, TeamDocument } = require('../models/Team');
const { autoCatch } = require('../helpers/auto-catch');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @return {[TeamDocument]}
 */
const allTeams = async (req, res) => {
  const { offset = 0, limit = 25 } = req.params;
  const teams = await Team.find({})
    .skip(Number(offset))
    .limit(Number(limit))

  return res.status(200).json(teams);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createTeam = async (req, res) => {
  const team = new Team(req.body);
  await team.save();

  return res.status(200).json(team);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const showTeam = async (req, res) => {
  const team = await Team.findById(req.params.teamId);
  return res.status(200).json(team);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateTeam = async (req, res) => {
  const team = await Team.findById(req.params.id);
  const changes = req.body;
  Object.keys(changes).forEach(key => {
    team[key] = changes[key];
  });
  await team.save();
  return res.status(200).json(team);
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteTeam = async (req, res) => {
  const team = await Team.findById(req.params.id);
  await team.remove();
  return res.json(200).json({ message: 'ok' })
}


module.exports = autoCatch({
  allTeams,
  createTeam,
  showTeam,
  updateTeam,
  deleteTeam
})
