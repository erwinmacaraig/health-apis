import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import { UtilityHelper } from '../models/UtilityHelper';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request to retrieve all conversation usernames.');

    try {
        const helper = new UtilityHelper();
        const chatNames = await helper.getConversationUsers();

        const chatNameList = [];
        chatNames.forEach(user => {
            let key = `${user['chvUniqueCode']}`;
            chatNameList.push({
                [key]: user['chvConversationUserName']
            });
        });

        context.res = {
            status: 200, /* Defaults to 200 */
            body: chatNameList
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


};

export default httpTrigger;