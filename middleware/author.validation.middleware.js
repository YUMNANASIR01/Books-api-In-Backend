const {getAuthorValidate, createAuthorValidate, updateAuthorValidate, deleteAuthorValidate} = require ("../validators/aurthor.validatorSchema")

exports.getAuthorValidateMiddleware = (req , res, next) =>{
  try{
        //   const { search, id } = req.query;
        getAuthorValidate.parse(req.query)
    
        next()
  } catch(error){
    return res.status(400).json({
        Message : "Validation failed",
        error : error.issues
    })
  }
}

// ---------------------------------------------
exports.createAuthorValidateMiddleware = (req , res, next) =>{
  try{
        createAuthorValidate.parse(req.body)
        next()
  } catch(error){
    return res.status(400).json({
        Message : "Validation failed",
        error : error.issues
    })
  }
}



// ----------------------- update data ------------------------
exports.updateAuthorValidateMiddleware = (req,res, next) =>{
   try{
     updateAuthorValidate.parse(req.params);
     updateAuthorValidate.parse(req.body);
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

// ---------------------- update data -----------------
exports.deleteAuthorValidateMiddleware= (req,res, next) =>{
   try{
     deleteAuthorValidate.parse(req.params)
     next()
   }
   catch (error){
      res.status(400).json({
        Message : "Validation failed",
        error : error.issues
      })
   }
}

 