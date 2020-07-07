const dbCOnn = require('../services/db-connection');
const GET_LEAGUE='SELECT * FROM LEAGUE WHERE IDLEAGUE=?';
const GET_LEAGUE_BY_NAME='SELECT * FROM LEAGUE WHERE NAME=?';
const GET_ALL_LEAGUES='SELECT * FROM LEAGUE';
const POST_NEW_LEAGUE='INSERT INTO LEAGUE SET ?';
const UPDATE_GROUP='UPDATE LEAGUE SET name=?, description=? WHERE idLeague=?';
const DELETE_GROUP='DELETE FROM LEAGUE WHERE IDLEAGUE=?';

class League{
    constructor(idLeague,name,description){
        this.idLeague = idLeague;
        this.name = name;
        this.description = description;
    }

    saveLeague(){
        console.log('saveLeague');
        const newLeague  = { 
            idLeague: this.idLeague,
            name: this.name,
            description: this.description
        };

        return new Promise((resolve,reject)=>{
                dbCOnn.query(POST_NEW_LEAGUE, newLeague, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new League( this.idLeague, this.name, this.description))
                    }
                });

        })
    }        

    static getLeague(idLeague){
        return new Promise(function (resolve,reject){
            dbCOnn.query(GET_LEAGUE, [idLeague], function (error, result){
                if (error){
                    reject(error);
                }else{
                    const {idLeague,name,description} = result[0];
                    resolve(new League(idLeague,name,description));
                }
            });
        })
        
    }

    static getLeagueByName(name){
        console.log('getLeagueByName');
        return new Promise(function (resolve,reject){
            console.log('getLeagueByName db');
            dbCOnn.query(GET_LEAGUE_BY_NAME, [name], function (error, result){
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        const {idLeague,name,description} = result[0];
                        resolve(new League(idLeague,name,description))
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }    

    static getAllLeagues(){
        console.log('getAllLeagues');
        return new Promise(function (resolve,reject){
            console.log('getAllLeagues db');
            dbCOnn.query(GET_ALL_LEAGUES, function (error, result){
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
    updateLeague(){
        console.log('updateLeague');
        return new Promise((resolve,reject)=>{
                dbCOnn.query(UPDATE_LEAGUE, [this.name,this.description,this.idLeague], (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Group(this.idLeague,this.name,this.description))
                    }
                });

        })
    }


    static deleteLeague(idLeague){
        console.log('deleteLeague');
        return new Promise(function (resolve,reject){      

                        dbCOnn.query(DELETE_LEAGUE, [idGroup], function (error, result){
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
          
        })
    }

}

module.exports = League;
