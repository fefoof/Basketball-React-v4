const appAuthorizationMiddleware = (req, res, next) => {
  // Validar que en la request este el usuario logeado TODO
  // Redirect con express al login TODO
};

const apiAuthorizationMiddleware = (req, res, next) => {
    console.log("hola");
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