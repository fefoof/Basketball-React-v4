const dbCOnn = require('../services/db-connection');
const GET_TEAM='SELECT * FROM TEAM WHERE IDTEAM=?';
const GET_ALL_TEAMS='SELECT * FROM TEAM';
const POST_NEW_TEAM='INSERT INTO TEAM SET ?';
const UPDATE_GROUP='UPDATE TEAM SET name=?, state=?, state=? WHERE idTEAM=?';
const DELETE_GROUP='DELETE FROM TEAM WHERE IDTEAM=?';


class Team{
    constructor(idteam,name,state, logo){
        this.idTeam = idTeam;
        this.name = name;
        this.state = state;
        this.logo = logo;

    }

    saveTeam(){
        console.log('saveTeam');

        const newTeam  = { 
            idteam: this.idteam,
            name: this.name,
            state: this.state, 
            logo: this.logo
        };        

        return new Promise((resolve,reject)=>{
                dbCOnn.query(POST_NEW_TEAM, newTeam, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Team( this.idteam, this.name, this.state,  this.logo))
                    }
                });

        })
    }        

    static getTeam(idTeam){
        return new Promise(function (resolve,reject){
            dbCOnn.query(GET_TEAM, [idTeam], function (error, result){
                if (error){
                    reject(error);
                }else{
                    const {idteam,name,state, logo} = result[0];
                    resolve(new Team(idteam,name,state, logo));
                }
            });
        })
        
    }

    static getTeamByName(name){
        console.log('getTeamByName');
        return new Promise(function (resolve,reject){
            console.log('getTeamByName db');
            dbCOnn.query(GET_TEAM_BY_NAME, [name], function (error, result){
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        const {idteam,name,state, logo} = result[0];
                        resolve(new Team(idteam,name,state, logo))
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }    

    static getAllTeams(){
        console.log('getAllTeams');
        return new Promise(function (resolve,reject){
            console.log('getAllTeams db');
            dbCOnn.query(GET_ALL_TEAMS, function (error, result){
                if (error){
                    reject(error);                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        resolve(result[0])
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }
    

    updateTeam(){
        console.log('updateTeam');
        return new Promise((resolve,reject)=>{
                dbCOnn.query(UPDATE_TEAM, [this.name, this.state, this.logo, this.idteam], (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Team(this.idTeam, this.name, this.state, this.logo))
                    }
                });

        })
    }


    static deleteTeam(idteam){
        console.log('deleteLedeleteTeamague');
        return new Promise(function (resolve,reject){      

                        dbCOnn.query(DELETE_TEAM, [idteam], function (error, result){
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
          
        })
    }    

}

module.exports = Team;
