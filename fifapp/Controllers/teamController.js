
const express = require('express');
const router = express.Router();
const Team = require('../Models/teamModel');

// Get all teams
router.get('/team', (req, res) => {
    Team.find({}, (error, teams) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(teams);
    });
});

// Get a single team
router.get('/team:id', (req, res) => {
    Team.findById(req.params.id, (error, team) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(team);
    });
});

// Create a new team
router.post('/team', (req, res) => {
    const newTeam = new Team(req.body);
    newTeam.save((error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json(newTeam);
    });
});

// Update a team
router.put('/team:id', (req, res) => {
    Team.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, team) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(team);
    });
});

// Delete a team
router.delete('/team:id', (req, res) => {
    Team.findByIdAndRemove(req.params.id, (error, team) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!team) {
            return res.status(404).send('Team not found');
        }
        res.status(200).send('Team deleted successfully');
    });
});
module.exports=router;

