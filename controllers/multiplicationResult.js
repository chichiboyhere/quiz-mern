import { validationResult } from "express-validator";
import MultiplicationResult from "../models/multiplicationResult.js";
import  User from "../models/user.js";

export const getMultiplicationResults = async(req, res, next) => {
//  To fetch all the multiplication results associated with a user.
try{
  const userId = await User.findById(req.params.id)
   const multiplicationResults = await MultiplicationResult.find({user: userId}).sort({ createdAt: -1 }).exec()
  //const multiplicationResults = await User.find({multiplicationResults: req.body.user})
  res.status(200).json(multiplicationResults);
}
catch (err) {
  next(err);
}
};


export const postMultiplicationResult = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }
  const score = req.body.score;
  const questionCount = req.body.questionCount;
  let person;
  const multiplicationResult = new MultiplicationResult({
    score: score,
    questionCount: questionCount,
    user: req.body.user
  });
  multiplicationResult
    .save()
    .then(result => {
      return User.findById(req.body.user);
    })
    .then(user => {
      person = user;
      user.multiplicationResults.push(multiplicationResult);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'Multiplication result successfully posted!',
        multiplicationResult:multiplicationResult,
        person: { _id: person._id, name: person.name }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};






