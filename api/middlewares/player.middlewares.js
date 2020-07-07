const router = require('express').Router();
const Player = require('../../models/player');
const User = require('../../models/user');
//Handlers para los endpoints de la API de Tasks

// Modules
//const passport = require("passport");
const bcrypt = require('bcrypt');

/*
router.get("/players/player/all", getAllPlayers);
router.get("/players/player/:idPlayer", getPlayerById);
router.post("/players/player/new-player", createNewPlayer);
router.put("/players/player/:idPlayer:name:surname", updatePlayer);
router.delete("/players/player/delete/:idPlayer", deletePlayer);
*/

//const createNewPlayer =  (req, res, next) => 
router.post('/', (req, res, next) => {
  console.log('players'); 
  console.log(req.body);
  const {idPlayer,name,surname, birthdate} = req.body;
  const newPlayer = new Player(idPlayer,name,surname, birthdate);

  const errors = [];
  if (!idPlayer) {      
    errors.push({ text: "Debe ingresar el Id de jugador." });
  }
  if (!name) {
    errors.push({ text: "Debe ingresar el nombre." });
  }
  if (!surname) {
    errors.push({ text: "Debe ingresar el apellido." });
  }
  if (!birthdate) {
    errors.push({ text: "Debe ingresar la fecha de nacimiento." });
  }
  if (errors.length > 0) {
    res.json({ 
      errors : errors, 
      idPlayer: idPlayer,
      name: name,
      surname: surname,
      birthdate: birthdate });
  } else {

    newPlayer.savePlayer()
      .then(playerBD => {
        res.json({"message":"dado de alta"});        
      })
      .catch(err => {
        next(err);  
      });    
  }
});


//const updatePlayer = (req, res, next) => {
router.post('/:id', (req, res, next) => {
  const {idPlayer,name,surname, birthdate} = req.body;
  const newPlayer = new Player(idPlayer,name,surname, birthdate);

  newPlayer.updatePlayer()
    .then(playerBD => {
      res.json({playerBD}); 
    })
    .catch(err => {
      next(err);  
    });   
});

const deletePlayer = (req, res, next) => {
    User.deleteUserByPlayer(req.params.idPlayer)
    .then(playerBD => {
        Player.deletePlayer(req.params.idPlayer)
        .then(playerBD => {
          res.json({playerBD}); 
        })
        .catch(err => {
          next(err);  
        });    
    })
    .catch(err => {
      next(err);  
    }); 
};

//const getAllPlayers = (req, res, next) => {
//router.get('/', validar(), getAllUser()); y dejar las funciones abajo por fuera
router.get('/', (req, res, next) => {
  console.log("llego");   
  Player.getAllPlayers()
    .then(listPlayers => {    
      console.log(listPlayers);   
      res.json({listPlayers});
    })
    .catch(err => {
      next(err);  
    });    
});

//const getPlayerById = (req, res, next) => {
router.get('/:id', (req, res, next) => {
  console.log("get('/:id'");   
  Player.getPlayerById(req.params.id)
    .then(playerBD => {
      console.log(playerBD);
      res.json({playerBD}); 
    })
    .catch(err => {
      next(err);  
    });     
});

module.exports = router;
