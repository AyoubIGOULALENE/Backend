import { stack } from "../routes/auth";


const notfound = (req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);  // Pass the error to the next middleware (error handler)
  }






const errorhandler = (err,req,res,next) => {
const statuscode = res.statusCode === 200 ? 500 : res.statusCode;

res.status(statuscode).json({
    message:err.message,
    stack: process.env.NODE_ENV === "producation" ? null :err.stack,
})
}

module.exports = {notfound,errorhandler}