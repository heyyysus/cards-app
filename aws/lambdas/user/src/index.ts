import { Context, APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Pool } from 'pg';
import { createWithAutoUsername } from './user.service';

const pool = new Pool({
    host: "group-study-ucsb-dev.c8nxscgmv2nn.us-west-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "RPloa9Wa04gkcmtHFwWFl",
});

const cors = (a: any) => {
    return {
        ... a,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': "*",
            'Access-Control-Expose-Headers': "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Max-Age": "300"

        }
    };
}



const getAuthorizedUser = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
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


export const handler = async (event: any, context: Context): Promise<APIGatewayProxyResult> => {

    
    switch(event.requestContext.http.method){
        case "GET":
            return await cors(getAuthorizedUser(event, context));
        case "OPTIONS": 
            return cors({
                statusCode: 200,
                body: ""
            });
        default: 
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Not found" })
            }
    }

}