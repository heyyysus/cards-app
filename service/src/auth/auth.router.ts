import { Router } from "express";


const router = Router();

router.get('/', (req, res) => {
    res.json({user_id: req.auth.payload.sub});
    //res.send('hello');
})

export default router;