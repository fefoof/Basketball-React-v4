const dbCOnn = require('../services/db-connection');
//const usuario = require('../models/user');

const GET_PLAYER='SELECT * FROM PLAYER WHERE IDPLAYER=?';
const GET_PLAYER_BY_NAME='SELECT * FROM PLAYER WHERE NAME=?';
const GET_ALL_PLAYERS='SELECT * FROM PLAYER';
const POST_NEW_PLAYER='INSERT INTO PLAYER SET ?';
const UPDATE_PLAYER='UPDATE PLAYER SET name=?, surname=?, birthdate=? WHERE idplayer=?';
const DELETE_PLAYER='DELETE FROM PLAYER WHERE IDPLAYER=?';


class Player{
    constructor(idPlayer,name,surname, birthdate){
        this.idPlayer = idPlayer;
        this.name = name;
        this.surname = surname;
        this.birthdate = '01/01/01' ;

    }

    savePlayer(){
        console.log('savePlayer');

        const newPlayer  = { 
            idplayer : this.idPlayer,
            name: this.name,
            surname: this.surname, 
            birthdate: this.birthdate
        };
        return new Promise((resolve,reject)=>{
                dbCOnn.query(POST_NEW_PLAYER, newPlayer, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Player(newPlayer.idplayer,newPlayer.name,newPlayer.surname, newPlayer.birthdate))
                    }
                });

        })
    }        

    static getPlayerById(player){
        return new Promise((resolve,reject)=>{
            console.log('getPlayerById');
            
            dbCOnn.query(GET_PLAYER, [player], (error, result)=>{
                if (error){
                    reject(error);
                }else{
                    console.log(result);
                    resolve(result);
                }
            });
        })
        
    }

    static getPlayerByEmail(email){
        console.log('getPlayerByEmail');
        return new Promise((resolve,reject)=>{
            console.log('getPlayerByEmail db');
            dbCOnn.query(GET_PLAYER_BY_EMAIL, [email], (error, result)=>{
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        resolve(result)
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }   
    
    updatePlayer(){
        console.log('UpdatePlayer');
        const updatePlayer  = { 
            name: this.name,
            surname: this.surname, 
            birthdate: this.birthdate,
            idPlayer: this.idPlayer
        };
       // const UPDATE_PLAYER='UPDATE PLAYER SET name=?, surname=?, birthdate=? WHERE IDPLAYER=?';
       console.log(this.idPlayer);
        return new Promise((resolve,reject)=>{
                dbCOnn.query(UPDATE_PLAYER,  [this.name,this.surname,this.birthdate,this.idPlayer] , (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Player(this.name,this.surname,this.birthdate,this.idPlayer))
                    }
                });

        })
    }


    static deletePlayer(idPlayer){
        console.log('deletePlayer');
        return new Promise((resolve,reject)=>{      
            dbCOnn.query(DELETE_PLAYER, [idPlayer], (error, result)=>{
                if (error){
                    reject(error);
                }else{
                    resolve(result);  
                }
            });   
        })
    }
    

    static getAllPlayers(){
        console.log('getAllPlayers');
        return new Promise((resolve,reject)=>{
            console.log('getAllPlayers db');
            dbCOnn.query(GET_ALL_PLAYERS, (error, result)=>{
                if (error){
                    reject(error);                
                }else{
                    console.log('else');
                    if (result[0]){
                        try {                        
                            console.log('encontro');
                            resolve(result);
/*                             resolve(result.map((player) => {
                                const { idplayer, name, surname, birthdate } = player;
                                return new Player(idplayer, name, surname, birthdate);
                            })); */
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




module.exports = Player;
