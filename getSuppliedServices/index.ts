import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function getSuppliedServices');
    let personID:number;
    if (req.query.personID) {
        personID = +req.query.personID;
        const supplierId = +req.query.supplierId || 0;
        const person = new Person();
        try {
            let res = await person.getSuppliedServices(personID, supplierId);
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