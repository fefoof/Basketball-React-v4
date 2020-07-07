const dbCOnn = require('../services/db-connection');
const GET_GAME='SELECT * FROM GAME WHERE IDGAME=?';
const GET_GAME_BY_NAME='SELECT * FROM GAME WHERE NAME=?';
const GET_ALL_GAMES='SELECT * FROM GAME';
const POST_NEW_GAME='INSERT INTO GAME SET ?';
const UPDATE_GAME='UPDATE GAME SET date_game=?, idField=?, idReport=?, idChampionship=?, idDate=? WHERE idGame=?';
const DELETE_GAME='DELETE FROM GAME WHERE idGame=?';


class Game{
    constructor(idGame,date_game,idField, idReport, idChampionship, idDate){
        this.idGame = idGame;
        this.date_game = date_game;
        this.idField = idField;
        this.idReport = idReport;
        this.idChampionship = idChampionship;
        this.idDate = idDate;
    }

    saveGame(idGame,date_game,idField, idReport, idChampionship, idDate){
        console.log('saveGame');
        const newGame  = { 
            idGame:this.idGame,
            date_game: this.date_game,
            idField: this.idField, 
            idReport: this.idReport, 
            idChampionship: this.idChampionship, 
            idDate: this.idDate
        };

        return new Promise(function (resolve,reject){
                dbCOnn.query(POST_NEW_GAME, newGame, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Game(newGame.idGame,newGame.date_game,newGame.idField, newGame.idReport, newGame.idChampionship, newGame.idDate))
                    }
                });

        })
    }        

    static getGame(game){
        return new Promise(function (resolve,reject){
            dbCOnn.query(GET_GAME, [game], function (error, result){
                if (error){
                    reject(error);
                }else{
                    const {idGame,date_game,idField, idReport, idChampionship, idDate} = result[0];
                    resolve(new Game(idGame,date_game,idField, idReport, idChampionship, idDate));
                }
            });
        })
        
    }

    static getGameByDate(date){
        console.log('getGameByDate');
        return new Promise(function (resolve,reject){
            console.log('getGameByDate db');
            dbCOnn.query(GET_GAME_BY_DATE, [date], function (error, result){
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        const {idGame,date_game,idField, idReport, idChampionship, idDate} = result[0];
                        resolve(new Game(idGame,date_game,idField, idReport, idChampionship, idDate))
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }    

    static getAllGames(){
        console.log('getAllGames');
        return new Promise(function (resolve,reject){
            console.log('getAllGames db');
            dbCOnn.query(GET_ALL_GAMES, function (error, result){
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
    
    updateGame(){
        console.log('updateGame');
/*         const updateGame = { 
            date_game: this.date_game,
            idField: this.idField, 
            idReport: this.idReport, 
            idChampionship: this.idChampionship, 
            idDate: this.idDate,
            idGame: this.idGame
        };   */      
        return new Promise(function (resolve,reject){
                dbCOnn.query(UPDATE_GAME, [updateGame], (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Game(this.idGame,this.date_game,this.idField, this.dReport, this.idChampionship, this.idDate))
                    }
                });

        })
    }


    static deleteGame(idGame){
        console.log('deleteGame');
        return new Promise(function (resolve,reject){      

                        dbCOnn.query(DELETE_GAME, [idGame], function (error, result){
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
                    
            
        })
    }    

}

module.exports = Game;
