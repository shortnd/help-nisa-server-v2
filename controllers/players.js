import express from 'express'
import { Player, PlayerDocument } from '../models/Player';
import { autoCatch } from '../helpers/auto-catch';

/**
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @return {Promise<[PlayerDocument]>}
 */
export const allPlayers = async (req, res) => {
  const { offset = 0, limit = 25 } = req.query;
  const players = await Player.find()
    .skip(Number(offset))
    .limit(Number(limit));
  return res.status(200).json(players);
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @return {Promise<PlayerDocument>}
 */
const createPlayer = async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  return res.status(200).json(player)
};

/**
 * @param {express.Request} req
 * @param {express.Request} res
 *
 * @return {Promise<PlayerDocument>}
 */
const showPlayer = async (req, res) => {
  const player = await Player.findById(req.params.playerId);
  return res.status(200).json(player);
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @return {Promise<PlayerDocument>}
 */
const updatePlayer = async (req, res) => {
  const player = await Player.findById(req.params.playerId);
  const changes = await Object.assign(player, req.body)
  return res.status(200).json(changes)
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @return {String}
 */
const deletePlayer = async (req, res) => {
  await Player.findByIdAndRemove(req.params.playerId);
  return res.status(200).json({ message: 'ok' });
};

export default autoCatch({
  allPlayers,
  createPlayer,
  showPlayer,
  updatePlayer,
  deletePlayer
})
