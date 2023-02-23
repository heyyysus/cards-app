import { Router } from "express";
import { RequireAuthentication } from "./auth.middleware";

const router = Router();

router.get('/', RequireAuthentication, (req, res) => {
    res.json(req.user);
    //res.send('hello');
})

export default router;