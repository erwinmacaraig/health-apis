import { BaseModel } from "./BaseModel";
import * as sql from 'mssql';
import { reject, resolve } from "promise";
import { Context } from "@azure/functions";

export class Person extends BaseModel {
    context: Context = null;
    constructor(personID?, context?) {
        super();
        if (personID) {
            this.personID = personID;
        }
        if (context) {
            this.context = context;
        }

    }

    /**
     * Loads a particular record in the databse
     * @returns Promise that resolves to an object which contains a record in the tblPersons table given an id
     */
    public load(): Promise<Object> {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM  dbo.tblPersons WHERE intPersonID = ${this.personID}`;
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

    /**
     * Inserts a record in the tblPersons table 
     * @returns Promise that resolves to a boolean true or false depending on the result of the operation
     */
    public dbInsert() {
        return new Promise((resolve, reject) => {
            this.pool.then(() => {
                const queryRequest = new sql.Request();

                // FIELDS THAT CANNOT BE NULL
                queryRequest.input('chvUniqueCode', sql.NVarChar, new Date().toISOString().split('').map(v => v.charCodeAt(0)).reduce((a, v) => a + ((a << 7) + (a << 3)) ^ v).toString(16));
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
                    dteDateOfBirth = ('dteDateOfBirth' in this.dbFields) ? this.dbFields['dteDateOfBirth'] : null,
                    chvEmailAddress = ('chvEmailAddress' in this.dbFields) ? this.dbFields['chvEmailAddress'] : null,
                    intBirthCountryID = ('intBirthCountryID' in this.dbFields) ? this.dbFields['intBirthCountryID'] : null,
                    intNationalityID = ('intNationalityID' in this.dbFields) ? this.dbFields['intNationalityID'] : null,
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

    /**
     * Updates a record in the tblPersons table
     * @returns Promise that resolves to a  boolean true or false depending on the result of the operation
     */
    public dbUpdate() {
        return new Promise((resolve, reject) => {
            this.pool.then(() => {
                const queryRequest = new sql.Request();

                // FIELDS THAT CANNOT BE NULL
                queryRequest.input('intPersonID', sql.Int, this.dbFields['intPersonID']);
                queryRequest.input('chvUniqueCode', sql.NVarChar, new Date().toISOString().split('').map(v => v.charCodeAt(0)).reduce((a, v) => a + ((a << 7) + (a << 3)) ^ v).toString(16));
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
                    dteDateOfBirth = ('dteDateOfBirth' in this.dbFields) ? this.dbFields['dteDateOfBirth'] : null,
                    chvEmailAddress = ('chvEmailAddress' in this.dbFields) ? this.dbFields['chvEmailAddress'] : null,
                    intBirthCountryID = ('intBirthCountryID' in this.dbFields) ? this.dbFields['intBirthCountryID'] : null,
                    intNationalityID = ('intNationalityID' in this.dbFields) ? this.dbFields['intNationalityID'] : null,
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
    public create(createData: object = {}, context): any {
        this.dbFields = { ...createData };
        if ('intPersonID' in this.dbFields) {
            this.personID = this.dbFields['intPersonID'];
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

    /**
     * 
     * @param key the key index representing the column name in the tblPersons table
     * @returns any
     */
    public get(key: string) {
        return this.dbFields[key];
    }

    /**
     * set field values where in the keys are the columns of the tblPersons table
     * @param values key-value pairs
     */
    public setFieldValues(values: object = {}) {
        this.dbFields = { ...values };
    }

    /**
     * Gives out personal information details of a person
     * @param personID integer value for tblPersons.intPersonID
     * @param timeZone integer representation of timezone, defaults to 10
     * @returns Promise that resolves to an object
     */
    public getPersonDetails(personID?, timeZone?): Promise<Object> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            let intTimeZone = null;

            if (intTimeZone) {
                intTimeZone = timeZone;
            }

            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intTimeZone', sql.Int, intTimeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectPersonalDetails');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset[0]);
                } else {
                    reject('No person found.');
                }

            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * list the availability of a care worker person
     * @param personID integer value representing the unique personID of a care worker person (tblPersons.intPersonID)
     * @param timeZone integer value for the timezone defaults to 10
     * @returns Promise that resolves to an array of objects
     */
    public getPersonalAvailability(personID?, timeZone?): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            let intTimeZone = null;

            if (intTimeZone) {
                intTimeZone = timeZone;
            }

            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intTimeZone', sql.Int, intTimeZone);
            this.pool.then(() => {
                // spSelectPersonalAvailability (@intPersonID int, @intTimeZone int)
                return queryRequest.execute('spSelectPersonalAvailability');
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No data found');
                } else {
                    resolve(result.recordset);
                }

            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Stores information for a person's supplied areas of responsibility
     * @param personID integer value representing tblPersons.intPersonID
     * @param supplierId integer value for the supplier personID
     * @returns Promise that resolves to an array of Objects
     */
    public getSuppliedAreas(personID?, supplierId = 0): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intSupplierAddressID', sql.Int, supplierId);
            this.pool.then(() => {
                return queryRequest.execute('spSelectSuppliedAreas');
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No data found');
                } else {
                    resolve(result.recordset);
                }

            }).catch(e => {
                reject(e);
            });

        });
    }

    /**
     * @param personID an integer the represents the intPersonId
     * @param dayOfWeek integer for the Day int value 1 for Monday up until 7 for Sunday
     * @param timeOfDay string formats to "1,2,3" for Morning, Afternoon, Evening respectively
     * @param modifiedBy integer personID that represents who modified the record
     * @returns a Promise that resolves to boolean when successful 
     * @description calls stored procedure spInsertWeekdayAvailability (@chvTimeOfDayArray nvarchar(256), @intDayOfWeekID INT, @intPersonID INT, @intModifiedByID INT)
     */
    public putWeekdayAvailability(personID?, dayOfWeek: number = 0, timeOfDay: string = '', modifiedBy: number = 0): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID && Number.isInteger(personID)) {
                personId = personID;
            }
            let modifiedById = personId;
            if (modifiedBy && Number.isInteger(modifiedBy)) {
                modifiedById = modifiedBy;
            }
            if (!Number.isInteger(dayOfWeek)) {
                reject('Invalid dayOfWeek parameter supplied');
                return;
            }
            if (dayOfWeek < 0 || dayOfWeek > 7) {
                reject('dayOfWeek out of bounds');
                return;
            }
            if (timeOfDay.trim().length == 0) {
                reject('Invalid timeOfDay parameter supplied');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('chvTimeOfDayArray', sql.VarChar(255), timeOfDay);
            queryRequest.input('intDayOfWeekID', sql.Int, dayOfWeek);
            queryRequest.input('intModifiedByID', sql.Int, modifiedById);
            this.pool.then(() => {
                return queryRequest.execute('spInsertWeekdayAvailability');
            }).then(() => {
                resolve(true);
            }).catch(e => {
                reject(e);
            });

        });
    }

    /**
     * @param personID an integer the represents the intPersonId
     * @param localGovernmentAreaArr  string representation of an array of areas (defaults to emptry string),
     * refer to dbo.tlkpLocalGovernnmentAreas
     * @param suppliedServicesGroupId integer value defaults to 0. 
     * @param supplierAddressId integer value that represents the supplier address id, defaults to a NULL value
     * @param modifiedBy integer value that holds the id of the person inserting the record
     * @returns 
     */
    public putSuppliedAreas(personID?, localGovernmentAreaArr = '', suppliedServicesGroupId = 0, supplierAddressId = null, modifiedBy = null): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID && Number.isInteger(+personID)) {
                personId = personID;
            }
            let modifiedById = personId;
            if (modifiedBy && Number.isInteger(modifiedBy)) {
                modifiedById = modifiedBy;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('chvLocalGovernmentAreaArray', sql.VarChar(255), localGovernmentAreaArr);
            queryRequest.input('intSuppliedServiceGroupID', sql.Int, suppliedServicesGroupId);
            queryRequest.input('intSupplierAddressID', sql.Int, supplierAddressId);
            queryRequest.input('intModifiedByID', sql.Int, modifiedById);
            this.pool.then(() => {
                return queryRequest.execute('spInsertSuppliedAreas');
            }).then(() => {
                resolve(true);
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * retrieves the active contact person list
     * @param personID integer value representing tblPersons.intPersonID
     * @param isActiveInt integer value, 1 or greater for active and 0 for inactive
     * @returns Promise that will resolve to an array of Objects 
     */
    public getContactPersons(personID?, isActiveInt: number = 0): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intIsActive', sql.Int, isActiveInt);
            this.pool.then(() => {
                return queryRequest.execute('spSelectContactPersons')
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found.');
                }
            }).catch(e => {
                reject(e);
            });

        });
    }

    /**
     * Lists the teammates of a particular person
     * @param personID integer value that represents tblPerson.intPersonID
     * @param goodRelIdInt integer 0 or 1 representing good relationship 
     * @param timeZone integer timezone value (defaults to 10)
     * @returns Promise that resolves to an Object array representing the teammates 
     */
    public getTeam(personID?, goodRelIdInt: number = 1, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intGoodRelationshipID', sql.Int, goodRelIdInt);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectTeam');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found.');
                }
            }).catch(e => {
                reject(e);
            });

        });
    }

    /**
     * Lists the Customers of a particular person
     * @param personID integer value that represents tblPerson.intPersonID
     * @param timeZone integer timezone value (defaults to 10)
     * @returns Promise that resolves to an Object array representing the teammates 
     */
    public getPersonalCustomers(personID?, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            // spSelectPersonalCustomers (@intPersonID int, @intTimeZone int)
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectPersonalCustomers');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found.');
                }
            }).catch(e => {
                reject(e);
            });

        });
    }

    /**
     * Lists the Consumer Contacts of a particular person
     * @param personID integer value that represents tblPerson.intPersonID
     * @param timeZone integer timezone value (defaults to 10)
     * @returns Promise that resolves to an Object array representing the teammates 
     */
    public getPersonalConsumers(personID?, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            // spSelectPersonalConsumers (@intPersonID int, @intTimeZone int)
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectPersonalConsumers');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found.');
                }
            }).catch(e => {
                reject(e);
            });

        });
    }

    /**
     * Gives you the particular job details and description of a person
     * @param personID integer representing tblPersons.intPersonID
     * @param timeZone integer representation of timezone
     * @returns Promise that resolves to an Object containing key value pairs of the person
     */
    public getJobDescription(personID?, timeZone: number = null): Promise<Object> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            let intTimeZone = null;

            if (intTimeZone) {
                intTimeZone = timeZone;
            }

            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intTimeZone', sql.Int, intTimeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectJobDescriptions');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset[0]);
                } else {
                    reject('No record found.');
                }

            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * gives out a list of suppliers and the data for each
     * @param personID integer representation of tblPersons.intPersonID
     * @param isActiveInt integer value for specifying that the supplier is active or inactive
     * @returns Promise that resolves an Object array containing the records for suppliers
     */
    public getContactSuppliers(personID?, isActiveInt: number = 1): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('intIsActive', sql.Int, isActiveInt);
            this.pool.then(() => {
                return queryRequest.execute('spSelectContactSuppliers');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found.');
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Retrieves the personal assessment of a care worker to a person
     * @param personID integer representing tblPersons.intPersonID
     * @param startDate DateTime2 value in the form of YYYY-MM-DD
     * @param timeZone integer value representing the timezone
     * @returns Promise that resolves to an Object array containing the general assessment and other supplementary information
     */
    public getPersonalAssessments(personID?, startDate: string = null, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personID);
            queryRequest.input('dteStartDate', sql.DateTime2, startDate);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectPersonalAssessments');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });


        });
    }

    /**
     * Retrieve personal care plans and assessment for a person
     * @param personID integer value for the person representing tblPersons.intPersonID
     * @param startDate DateTime2 value for the start of the assessment
     * @param timeZone integer value defaults to 10
     * @returns Promise that resolves to an array of Objects representing the personal care plan records
     */
    public getPersonalCarePlans(personID?, startDate: string = null, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personID);
            queryRequest.input('dteStartDate', sql.DateTime2, startDate);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectPersonalCarePlans ');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });


        });
    }

    /**
     * determines the care plan goals of a given person specified by intPersonID
     * @param personID integer value that represents intPersonID
     * @param timeZone integer value for timezone, defaults to 10 if not supplied
     * @returns Object array consisting of the care plan goal records
     */
    public getCarePlanGoalActions(personID?, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personID);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectCarePlanGoalActions');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    public getPersonDetailsByEmail(email: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.pool.then(() => {
                const queryRequest = new sql.Request();
                queryRequest.input('chvEmailAddress', sql.NVarChar, email);
                let queryPerson = `SELECT * FROM tblPersons where chvEmailAddress = @chvEmailAddress`;
                /*
SELECT vwPersonDetails.intPersonID, 
                    vwPersonDetails.intStaffID, 
                    vwPersonDetails.intApplicantID, 
                    vwPersonDetails.intCareWorkerID, 
                    vwPersonDetails.intEnquiryPersonID, 
                    vwPersonDetails.intPotentialCustomerID, 
                    vwPersonDetails.intCustomerID, 
                    vwPersonDetails.chvUniqueCode, 
                    vwPersonDetails.amtRatingScore, 
                    vwPersonDetails.chvScorecardRating, 
                    vwPersonDetails.chvScorecardRatingAlert,
                    vwPersonDetails.intRatingCount,
                    vwPersonDetails.chvSupplierIDs,
                    vwPersonDetails.chvEmployerNames,
                    vwPersonDetails.chvTitle, 
                    vwPersonDetails.chvFirstName, 
                    vwPersonDetails.chvPreferredName, 
                    vwPersonDetails.chvLastName, 
                    vwPersonDetails.chvPersonName, 
                    vwPersonDetails.chvGenderID, 
                    vwPersonDetails.chvGender, 
                    FORMAT(vwPersonDetails.dteDateOfBirth, 'd MMM yyyy') AS dteDateOfBirth, 
                    vwPersonDetails.intAge, 
                    vwPersonDetails.chvEmailAddress, 
                    vwPersonDetails.intBirthCountryID, 
                    vwPersonDetails.chvBirthCountryName, 
                    vwPersonDetails.chvBirthCountryFlagName, 
                    vwPersonDetails.intNationalityID, 
                    vwPersonDetails.chvNationality, 
                    vwPersonDetails.chvNationalityFlagName, 
                    vwPersonDetails.intReligionID, 
                    vwPersonDetails.chvReligion, 
                    vwPersonDetails.chvLanguageAssistance,
                    vwPersonDetails.chvLanguages,
                    vwPersonDetails.intCountryID, 
                    vwPersonDetails.chvCountryName, 
                    vwPersonDetails.chvCountryFlagName, 
                    vwPersonDetails.chvPhoneNumber, 
                    vwPersonDetails.chvUnitID, 
                    vwPersonDetails.chvBuildingName, 
                    vwPersonDetails.chvStreetAddress, 
                    vwPersonDetails.chvCityName, 
                    vwPersonDetails.intStateID, 
                    vwPersonDetails.chvStateName, 
                    vwPersonDetails.chvStateAbbrev, 
                    vwPersonDetails.chvPostCode, 
                    vwPersonDetails.intPersonModifiedByID, 
                    vwPersonDetails.chvPersonModifiedBy, 
                    vwPersonDetails.dtePersonModified
            FROM	vwPersonDetails
            WHERE	vwPersonDetails.chvEmailAddress = @chvEmailAddress
                */
                return queryRequest.query(queryPerson);
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset[0]);
                } else {
                    reject('No record found.');
                }
            }).catch((err) => {
                reject(err);
            });


        });
    }

    /**
     * Retrieve personal access and roles from email person
     * @param chvEmailAddress String value for the State abbreviation that the notice is for e.g. 'NSW'
     * @returns Promise that resolves to an array of Objects representing the personal care plan records
     */
    public getPersonalAccess(email: string): Promise<Object> {
        return new Promise((resolve, reject) => {
            const queryRequest = new sql.Request();
            queryRequest.input('chvEmailAddress', sql.VarChar(255), email);
            this.pool.then(() => {
                // [spCheckUserAccess] (@chvEmailAddress nvarchar(255)) 
                return queryRequest.execute('spCheckUserAccess');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset[0]);
                } else {
                    reject('No record found.');
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Retrieve personal care plans and assessment for a person
     * @param personID integer value for the person representing tblPersons.intPersonID
     * @param chvNoticeFor String value for the type of Person recieving the notice e.g 'Care Worker'
     * @param chvNoticeVisibleToArray String value for the State abbreviation that the notice is for e.g. 'NSW'
     * @param timeZone integer value defaults to 10
     * @returns Promise that resolves to an array of Objects representing the personal care plan records
     */
    public getPersonalNotices(personID?, noticeFor: string = null, noticeVisibleTo: string = null, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            // [spSelectPersonalNotices] (@intPersonID int, @chvNoticeFor nvarchar(255), @chvNoticeVisibleToArray nvarchar(510), @intTimeZone int) 
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('chvNoticeFor', sql.VarChar(255), noticeFor);
            queryRequest.input('chvNoticeVisibleToArray', sql.VarChar(510), noticeVisibleTo);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectPersonalNotices');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });


        });
    }

    /**
     * Retrieve personal care plans and assessment for a person
     * @param noticeID integer value for the notice representing intNoticeID
     * @param timeZone integer value defaults to 10
     * @returns Promise that resolves to an array of Objects representing the personal care plan records
     */
    public getNotice(noticeID?, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let intNoticeID = noticeID;
            // [spSelectNotice] (@intNoticeID int, @intTimeZone int)
            const queryRequest = new sql.Request();
            queryRequest.input('intNoticeID', sql.Int, intNoticeID);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectNotice');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });


        });
    }

    /**
     * Retrieves the personal assessment of a care worker to a person
     * @param personID integer representing tblPersons.intPersonID
     * @param EndDate DateTime2 value in the form of YYYY-MM-DD
     * @param timeZone integer value representing the timezone
     * @returns Promise that resolves to an Object array containing the general assessment and other supplementary information
     */
    public getScheduledEvents(personID?, endDate: string = null, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let personId = this.personID;
            if (personID) {
                personId = personID;
            }
            // [spSelectScheduledEvents] (@dteEndDate datetime2, @intPersonID int, @intTimeZone int) 
            const queryRequest = new sql.Request();
            queryRequest.input('intPersonID', sql.Int, personId);
            queryRequest.input('dteEndDate', sql.DateTime2, endDate);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectScheduledEvents');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * Retrieves the personal assessment of a care worker to a person
     * @param scheduledEventID integer representing tblScheduledEvents.intScheduledEventID
     * @param timeZone integer value representing the timezone
     * @returns Promise that resolves to an Object array containing the general assessment and other supplementary information
     */
    public getScheduledEvent(scheduledEventID?, timeZone: number = null): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let eventID = scheduledEventID;
            // [spSelectScheduledEvent] (@intScheduledEventID int, @intTimeZone int) 
            const queryRequest = new sql.Request();
            queryRequest.input('intScheduledEventID', sql.Int, eventID);
            queryRequest.input('intTimeZone', sql.Int, timeZone);
            this.pool.then(() => {
                return queryRequest.execute('spSelectScheduledEvent');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });


        });
    }

    public checkPersonLogin(chvUniqueCode: String, passwd: String) {
        return new Promise((resolve, reject) => {
            const queryRequest = new sql.Request();
            queryRequest.input('chvEmailAddress', sql.VarChar(255), chvUniqueCode);
            queryRequest.input('chvPassword', sql.VarChar(255), passwd);
            this.pool.then(() => {
                return queryRequest.execute('spCheckUserLogin');
            }).then(result => {
                if (result.recordset.length > 0) {
                    resolve(result.recordset);
                } else {
                    reject('No records found');
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    /**
     * closes database connection
     */
    public closeConnection() {
        this.pool.then((pool) => {
            return pool.close()
        });
    }
}