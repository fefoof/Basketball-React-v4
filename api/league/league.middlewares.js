const router = require('express').Router();
// Models
const League = require('../../models/league');


const createNewLeague = (req, res, next) => {
  const { idLeague,name,direction, phone } = req.body;
  const newLeague = League(idLeague,name,direction, phone );

  const errors = [];
  if (!idLeague) {  
    errors.push({ text: "Debe ingresar el Id de la Cancha." });
  }
  if (!name) {
    errors.push({ text: "Debe ingresar el nombre." });
  }
  if (!direction) {
    errors.push({ text: "Debe ingresar el direccion." });
  }
  if (!phone) {
    errors.push({ text: "Debe ingresar el telefono." });
  }
  if (errors.length > 0) {
    res.json({
      errors:errors,
      idLeague:idLeague,
      name:name,
      direction:direction,
      phone:phone
    });
  } else {
    const newLeague = new League(  idLeague,name,direction, phone );
    League.saveLeague()
    .then(leagueBD => {
      res.json({leagueBD});      
    })
    .catch(err => {
        next(err);  
    });    
  }
};


const updateLeague = (req, res, next) => {

  const { idLeague,name,direction, phone } = req.body;
  const newLeague = League(idLeague,name,direction, phone );

  newLeague.updateLeague()
  .then(leagueBD => {
    res.json({leagueBD}); 
  })
  .catch(err => {
    next(err);  
  }); 
};

const deleteLeague = (req, res, next) => {
    League.findByIdAndDelete(req.params.idLeague)
    .then(leagueBD => {
      res.json({leagueBD}); 
    })
    .catch(err => {
      next(err);  
    }); 
};

const getAllLeagues = (req, res, next) => {
  League.getAllLeagues()
  .then(listLeagues => {         
      res.json({listLeagues});
  })
  .catch(err => {
      next(err);  
  });    
};

const getLeagueById = (req, res, next) => {
  League.getLeague(req.params.idLeague)
    .then(leagueBD => {
      res.json({leagueBD}); 
    })
    .catch(err => {
      next(err);  
    });     
};

module.exports = router;
