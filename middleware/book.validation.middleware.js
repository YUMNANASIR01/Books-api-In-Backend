// middleware\book.validation.middleware.js
const {getBookValidator,createBookValidator, UpdateBookValidatorId,UpdateBookValidatorBody, deleteBookValidatorId } = require("../validators/book.validatorSchema")

// -------------------- get book middleware -----------------------
exports.getBookValidateMiddleware = (req,res, next) =>{
    // const {search,bookId,authorId} = req.query 
    // schema.parse(req.query)
   try{
     getBookValidator.parse(req.query)
     next()
   }
   catch (error){
      res.status(400).json({
        Message : "Validation failed",
        error : error.issues
      })
   }
}


// ----------------------- create data ------------------------
exports.createBookValidateMiddleware = (req,res, next) =>{
    // const {search,bookId,authorId} = req.query 
    // schema.parse(req.query)
   try{
    // const { id, title, description, authorId } = req.body;
    //  schema parse (req.body)
     createBookValidator.parse(req.body)
     next()
   }
   catch (error){
      res.status(400).json({
        Message : "Validation failed",
        error : error.issues
      })
   }
}

// ----------------------- update data ------------------------
exports.updateBookValidateMiddleware = (req,res, next) =>{
    // const {search,bookId,authorId} = req.query 
    // req.params.id
    // schema.parse(req.query)
   try{
    //  const { title, description, authorId } = req.body;
    //  schema parse (req.body)
     UpdateBookValidatorId.parse(req.params)
     
    //  const { title, description, authorId } = req.body;
     UpdateBookValidatorBody.parse(req.params)
     next()
   }
   catch (error){
      res.status(400).json({
        Message : "Validation failed",
        error : error.issues
      })
   }
}

// deleteBookValidateMiddleware

// ----------------------- update data ------------------------
exports.deleteBookValidateMiddleware= (req,res, next) =>{
    // const {search,bookId,authorId} = req.query 
    // req.params.id
    // schema.parse(req.query)
   try{
    //  const { title, description, authorId } = req.body;
    //  schema parse (req.body)
     deleteBookValidatorId.parse(req.params)
     
     next()
   }
   catch (error){
      res.status(400).json({
        Message : "Validation failed",
        error : error.issues
      })
   }
}