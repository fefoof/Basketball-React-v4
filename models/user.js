//const dbCOnn = require('../database');
const dbCOnn = require('../services/db-connection');
const GET_USER='SELECT * FROM USER WHERE USER=?';
const GET_USER_BY_EMAIL='SELECT * FROM USER WHERE EMAIL=?';
const GET_ALL_USERS='SELECT * FROM USER';
const POST_NEW_USER='INSERT INTO USER SET ?';
const UPDATE_USER='UPDATE USER SET password=?, state=?, idPlayer=?, email=? WHERE IDUSER=?';
const DELETE_USER='DELETE FROM USER WHERE IDUSER=?';
const DELETE_USER_PLAYER='DELETE FROM USER WHERE IDPLAYER=?';

class User{
    constructor(user,password,state, idPlayer,email){
        this.user = user;
        this.password = password;
        this.state = state;
        this.idPlayer = idPlayer;
        this.email = email;
    }

    saveUser(){
        console.log('saveUser');
        
        const newUser2  = {           
            user: this.user,
            password: this.password,
            state: this.state, 
            idPlayer: this.idPlayer,
            email: this.email
        };

        return new Promise((resolve,reject)=>{
                dbCOnn.query(POST_NEW_USER, newUser2, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        console.log(newUser2);
                        //const {usuario, password,estado,idJugador,email} = result[0];
                        resolve(new User(newUser2)/* (user,password,state, idPlayer,email) */)
                    }
                });
/*             }); */
        })
    }        

    static getUser(user){
        return new Promise(function (resolve,reject){
            dbCOnn.query(GET_USER, [user], function (error, result){
                if (error){
                    reject(error);
                }else{
                  //  const {user,password,state, idPlayer,email} = result[0];
                    resolve(result);
                }
            });
        })
        
    }

    static getUserByEmail(email){
        console.log('getUserByEmail');
        return new Promise(function (resolve,reject){
            console.log('getUserByEmail db');
            dbCOnn.query(GET_USER_BY_EMAIL, [email], function (error, result){
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        resolve(result)
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }
    
    updateUser(){
        console.log('updateUser');
        return new Promise((resolve,reject)=>{
                dbCOnn.query(UPDATE_USER, [this.password, this.state, this.idPlayer, this.email, this.user, this.idUser], (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new User(this.user, this.password, this.state, this.idPlayer, this.email))
                    }
                });

        })
    }


    static deleteUser(idUser){
        console.log('deleteUser');
        return new Promise(function (resolve,reject){      

                        dbCOnn.query(DELETE_USER, [idUser], function (error, result){
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
          
        })
    }    

    static deleteUserByPlayer(idPlayer){
        console.log('deleteUserByPlayer');
        return new Promise(function (resolve,reject){      

                        dbCOnn.query(DELETE_USER_PLAYER, [idPlayer], function (error, result){
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
          
        })
    }  


    static getAllUsers(){
        console.log('getAllUsers');
        return new Promise((resolve,reject)=>{
            console.log('getAllUsers db');
            dbCOnn.query(GET_ALL_USERS, (error, result)=>{
                if (error){
                    reject(error);                
                }else{
                    console.log('else');
                    if (result[0]){
                        try {                        
                            console.log('encontro');
                            resolve(result);
                        } catch(err) {
                            reject(err);
                        }                           
                    }else{
                        console.log('not found');
                        resolve('Not Found');    
                    }
                    
                }
            });
        })
        
    }     

}

module.exports = User;
