const dbCOnn = require('../services/db-connection');
const GET_GROUP='SELECT * FROM db_liga.GROUP WHERE IDGROUP=?';
const GET_GROUP_BY_NAME='SELECT * FROM db_liga.GROUP WHERE NAME=?';
const GET_ALL_GROUPS='SELECT * FROM db_liga.GROUP';
const POST_NEW_GROUP='INSERT INTO db_liga.GROUP SET ?';
const UPDATE_GROUP='UPDATE db_liga.GROUP SET name=?, idChampionship=? WHERE IDGROUP=?';
const DELETE_GROUP='DELETE FROM db_liga.GROUP WHERE IDGROUP=?';

class Group{
    constructor(idGroup,idChampionship, name){
        this.idGroup = idGroup;
        this.idChampionship = idChampionship;
        this.name = name;

    }

    saveGroup(){
        console.log('saveGroup');
        const newGroup  = { 
            idGroup: this.idGroup,
            idChampionship:this.idChampionship,
            name:this.name
        };

        return new Promise((resolve,reject)=>{
            console.log(newGroup);
                dbCOnn.query(POST_NEW_GROUP, newGroup, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Group(this.idGroup, this.idChampionship, this.name))
                    }
                });

        })
    }        

    static getGroup(group){
        return new Promise(function (resolve,reject){
            dbCOnn.query(GET_GROUP, [group], function (error, result){
                if (error){
                    reject(error);
                }else{
                    const {idGroup,name,idChampionship} = result[0];
                    resolve(new Group(idGroup,name,idChampionship));
                }
            });
        })
        
    }

    static getGroupByName(name){
        console.log('getGroupByName');
        return new Promise(function (resolve,reject){
            console.log('getGroupByName db');
            dbCOnn.query(GET_GROUP_BY_NAME, [name], function (error, result){
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        const {idGroup,name,idChampionship} = result[0];
                        resolve(new Group(idGroup,name,idChampionship))
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }    

    static getAllGroups(){
        console.log('getAllGroups');
        return new Promise(function (resolve,reject){
            console.log('getAllGroups db');
            dbCOnn.query(GET_ALL_GROUPS, function (error, result){
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



    updateGroup(){
        console.log('updateGroup');

        return new Promise((resolve,reject)=>{
                dbCOnn.query(UPDATE_GROUP, [this.name,this.idChampionship,this.idGroup ], (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Group(this.idGroup,this.name,this.idChampionship))
                    }
                });

        })
    }


    static deleteGroup(idGroup){
        console.log('deleteGroup');
        return new Promise(function (resolve,reject){      

                        dbCOnn.query(DELETE_GROUP, [idGroup], function (error, result){
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
          
        })
    }

}

module.exports = Group;
