const dbCOnn = require('../services/db-connection');
const GET_FIELD='SELECT * FROM FIELD WHERE IDFIELD=?';
const GET_FIELD_BY_NAME='SELECT * FROM FIELD WHERE NAME=?';
const GET_ALL_FIELDS='SELECT * FROM FIELD';
const POST_NEW_FIELD='INSERT INTO FIELD SET ?';
const UPDATE_FIELD='UPDATE FIELD SET name=?, direction=?, phone=? WHERE idField=?';
const DELETE_FIELD='DELETE FROM FIELD WHERE IDFIELD=?';


class Field{
    constructor(idField,name,direction, phone){
        this.idField = idField;
        this.name = name;
        this.direction = direction;
        this.phone = phone;

    }

    saveField(){
        console.log('saveField');
        
        const newField  = { 
            idField: this.idField,
            name: this.name,
            direction: this.direction,
            phone: this.phone
        };

        return new Promise((resolve,reject)=>{
                dbCOnn.query(POST_NEW_FIELD, newField, (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Field(newField.idField,newField.name,newField.direction, newField.phone))
                    }
                });
        })
    }        

    static getField(field){
        return new Promise(function (resolve,reject){
            dbCOnn.query(GET_FIELD, [field], function (error, result){
                if (error){
                    reject(error);
                }else{
                    const {idField,name,direction, phone} = result[0];
                    resolve(new Field(idField,name,direction, phone));
                }
            });
        })
        
    }

    static getFieldByName(name){
        console.log('getFieldByName');
        return new Promise(function (resolve,reject){
            console.log('getFieldByName db');
            dbCOnn.query(GET_FIELD_BY_NAME, [name], function (error, result){
                if (error){
                    reject(error);
                
                }else{
                    console.log('else');
                    if (result[0]){
                        console.log('encontro');
                        const {idField,name,direction, phone} = result[0];
                        resolve(new Field(idField,name,direction, phone))
                    }else{
                        console.log('not found');
                        resolve('NOT Found');    
                    }
                    
                }
            });
        })
        
    }    

    static getAllFields(){
        console.log('getAllFields');
        return new Promise(function (resolve,reject){
            console.log('getAllFields db');
            dbCOnn.query(GET_ALL_FIELDS, function (error, result){
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
    
    updateField(){
        console.log('updateField');
        return new Promise((resolve,reject)=>{
                dbCOnn.query(UPDATE_FIELD, [this.name,this.direction, this.phone, this.idField], (error, result)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(new Field(this.idField,this.name,this.direction, this.phone))
                    }
                });

        })
    }


    static deleteField(idField){
        console.log('deleteField');
        return new Promise((resolve,reject)=>{      

                        dbCOnn.query(DELETE_FIELD, [idField], (error, result)=>{
                            if (error){
                                reject(error);
                            }else{
                                resolve(result);  
                            }
                        });
                    
            
        })
    }    
}

module.exports = Field;
