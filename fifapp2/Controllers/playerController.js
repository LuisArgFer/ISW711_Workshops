const express = require('express');
const router = express.Router();
const Player = require('../Models/playerModel');

// Get all teams
router.get("/player", (req, res) => {
    Player.model.find({}, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(player);
    });
});

// Get a single team
router.get("/player/:id", (req, res) => {
    Player.model.findById(req.params.id, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!player) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(player);
    });
});

// Create a new team
router.post("/player", (req, res) => {
    const newPlayer = new Player.model(req.body);
    newPlayer.save((error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(201).json(newPlayer);
    });
});

// Update a team
router.put("/player/:id", (req, res) => {
    Player.model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!player) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(player);
    });
});

// Delete a team
router.delete("/player/:id", (req, res) => {
    Player.model.findByIdAndRemove(req.params.id, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!player) {
            return res.status(404).send('Team not found');
        }
        res.status(200).send('Team deleted successfully');
    });
});
module.exports = router;