import { APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Pool } from 'pg';
import { APIEvent, Context } from './types';
import { createWithAutoUsername, fetchOneBy } from './user.service';

const pool = new Pool({
    host: "group-study-ucsb-dev.c8nxscgmv2nn.us-west-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "RPloa9Wa04gkcmtHFwWFl",
});

const cors = (a: any, origin: string) => {
    return {
        ... a,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': "Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Max-Age": "300",

        },
    };
}



const getAuthorizedUser = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        
        const user_id = event.requestContext.authorizer.jwt.claims.sub;
    
        const query = "SELECT * FROM users WHERE user_id=$1 LIMIT 1";
        const result = await pool.query(query, [ user_id ]);
    
        let user = (result.rowCount > 0) ? result.rows[0] : null;

        if(!user){ 
            user = await createWithAutoUsername(user_id);
         }

        return {
            statusCode: 200,
            body: JSON.stringify(user),
        }

    } catch (error) {
        const body = { error: error }
        return {
            statusCode: 500,
            body: JSON.stringify(body),
        }
    }
}


const prehandler = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {
    
    switch(event.requestContext.http.method){
        case "GET":
            const username = event.queryStringParameters?.username || undefined;
            const user_id = event.queryStringParameters?.user_id || undefined;
            if(username)
                return {
                    statusCode: 200,
                    body: JSON.stringify(await fetchOneBy('username', username)),
                    //body: username
                }
            else if(user_id) 
                return {
                    statusCode: 200,
                    body: JSON.stringify(await fetchOneBy('user_id', user_id)),
                };
            else
                return await getAuthorizedUser(event, context);
        
        case "OPTIONS": 
            return {
                "statusCode": 200,
                "body": "",
            };
        default: 
            return { statusCode: 404, body: "Not found" };
    }

}

export const handler = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {

    try {
        const allowed_origin = `http://localhost:3000`;
        return cors(await prehandler(event, context), allowed_origin);
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error })
        };
    }
}