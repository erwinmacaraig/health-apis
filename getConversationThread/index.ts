import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let threadID:number;
    if (req.query.threadID) {
        threadID = +req.query.threadID;
        const timeZone = req.query.timeZone || null;
        const thread = new Person();
    try {
        let res = await thread.getConversationThread(threadID, timeZone);
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