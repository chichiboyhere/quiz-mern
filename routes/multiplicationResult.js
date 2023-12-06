import express from "express";
import { body } from "express-validator";

import {getMultiplicationResults, postMultiplicationResult} from "../controllers/multiplicationResult.js";
//import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// GET /multiplicationResults/getResults
router.get('/getResults/:id', getMultiplicationResults);

// POST/multiplicationResult/postResult
router.post(
  '/postResult',
  [
    body('score'),
    body('questionCount'),
    body('user')
  ],
  postMultiplicationResult
);

export default router;
