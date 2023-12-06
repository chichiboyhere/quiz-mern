import express from "express";
import { body } from "express-validator";

import {getMultiplicationResults, postMultiplicationResult} from "../controllers/multiplicationResult.js";
//import { verifyUser } from "../utils/verifyToken.js";

import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const router = express.Router();

// GET /multiplicationResults/getResults
router.get('/getResults/:id', verifyUser, getMultiplicationResults);

// POST/multiplicationResult/postResult
router.post(
  '/postResult',
  verifyUser,
  [
    body('score'),
    body('questionCount'),
    body('user')
  ],
  postMultiplicationResult
);

export default router;
