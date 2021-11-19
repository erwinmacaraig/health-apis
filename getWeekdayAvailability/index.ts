import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let id:number;
    if (req.query.id) {
        id = +req.query.id;
        const tz = req.query.tz || null;
        const person = new Person();
    try {
        let res = await person.getWeekdayAvailability(id, tz);
        context.res = {
            status: 200,
            body: res,
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
    } else {
        context.res = {
            status: 400, 
            body: 'Invalid parameter supplied',
            headers: {
                'Content-Type': 'application/json'
            }
        }; 
    }

};

export default httpTrigger;