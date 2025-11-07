const {z} = require ("zod")

//  -------------------- get validaion schema ------------------------
// ---------------------- req.query ---------------
exports.getAuthorValidate = z.object({
        //   const { search, id } = req.query;
        search : z.string().optional(),
        id : z.uuid().optional()
})

// -----------------------------------
//  -------------------- createAuthorValidate validaion schema ------------------------
// ---------------------- req.query ---------------
exports.createAuthorValidate = z.object({
    FirstName: z.string({
        required_error: "First name is required"
    }).min(3, {
        message: "First name cannot be less than 3 characters"
    }),
    LastName: z.string().optional(),
    email: z.email({
        message: "Invalid email address"
    }),
    age: z.number().int({
        message: "Age must be an integer"
    })
});

// ---------------------- req.query ---------------
exports.updateAuthorValidate = z.object({
     id : z.uuid({message : "Invalid Id format"}).optional(),
     FirstName: z.string().min(3, {
        message: "First name cannot be less than 3 characters"
    }).optional(),
    LastName: z.string().optional(),
    email: z.email({
        message: "Invalid email address"
    }).optional(),
    age: z.number().int({
        message: "Age must be an integer"
    }).optional()
});

exports.deleteAuthorValidate = z.object({
      id : z.uuid({message : "Invalid Id format"})
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
