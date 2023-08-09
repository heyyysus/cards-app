import db from "./db";

export interface IUser {
    user_id: string,
    username?: string,
    profile_img?: string,
    bio?: string,
    ts?: Date
    following?: IUser[],
    followers?: IUser[],
}

export interface IPlan{
    plan_id: number,
    plan_name?: string,
    plan_desc?: string,
    plan_lat?: number,
    plan_lng?: number,
    author?: IUser,
    start_ts?: Date,
    end_ts?: Date,
    ts?: Date,
}

// USER DEPS
const fetchOneUserBy = async (key: string, value: string, fields: string[] = ['*']): Promise<IUser> => {
    const fieldsString: string = fields.reduce((a, b) => `${a}, ${b}`);
    try {
        const query = {
            text: `SELECT ${fieldsString} FROM users WHERE ${key}=$1`,
            values: [value]
        };
        const result = await db.query(query);
        let fetchedUser: IUser = result.rows[0];
        if (!fetchedUser) return null;
        return fetchedUser;
    } catch(e){
        console.log(e);
        return e;
    }
}

export const getUserPlans = async (id: string): Promise<IPlan[]> => {
    try {
        const query = `SELECT * FROM plans 
                        WHERE user_id=$1`;
        const result = await db.query(query, [id]);
        const plansPromise = result.rows.map(async p => {
            const plan: IPlan = {
                author: await fetchOneUserBy('user_id', p["pk_users_plans"]),
                ... p,
            };
            return plan;
        });
        return await Promise.all(plansPromise);
    } catch(e){
        console.log(e);
        return null;
    }
}

export const getPlanById = async (id: string): Promise<IPlan> => {
    try {
        const query = `SELECT * FROM plans 
                        WHERE plan_id=$1`;
        const result = await db.query(query, [id]);
        let plan: IPlan = result.rows[0];
        plan.author = await fetchOneUserBy('user_id', result.rows[0]["fk_users_plans"]);
        return plan;
    } catch(e){
        console.log(e);
        return null;
    }
}

export const getAllPlans = async (): Promise<IPlan[]> => {
    try {
        const query = "SELECT * FROM plans";

        console.log("STARTING QUERY")

        const result = await db.query(query);

        console.log(`FINISHED QUERY: rowCount: ${result.rowCount}`)

        const plansPromise = result.rows.map(async p => {
            const plan: IPlan = {
                author: await fetchOneUserBy('user_id', p["fk_users_plans"]),
                ... p,
            };
            return plan;
        });
        return await Promise.all(plansPromise);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const createPlan = async (plan: IPlan, sub: string): Promise<IPlan> => {
    if(!(plan.plan_name)) return null;
    try {
        const query = {
            text: `INSERT INTO plans (plan_name, plan_desc, fk_users_plans) VALUES ($1, $2, $3)`,
            values: [plan.plan_name, plan.plan_desc, sub]
        };
        const result = await db.query(query);
        let newPlan = result.rows[0];
        if(!newPlan) return null;
        const user = await fetchOneUserBy('user_id', sub);
        plan.author = user;
        return plan;
    } catch(e){
        console.log(e);
        return null;
    }
}

export const deletePlan = async (id: number): Promise<boolean> => {
    if(!id) return false;
    try {
        const query = "DELETE FROM plans WHERE plan_id=$1";
        const result = await db.query(query, [id]);
        return true;
    } catch(e){
        console.log(e);
        return false;
    }
}