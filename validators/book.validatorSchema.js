// validators\book.validatorSchema.js

const {z} = require("zod")
// ---------------------------- GET validator schema ---------------
// ---------------------------- req.query ----------------------------

exports.getBookValidator = z.object({
    search : z.string().optional(),
    bookId : z.uuid().optional(),
    authorId : z.uuid().optional()
})


// -------------- post create a book -----------------
// const { id, title, description, authorId } = req.body;

exports.createBookValidator = z.object({
   title : z.string({required_error : "Title is required!"}).min(3,{message : "Title can not be less then 3 characters"}),
   description : z.string().optional(),
   authorId : z.uuid({message : "give right ID"})
})

// ------------------------ patch validator schema --------------------------------
//  const { title, description, authorId } = req.body;
//  req.params.id

exports.UpdateBookValidatorId = z.object({
      id : z.uuid({message : "insert the right Id"})
})

// ------------------ req.body -----------------
exports.UpdateBookValidatorBody = z.object({
    title : z.string().optional(),
    description : z.string().optional(),
    authorId : z.uuid().optional()
})




exports.deleteBookValidatorId = z.object({
      id : z.uuid()
})
