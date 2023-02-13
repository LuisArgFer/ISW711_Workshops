const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const team = require('../Models/teamModel');

const player = new Schema({
    name: {type: String},
    anos: {type: String},
    team: team.schema
});

const PlayerModel = mongoose.model('players', player);

module.exports = {
  schema: player,
  model: PlayerModel
}

