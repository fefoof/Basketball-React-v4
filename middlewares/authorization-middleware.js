const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
const {StaticRouter} = require('react-router-dom');
//const View = require('../../pages/users/view');
const {renderToString} = require('react-dom/server');


const appAuthorizationMiddleware = (req, res, next) => {
  console.log("Seguridad Web");
  console.log(req.session);
  req.session="Hola"
  console.log(req.session);

  if (req.session=="Hola"){
    console.log("Login Ok - distinto null");
/*     this.props.session = "usuario"; */
    next();
  }else{
    console.log("No Logueado - Ir a login");
    //next();
   /*   return <Redirect to="/users/signin" />  */
    /*  window.location="/users/signin";   */ 
    res.redirect('/users/signin');
  }

  //res.render("/signin",{message: 'No autorizado'});
  // Validar que en la request este el usuario logeado TODO
  // Redirect con express al login TODO
};

const apiAuthorizationMiddleware = (req, res, next) => {
    console.log("Seguridad Api");
    console.log(req.session);
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