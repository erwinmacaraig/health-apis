import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Person } from "../models/Person";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request to check user login creds.');
    if (req.method === 'POST') {
        let chvUniqueCode = null;
        let chvPassword = null;
        let errorMessages: Array<Object> = [];
        try {
            chvUniqueCode = req.body.identity;
        } catch (e) {
            errorMessages.push({
                error: "Invalid identity supplied"
            });
        }
        try {
            chvPassword = req.body.passwd;
        } catch (e) {
            errorMessages.push({
                error: "Wrong password"
            });
        }
        if (errorMessages.length > 0) {
            context.res = {
                status: 400,
                body: errorMessages,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return;
        }
        try {
            const person = new Person();
            let res = await person.checkPersonLogin(chvUniqueCode, chvPassword);
            context.res = {
                status: 200,
                body: res,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } catch (e) {
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
            status: 405,
            body: 'Method not allowed',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return;
    }



};

export default httpTrigger;