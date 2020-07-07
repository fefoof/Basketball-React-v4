const router = require('express').Router();
const Game = require('../../models/game');
const User = require('../../models/user');
//Handlers para los endpoints de la API de Tasks

// Modules
//const passport = require("passport");
const bcrypt = require('bcrypt');


router.post('/', (req, res, next) => {
  console.log('games'); 
  console.log(req.body);
  const {idGame,date_game,idField, idReport, idChampionship, idDate} = req.body;
  const newGame = new Game(idGame,date_game,idField, idReport, idChampionship, idDate);

  const errors = [];
/*   if (!idGame) {      
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
  } */
  if (errors.length > 0) {
    res.json({ 
      errors : errors, 
      idGame: idGame,
      date_game: date_game,
      idField: idField,
      idReport: idReport,
      idChampionship: idChampionship,
      idDate:idDate    
    });
  } else {

    newGame.saveGame()
      .then(gameBD => {
        res.json({"message":"dado de alta"});        
      })
      .catch(err => {
        next(err);  
      });    
  }
});

const updateGame = (req, res, next) => {

  const {idGame,date_game,idField, idReport, idChampionship, idDate} = req.body;
  const newGame = new Game(idGame,date_game,idField, idReport, idChampionship, idDate);

  newGame.updateGame()
    .then(gameBD => {
      res.json({gameBD}); 
    })
    .catch(err => {
      next(err);  
    });   
};

const deleteGame = (req, res, next) => {
    User.deleteUserByGame(req.params.idGame)
    .then(gameBD => {
        Game.deleteGame(req.params.idGame)
        .then(GameBD => {
          res.json({gameBD}); 
        })
        .catch(err => {
          next(err);  
        });    
    })
    .catch(err => {
      next(err);  
    }); 
};

router.get('/', (req, res, next) => {
  console.log("llego");   
  Game.getAllGames()
    .then(listGames => {    
      console.log(listGames);   
      res.json({listGames});
    })
    .catch(err => {
      next(err);  
    });    
});


router.get('/:id', (req, res, next) => {
  console.log("get('/:id'");   
  Game.getGameById(req.params.idGame)
    .then(gameBD => {
      console.log(gameBD);
      res.json({gameBD}); 
    })
    .catch(err => {
      next(err);  
    });     
});

module.exports = router;
