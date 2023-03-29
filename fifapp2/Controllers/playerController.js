const express = require('express');
const router = express.Router();
const Player = require('../Models/playerModel');
const Team = require('../Models/teamModel');


router.get("/player", (req, res) => {
    Player.model.find({}, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(player);
    });
});

//({ name: 'john', age: { $gte: 18 } }).exec();
router.get("/player/search", (req, res) => {
    Player.model.find({name : req.query}, (error, player) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (!player) {
            return res.status(404).send('Team not found');
        }
        res.status(200).json(player);
    });
});


//router.post("/player", (req, res) => {
  //  const newPlayer = new Player.model(req.body);
    //newPlayer.save((error) => {
      //  if (error) {
        //    return res.status(500).send(error);
        //}
        //res.status(201).json(newPlayer);
    //});
//});

router.post('/player', async function (req, res) {
    const player = new Player.model();
    player.name = req.body.name;
    player.anos = req.body.anos;
   
    //find the team
    try {
      const teamFound = await Team.model.findById(req.body.team);
      if (teamFound) {
        player.team = teamFound;
      }
  
      // create the player anyway
      if (player.name && player.anos) {
        await player.save();
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:3000/player/?id=${player.id}`
        });
        res.json(player);
      } else {
        res.status(422);
        console.log('error while saving the player')
        res.json({
          error: 'No valid data provided for player'
        });
      }
  
    } catch (error) {
      res.status(422);
      console.log('error while saving the player', error)
      res.json({
        error: 'There was an error creating the player'
      });
    }
  });


//router.put("/player/:id", (req, res) => {
  //  Player.model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, player) => {
    //    if (error) {
      //      return res.status(500).send(error);
        //}
        //if (!player) {
          //  return res.status(404).send('Team not found');
        //}
        //res.status(200).json(player);
    //});
//});

router.put('/player/:id', async function (req, res) {
    try {
      const playerId = req.params.id;
      const player = await Player.model.findById(playerId);
  
      if (player) {
        // Update the player information
        player.name = req.body.name || player.name;
        player.anos = req.body.anos || player.anos;
  
        // Update the team if provided
        if (req.body.team) {
          const teamFound = await Team.model.findById(req.body.team);
          if (teamFound) {
            player.team = teamFound;
          }
        }
  
        // Save the changes
        await player.save();
  
        res.status(200); // OK
        res.json(player);
      } else {
        res.status(404); // Not Found
        res.json({
          error: 'Player not found'
        });
      }
    } catch (error) {
      res.status(422);
      console.log('error while updating the player', error);
      res.json({
        error: 'There was an error updating the player'
      });
    }
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