import Express from 'express';
import AuthRouter from "./auth/auth.router";

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

app.use('/api/auth', AuthRouter);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});