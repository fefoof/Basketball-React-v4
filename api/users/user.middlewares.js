const router = require('express').Router();
// Models
const User = require('../../models/user');
const Player = require('../../models/player');

// Modules
const passport = require("passport");
const bcrypt = require('bcrypt');
const { getPlayerById } = require('../../models/player');

/* const  renderSignUpForm = (req, res) => {
  res.render('signup');
};
 */
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
    })  
    .catch((err)=>{
      next(err);
    }); 
  }
});

const signin = (req, res, next) => {
    const { user, password } = req.body;

    User.getUser(user)
    .then((userBase)=>{
      if (userBase) {
        console.log(userBase.password);
        bcrypt.compare(password, userBase.password, (err, compareResult)=> {
            console.log(compareResult);
            if (compareResult) {
                req.session.user = user;
                res.render('index', {message: 'Login con exito'});
            }else{
                res.render("signin", {message: 'Usuario y/o contraseña incorrecta.'});
            }
        });
      }else{
          res.render("signin", {message: 'Usuario y/o contraseña incorrecta.'});
      }      

    })  
    .catch(function(err){
      console.log(err);
    });
};  

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
      console.log(listUsers);   
      res.json({listUsers});
    })
    .catch(err => {
      next(err);  
    });    
});

module.exports = router;