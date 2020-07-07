const router = require('express').Router();
// Models
const Team = require('../../models/team');


/* const renderTeamForm = (req, res) => {
  console.log('renderTeamForm');
  res.render("teams/new-team");
};
 */
const createNewTeam = (req, res, next) => {
  const { idteam,name,state, logo } = req.body;
  const newTeam = new Team(idteam,name,state, logo) ;

  const errors = [];
  if (!idteam) {  
    errors.push({ text: "Debe ingresar el Id de team." });
  }
  if (!name) {
    errors.push({ text: "Debe ingresar el nombre." });
  }
  if (errors.length > 0) {
    res.json({
      errors: errors,
      idteam: idteam,
      name: name,
      state: state, 
      logo:logo
    });
  } else {
    newTeam.saveTeam()
    .then(teamBD=>{
      res.json({teamBD});
    })
    .catch((err)=>{
      next(err);
    });    
  }
};



const updateTeam = (req, res, next) => {

  const {idteam,name,state, logo} = req.body;
  const newTeam = League(idteam,name,state, logo);

  newTeam.updateTeam()
  .then(TeamBD => {
    res.json({TeamBD}); 
  })
  .catch(err => {
    next(err);  
  }); 


};

const deleteTeam =  (req, res) => {
    Team.findByIdAndDelete(req.params.idTeam);
  req.flash("success_msg", "Equipo Eliminado Correctamente");
  const listTeams = Team.getAllTeams();  
  res.render("teams/all-teams", { listTeams });
};

const getAllTeams = (req, res, next) => {
  Team.getAllTeams()
  .then(listTeams => {           
      res.json({listTeams});
  })
  .catch(err => {
      next(err);  
  });    
};

const getTeamById = (req, res, next) => {
  Team.getTeam(req.params.idTeam)
    .then(teamBD => {
      res.json({teamBD}); 
    })
    .catch(err => {
      next(err);  
    });     
};

module.exports = router;
