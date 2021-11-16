import { BaseModel } from "./BaseModel";
import * as sql  from 'mssql';
import { reject, resolve } from "promise";
import { Context } from "@azure/functions";

export class Person extends BaseModel {
    context:Context = null;
    constructor(id?, context?){
        super();
        if (id) {
            this.id = id;
        }
        if (context) {
            this.context = context;
        }
        
    }

    public load(){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM  dbo.tblPersons WHERE intPersonID = ${this.id}`;
            this.pool.then(() => {                                              
                return sql.query(query);
            }).then(result => {
                this.dbFields = result.recordset[0];
                resolve(result.recordset[0]);
            }).catch(e => {
                reject(e)
            });
        });
    }

    public dbInsert(){
        return new Promise((resolve, reject) => {
            this.pool.then(() => {                
                const queryRequest = new sql.Request();
                
                // FIELDS THAT CANNOT BE NULL
                queryRequest.input('chvUniqueCode', sql.NVarChar, new Date().toISOString().split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16));
                queryRequest.input('chvFirstName', sql.NVarChar, this.dbFields['chvFirstName']);
                queryRequest.input('chvLastName', sql.NVarChar, this.dbFields['chvLastName']);
                queryRequest.input('intIsActiveID', sql.Int, this.dbFields['intIsActiveID']);
                queryRequest.input('intCountryID', sql.Int, this.dbFields['intCountryID']);
                queryRequest.input('intPersonModifiedByID', sql.Int, this.dbFields['intPersonModifiedByID']);
                queryRequest.input('dtePersonModified', sql.DateTime2, this.dbFields['dtePersonModified']);
                let 
                    chvTitle = ('chvTitle' in this.dbFields) ? this.dbFields['chvTitle'] : null,
                    chvPreferredName = ('chvPreferredName' in this.dbFields) ? this.dbFields['chvPreferredName'] : null,
                    chvGenderID = ('chvGenderID' in this.dbFields) ? this.dbFields['chvGenderID'] : null,
                    dteDateOfBirth =('dteDateOfBirth' in this.dbFields) ? this.dbFields['dteDateOfBirth'] :  null,
                    chvEmailAddress = ('chvEmailAddress' in this.dbFields) ? this.dbFields['chvEmailAddress'] : null,
                    intBirthCountryID = ('intBirthCountryID' in this.dbFields) ? this.dbFields['intBirthCountryID'] : null,
                    intNationalityID =('intNationalityID' in this.dbFields) ? this.dbFields['intNationalityID'] :  null,
                    intReligionID = ('intReligionID' in this.dbFields) ? this.dbFields['intReligionID'] : null,                    
                    chvPhoneNumber = ('chvPhoneNumber' in this.dbFields) ? this.dbFields['chvPhoneNumber'] : null,
                    chvUnitID = ('chvUnitID' in this.dbFields) ? this.dbFields['chvUnitID'] : null,
                    chvBuildingName = ('chvBuildingName' in this.dbFields) ? this.dbFields['chvBuildingName'] : null,
                    chvStreetAddress = ('chvStreetAddress' in this.dbFields) ? this.dbFields['chvStreetAddress'] : null,
                    chvCityName = ('chvCityName' in this.dbFields) ? this.dbFields['chvCityName'] : null,
                    intStateID = ('intStateID' in this.dbFields) ? this.dbFields['intStateID'] : null,
                    chvPostCode = ('chvPostCode' in this.dbFields) ? this.dbFields['chvPostCode'] : null,
                    chvLatitude = ('chvLatitude' in this.dbFields) ? this.dbFields['chvLatitude'] : null,
                    chvLongitude = ('chvLongitude' in this.dbFields) ? this.dbFields['chvLongitude'] : null;

                queryRequest.input('chvTitle', sql.NVarChar, chvTitle);
                queryRequest.input('chvPreferredName', sql.NVarChar, chvPreferredName);
                queryRequest.input('chvGenderID', sql.NVarChar(1), chvGenderID);
                queryRequest.input('dteDateOfBirth', sql.DateTime2(7), dteDateOfBirth);
                queryRequest.input('chvEmailAddress', sql.NVarChar, chvEmailAddress);
                queryRequest.input('intBirthCountryID', sql.Int, intBirthCountryID);
                queryRequest.input('intNationalityID', sql.Int, intNationalityID);
                queryRequest.input('intReligionID', sql.Int, intReligionID);                
                queryRequest.input('chvUnitID', sql.NVarChar(50), chvUnitID);
                queryRequest.input('chvPhoneNumber', sql.NVarChar(50), chvPhoneNumber);
                queryRequest.input('chvBuildingName', sql.NVarChar, chvBuildingName);
                queryRequest.input('chvStreetAddress', sql.NVarChar, chvStreetAddress);
                queryRequest.input('chvCityName', sql.NVarChar, chvCityName);
                queryRequest.input('intStateID', sql.Int, intStateID);
                queryRequest.input('chvPostCode', sql.NVarChar(10), chvPostCode);
                queryRequest.input('chvLatitude', sql.NVarChar, chvLatitude);
                queryRequest.input('chvLongitude', sql.NVarChar, chvLongitude);

                let insertSQL = `INSERT INTO dbo.tblPersons VALUES (
                    @chvUniqueCode,
                    @chvTitle,
                    @chvFirstName,
                    @chvPreferredName,
                    @chvLastName,
                    @chvGenderID,
                    @dteDateOfBirth,
                    @chvEmailAddress,
                    @intBirthCountryID,
                    @intNationalityID,
                    @intReligionID,
                    @intIsActiveID,
                    @intCountryID,
                    @chvPhoneNumber,
                    @chvUnitID,
                    @chvBuildingName,
                    @chvStreetAddress,
                    @chvCityName,
                    @intStateID,
                    @chvPostCode,
                    @intPersonModifiedByID,
                    @dtePersonModified,
                    @chvLatitude,
                    @chvLongitude)`;
                return queryRequest.query(insertSQL);                 
            }).then(result => {
                resolve(result);
            }).catch(e => {
                reject(e);
            });
        });
    }

    public dbUpdate(){
        return new Promise((resolve, reject) => {
            this.pool.then(() => {                
                const queryRequest = new sql.Request();  
                 
                // FIELDS THAT CANNOT BE NULL
                queryRequest.input('intPersonID', sql.Int, this.dbFields['intPersonID']);
                queryRequest.input('chvUniqueCode', sql.NVarChar, new Date().toISOString().split('').map(v=>v.charCodeAt(0)).reduce((a,v)=>a+((a<<7)+(a<<3))^v).toString(16));
                queryRequest.input('chvFirstName', sql.NVarChar, this.dbFields['chvFirstName']);
                queryRequest.input('chvLastName', sql.NVarChar, this.dbFields['chvLastName']);
                queryRequest.input('intIsActiveID', sql.Int, this.dbFields['intIsActiveID']);
                queryRequest.input('intCountryID', sql.Int, this.dbFields['intCountryID']);
                queryRequest.input('intPersonModifiedByID', sql.Int, this.dbFields['intPersonModifiedByID']);
                queryRequest.input('dtePersonModified', sql.DateTime2, this.dbFields['dtePersonModified']);
                let 
                    chvTitle = ('chvTitle' in this.dbFields) ? this.dbFields['chvTitle'] : null,
                    chvPreferredName = ('chvPreferredName' in this.dbFields) ? this.dbFields['chvPreferredName'] : null,
                    chvGenderID = ('chvGenderID' in this.dbFields) ? this.dbFields['chvGenderID'] : null,
                    dteDateOfBirth =('dteDateOfBirth' in this.dbFields) ? this.dbFields['dteDateOfBirth'] :  null,
                    chvEmailAddress = ('chvEmailAddress' in this.dbFields) ? this.dbFields['chvEmailAddress'] : null,
                    intBirthCountryID = ('intBirthCountryID' in this.dbFields) ? this.dbFields['intBirthCountryID'] : null,
                    intNationalityID =('intNationalityID' in this.dbFields) ? this.dbFields['intNationalityID'] :  null,
                    intReligionID = ('intReligionID' in this.dbFields) ? this.dbFields['intReligionID'] : null,                    
                    chvPhoneNumber = ('chvPhoneNumber' in this.dbFields) ? this.dbFields['chvPhoneNumber'] : null,
                    chvUnitID = ('chvUnitID' in this.dbFields) ? this.dbFields['chvUnitID'] : null,
                    chvBuildingName = ('chvBuildingName' in this.dbFields) ? this.dbFields['chvBuildingName'] : null,
                    chvStreetAddress = ('chvStreetAddress' in this.dbFields) ? this.dbFields['chvStreetAddress'] : null,
                    chvCityName = ('chvCityName' in this.dbFields) ? this.dbFields['chvCityName'] : null,
                    intStateID = ('intStateID' in this.dbFields) ? this.dbFields['intStateID'] : null,
                    chvPostCode = ('chvPostCode' in this.dbFields) ? this.dbFields['chvPostCode'] : null,
                    chvLatitude = ('chvLatitude' in this.dbFields) ? this.dbFields['chvLatitude'] : null,
                    chvLongitude = ('chvLongitude' in this.dbFields) ? this.dbFields['chvLongitude'] : null;

                queryRequest.input('chvTitle', sql.NVarChar, chvTitle);
                queryRequest.input('chvPreferredName', sql.NVarChar, chvPreferredName);
                queryRequest.input('chvGenderID', sql.NVarChar(1), chvGenderID);
                queryRequest.input('dteDateOfBirth', sql.DateTime2(7), dteDateOfBirth);
                queryRequest.input('chvEmailAddress', sql.NVarChar, chvEmailAddress);
                queryRequest.input('intBirthCountryID', sql.Int, intBirthCountryID);
                queryRequest.input('intNationalityID', sql.Int, intNationalityID);
                queryRequest.input('intReligionID', sql.Int, intReligionID);                
                queryRequest.input('chvUnitID', sql.NVarChar(50), chvUnitID);
                queryRequest.input('chvPhoneNumber', sql.NVarChar(50), chvPhoneNumber);
                queryRequest.input('chvBuildingName', sql.NVarChar, chvBuildingName);
                queryRequest.input('chvStreetAddress', sql.NVarChar, chvStreetAddress);
                queryRequest.input('chvCityName', sql.NVarChar, chvCityName);
                queryRequest.input('intStateID', sql.Int, intStateID);
                queryRequest.input('chvPostCode', sql.NVarChar(10), chvPostCode);
                queryRequest.input('chvLatitude', sql.NVarChar, chvLatitude);
                queryRequest.input('chvLongitude', sql.NVarChar, chvLongitude);

                let updateSQL = `UPDATE dbo.tblPersons SET
                    chvUniqueCode = @chvUniqueCode,
                    chvTitle = @chvTitle,
                    chvFirstName = @chvFirstName,
                    chvPreferredName = @chvPreferredName,
                    chvLastName = @chvLastName,
                    chvGenderID = @chvGenderID,
                    dteDateOfBirth = @dteDateOfBirth,
                    chvEmailAddress = @chvEmailAddress,
                    intBirthCountryID = @intBirthCountryID,
                    intNationalityID = @intNationalityID,
                    intReligionID = @intReligionID,
                    intIsActiveID = @intIsActiveID,
                    intCountryID = @intCountryID,
                    chvPhoneNumber = @chvPhoneNumber,
                    chvUnitID = @chvUnitID,
                    chvBuildingName = @chvBuildingName,
                    chvStreetAddress = @chvStreetAddress,
                    chvCityName = @chvCityName,
                    intStateID = @intStateID,
                    chvPostCode = @chvPostCode,
                    intPersonModifiedByID = @intPersonModifiedByID,
                    dtePersonModified = @dtePersonModified,
                    chvLatitude = @chvLatitude,
                    chvLongitude = @chvLongitude
                WHERE intPersonID = @intPersonID`; 
                return queryRequest.query(updateSQL);                 
            }).then(result => {
                resolve('UPDATE SUCCESSFUL');
            }).catch(e => {
                reject(e);
            });
        });
    }
    public create(createData:object = {}, context):any{
        this.dbFields = {...createData};
        if('intPersonID' in this.dbFields) {
            this.id = this.dbFields['intPersonID'];
            this.dbUpdate().then(() => {                
                resolve('Update Success');
            }).catch(e => {               
                reject(e);
            });
           
        } else {
            this.dbInsert().then(() => {
                resolve('Insert Success')
            }).catch(e => {
                reject(e);
            });
            
        }
        return;
        
    }

    public get(key:string){
        return this.dbFields[key];
    }

    public setFieldValues(values:object={}) {
        this.dbFields = {...values};
    }

    public getPersonDetails(id?, tz?): Promise<Object> {
        return new Promise((resolve, reject) => {
            let personId = this.id;
            let intTimeZone = null;

            if (intTimeZone) {
                intTimeZone = tz;
            }

            if(id) {
                personId = id;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intTimeZone', sql.Int, intTimeZone);
            this.pool.then(() => {
                return queryRequest.execute('dbo.spSelectPersonalDetails');                
            }).then(result => {
                resolve(result.recordset[0]);
            }).catch(e => {
                reject(e);
            });    
        });        
    }
    public closeConnection() {
        this.pool.then(() => {
            return sql.close();
        });
    }
}