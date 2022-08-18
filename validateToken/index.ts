import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request to validate token.');
    const jwtSK = process.env.JWT_SECRET_KEY;


    try {
        const token = req.headers.authorization;
        const verified = jwt.verify(token, jwtSK);
        context.log(jwt.decode(token));
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: 'Success'
        };
    } catch (e) {
        context.log('Error');
        context.res = {
            status: 400, /* Defaults to 200 */
            body: 'Not Verified'
        };

    }



};

export default httpTrigger;