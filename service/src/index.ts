import Express from 'express';
import AuthRouter from "./auth/auth.router";
import { auth } from "express-oauth2-jwt-bearer";
import cors from 'cors';

const PORT = 5000;

const app = Express();

interface ApiDescription {
    name: string,
    version: string,
    description: string,
    routes: {url: string, credentials: string}[]
}

const apiDescription: ApiDescription = {
    name: "gaucho_group_service",
    version: "v0.1",
    description: "backend for gaucho group application.",
    routes: [],
};


const jwtCheck = auth({
    audience: 'https://hop-in.com',
    issuerBaseURL: 'https://dev-wuhjbaj4.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

app.use(cors());
app.use(jwtCheck)

app.use('/api/auth', AuthRouter);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});