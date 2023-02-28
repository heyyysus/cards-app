import { Router } from "express";
import { RetrieveAuthUserData } from "./auth.middleware";


const router = Router();

router.get('/', RetrieveAuthUserData, (req, res) => {
    res.json(req.user);
    //res.send('hello');
})

export default router;