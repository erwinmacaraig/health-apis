import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger putWeekdayAvailability function processed.');

    if(req.method === 'POST') {
        let personId;
        let intDayOfWeekID;
        let timeOfTheDay;
        let intModifiedByID;
        let errorMessages:Array<Object> = [];

        if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && parseInt(req.body.intPersonID, 10) > 0) {
            personId = +req.body.intPersonID;
        } else {
            errorMessages.push({
                error: "Invalid person id"
            })
        }
        if(req.body.intModifiedByID){
            if (Number.isInteger(req.body.intModifiedByID)) {
                intModifiedByID = +req.body.intModifiedByID;
            } else {
                errorMessages.push({
                    error: "Invalid modified person id"
                });
            }
        } 
        if(req.body.chvTimeOfDayArray && (req.body.chvTimeOfDayArray as string).trim().length > 0){
            timeOfTheDay = req.body.chvTimeOfDayArray;
        } else {
            errorMessages.push({
                error: "chvTimeOfDayArray is required"
            });
        }
        if(req.body.intDayOfWeekID && Number.isInteger(+req.body.intDayOfWeekID)){
            intDayOfWeekID = +req.body.intDayOfWeekID;
        } else {
            errorMessages.push({
                error: "Invalid intDayOfWeekID parameter"
            });
        }
        if(intDayOfWeekID < 0 || intDayOfWeekID > 7) {
            errorMessages.push({
                error: 'intDayOfWeekID out of bounds'
            });
        }

        if(errorMessages.length > 0) {
            context.res = {
                status: 405, 
                body: errorMessages,
                headers: {
                    'Content-Type': 'application/json'
                }
            }; 
        } else {

            const person = new Person();
            try {
                let res = await person.putWeekdayAvailability(personId, intDayOfWeekID, timeOfTheDay, intModifiedByID);
                context.res = {
                    status: 200, 
                    body: 'Success',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }; 
            } catch(e) {
                context.log(e);
                context.res = {
                    status: 400, 
                    body: e,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }; 
            }
            
        }

    } else {
        context.res = {
            status: 405, 
            body: 'Method not allowed',
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
    }
    

};

export default httpTrigger;