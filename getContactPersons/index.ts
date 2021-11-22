import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let id:number;
   
    if(req.query.id) {
        id = +req.query.id;
        const person = new Person();
        let isActiveInt = 1;        
        if (Number.isInteger(+req.query.intIsActive)) {
            isActiveInt = +req.query.intIsActive > 0 ? 1:0;
        }
        try {
            let res = await person.getContactPersons(id, isActiveInt);
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