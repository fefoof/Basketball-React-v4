const router = require('express').Router();
// Models
const User = require('../../models/user');
const Player = require('../../models/player');

// Modules
const passport = require("passport");
const bcrypt = require('bcrypt');
const { getPlayerById } = require('../../models/player');

//const singup = (req, res, next) => {
router.post('/', (req, res, next) => {
  console.log('singup');
  let errors = [];  

  const {user, password,state,idplayer,email,confirm_password} = req.body;
  console.log(idplayer);
  const newUser = new User(user, password,state,idplayer,email);

  console.log(req.body);

/*   if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  } 
 */
  if (errors.length > 0) {
    res.json({ 
      errors:errors,
      usuario:user,
      email:email,
      idplayer:idplayer,      
      password:password,
      confirm_password:confirm_password
     });

  } else {

    Player.getPlayerById(idplayer)
    .then((playerBD)=>{
      if(playerBD[0]){
          const saltRounds = 10;
          bcrypt.hash(password, saltRounds, (err, hash)=> {
            newUser.password = hash;
            newUser.saveUser()
              .then((userSave)=>{       
                  res.json({userSave});
              })
              .catch((err)=>{
                  next(err);
              });
          });   
        }else{
          res.json({"message":"Jugador no existe"});  
        }
    })  
    .catch((err)=>{
      next(err);
    }); 
  }
});


router.delete('/:id', (req, res, next) => {  
  console.log("midd delete user"); 
  const {user/* , password,state,idplayer,email,confirm_password */} = req.body;
  //const newUser = new User(user, password,state,idplayer,email);  

    User.deleteUser(user)
    .then(userBD => {
      res.json({userBD});   
    })
    .catch(err => {
      next(err);  
    }); 
});


router.put('/:id', (req, res, next) => {
  console.log("midd post user"); 
  const {user, password,state,idplayer,email,confirm_password} = req.body;
  const newUser = new User(user, password,state,idplayer,email);  


  Player.getPlayerById(idplayer)
    .then(playerBD => {
        console.log(playerBD);
        console.log("update base");
        if(playerBD[0]){
          newUser.updateUser()
          .then(userBD => {
            res.json({userBD}); 
          })
          .catch(err => {
            next(err);  
          });
        }else{
          res.json({"message":"Jugador no existe"});  
        }
    })
    .catch(err => {
      next(err);  
    });
  
 
});

router.get('/:id', (req, res, next) => {


  console.log("get('/:id'");   
  User.getUser(req.params.id)
    .then(userBD => {
      console.log("get user por id");
      res.json({userBD}); 
    })
    .catch(err => {
      next(err);  
    });  
}); 

//const signin = (req, res, next) => {
router.get('/signin/:id', (req, res, next) => {
    /* const { user, password } = req.body; */
    console.log("sigin");
    User.getUser(req.params.id)
    .then((userBD)=>{
      if (userBD) {
        console.log(userBD.password);
        res.json({userBD}); 
         bcrypt.compare(req.params.password, userBD.password, (err, compareResult)=> {
            console.log(compareResult);
            if (compareResult) {
                req.session.user = userBD.user;
                //res.render('index', {message: 'Login con exito'});
                res.json({userBD}); 
            }else{
              res.json({message: 'Usuario y/o contraseña incorrecta.'});
            }
        }); 
      }else{
        res.json({message: 'Usuario y/o contraseña incorrecta.'});
      }      

    })  
    .catch(function(err){
      console.log(err);
      next(err); 
    }); 
});
 


router.post('/signin', (req, res, next) => {
  const { user, password } = req.body; 
 console.log(req.body);
  User.getUser(user)
  .then((userBD)=>{
    console.log(userBD);
    if (userBD[0]) {
       console.log(userBD);
       const passwordI = userBD[0].password;      
        bcrypt.compare(password, passwordI, (err, compareResult)=> {
          console.log("entro bcrypt");
          console.log(compareResult);
          if (compareResult) {
            console.log("entro logueado");
              req.session.user = "Hola";//userBD[0];
              res.json({userBD}); 
              console.log("salio logueado");
              console.log(req.session.user);
          }else{
            res.status(403).json({message: 'Usuario y/o contraseña incorrecta.'});
          }
        }); 
    }else{
      res.status(403).json({message: 'Usuario no registrado.'});
    }      

  })  
  .catch(function(err){
    console.log(err);
    next(err); 
  }); 
});


const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/signin");
};

const getUser = (req, res) => {
  const {user} = (req.params.idUser);  
  //const { user, password } = req.body;
  User.getUser(user)
  .then(function(userBase){
      res.json(userBase); 
  })  
  .catch(function(err){
    console.log(err);
  });
};  

router.get('/', (req, res, next) => {
  console.log("llego");   
  User.getAllUsers()
    .then(listUsers => {    
      //console.log(listUsers);   
      res.json({listUsers});
    })
    .catch(err => {
      next(err);  
    });    
});




module.exports = router;