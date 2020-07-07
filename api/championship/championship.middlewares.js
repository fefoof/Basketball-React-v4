const router = require('express').Router();
// Models
const Championship = require('../../models/championship');

const renderChampionshipForm = (req, res) => {
  console.log('renderChampionshipForm');
  res.render("championships/new-championship");
};

const createNewChampionship = (req, res, next) => {

  const {idChampionship,description,idDivision} = req.body;
  const newChampionship = new Championship(idChampionship,description,idDivision);

  const errors = [];
  if (!idChampionship) {  
    errors.push({ text: "Debe ingresar el Id de la Cancha." });
  }
  if (!description) {
    errors.push({ text: "Debe ingresar el nombre." });
  }
  if (!idDivision) {
    errors.push({ text: "Debe ingresar el direccion." });
  }
  if (errors.length > 0) {
    res.json({
      errors:errors,
      idChampionship:idChampionship,
      description:description,
      idDivision:idDivision
    });
  } else {

    //const newPlayer = new Player({ idPlayer,name,surname, birthdate });
    newChampionship.saveChampionship()
      .then(ChampionshipBD => {
          res.json({"message":"Alta ok"});                       
      })
      .catch(err => {
        next(err);  
      }); 
  }
};

const updateChampionship = (req, res, next) => {

  const {idChampionship,description,idDivision} = req.body;
  const newChampionship = new Championship(idChampionship,description,idDivision);  

  newChampionship.updatePlayer()
  .then(ChampionshipBD => {
    res.json({ChampionshipBD}); 
  })
  .catch(err => {
    next(err);  
  });  
};

const deleteChampionship =  (req, res, next) => {
  Championship.findByIdAndDelete(req.params.idDivision)
  .then(ChampionshipBD => {
    res.json({ChampionshipBD}); 
  })
  .catch(err => {
    next(err);  
  }); 
};

const renderChampionships = (req, res) => {
    Championship.getAllChampionships()
    .then(function(listChampionships){
      req.flash("success_msg", "Jugador dado de alta");
      res.render("championships/all-championships", { listChampionships });      
        //res.render("championships/all-championships", {message: "Usuario dado de alta"});
    })
    .catch(function(err){
      req.flash("success_msg", "Error dando de alta Jugador");
      res.render("index");  
        //res.render("championships/all-championships", {message: "Error dando de alta Jugador"});
    });    
};

const renderEditForm = (req, res) => {
  const championship = Championship.getChampionshipById(req.params.idChampionship);
  res.render("championships/edit-championship", { championship });
};



module.exports = router;
