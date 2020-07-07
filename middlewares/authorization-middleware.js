
const appAuthorizationMiddleware = (req, res, next) => {
  console.log("hola seguridad app web");
  //res.render("/signin",{message: 'No autorizado'});
  // Validar que en la request este el usuario logeado TODO
  // Redirect con express al login TODO
  next();
};

const apiAuthorizationMiddleware = (req, res, next) => {
    console.log("hola seguridad api");
//     if(req.session.user/*  == 'nuevo' */){
//       next();
//    }else{
//        res.render("signin",{message: 'No autorizado'});
//    } 

    // Validar que en la request este el usuario logeado TODO
    // res.status(401);
    //res.json({
      //  message: 'Error flaco'
    //});
    // Si no hay problemas llamar a next();
    next();
};

module.exports = {
    appAuthorizationMiddleware,
    apiAuthorizationMiddleware
};