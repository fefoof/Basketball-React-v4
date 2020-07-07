const router = require('express').Router();
// Models
const Group = require('../../models/group');

/* const renderGroupForm = (req, res) => {
  console.log('renderGroupForm');
  res.render("groups/new-group");
}; */

//const createNewGroup = (req, res, next) => {
router.post('/', (req, res, next) => {  

  console.log('saveGroup middle');

  const { idGroup,idChampionship,name } = req.body;
  const newGroup = new Group(idGroup,idChampionship,name);

  const errors = [];
  if (!idGroup) {  
    errors.push({ text: "Debe ingresar el Id del grupo." });
  }
  if (!idChampionship) {
    errors.push({ text: "Debe ingresar la liga." });
  }
  if (!name) {
    errors.push({ text: "Debe ingresar el nombre." });
  }
  if (errors.length > 0) {
    res.json({
      errors:errors,
      idGroup:idGroup,
      idChampionship:idChampionship,
      name:name
    });
  } else {
    console.log('saveGroup middle');
      newGroup.saveGroup()
      .then(groupBD=>{      
        res.json({groupBD});      
      })
      .catch(err=>{
        next(err);  
      });    
  }
});


const updateGroup = (req, res,next) => {

  const {usuario, password,estado,idJugador,email,confirm_password} = req.body;
  const newGroup = new Group(idGroup,name,direction, phone);
  newGroup.updateGroup()
  .then(groupBD=>{      
    res.json({groupBD});      
  })
  .catch((err)=>{
    next(err);  
  }); 

};

/* const deleteGroup = async (req, res) => {
    Group.findByIdAndDelete(req.params.idGroup);
  req.flash("success_msg", "Jugador Eliminado Correctamente");
  const listGroups = Group.getAllGroups();  
  res.render("groups/all-groups", { listGroups });
}; */


const getAllGroups = (req, res, next) => {
  Group.getAllGroups()
  .then(listGroups => {         
      res.json({listGroups});
  })
  .catch(err => {
      next(err);  
  });    
};

const getGroupById = (req, res, next) => {

  Group.getGroup(req.params.idGroup)
    .then(groupBD => {
      res.json({groupBD}); 
    })
    .catch(err => {
      next(err);  
    });     
};

module.exports = router;
