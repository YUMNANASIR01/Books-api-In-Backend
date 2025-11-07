const db = require('../db/connection');
const booksTable = require('../models/book.model');
const authorTable = require('../models/author.model');
const { eq } = require('drizzle-orm');
const { sql } = require('drizzle-orm');

// -------------------- Get All Books --------------------
exports.getAllbooks = async (req, res) => {
  try{
   const {search,bookId,authorId} = req.query 
   
    let query = db.select().from(booksTable);

    if (search) {
      // search by title
      query = query.where(sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`);
    }

    if (bookId) {
      // search by book id
      query = query.where(eq(booksTable.id, bookId));
    }

    if (authorId) {
      // search by author Id
      query = query.where(eq(booksTable.authorId, authorId));
    }

    const result = await query;
    return res.status(200).json({message: "Books fetched successfully", data: result});
  } catch (error) {
    console.error("Error fetching books:", error);
    return  res.status(500).json({message: "Error fetching books"});
  }}

// ----------------------- Post a Book (Create API) -----------------------
exports.createBook = async (req, res) => {
  try {
    const { id, title, description, authorId } = req.body;

    // // -------- Basic validation --------
    // if (!title || !description || !authorId) {
    //   return res
    //     .status(400)
    //     .json({ message: "Title, Description, and AuthorId are required!" });
    // }

    // -------- Check if author exists --------
    const authorExists = await db
      .select()
      .from(authorTable) // ✅ use the actual table object, not string 'authorTable'
      .where(eq(authorTable.id, authorId))
      .limit(1);

    if (authorExists.length === 0) {
      return res.status(400).json({ message: "AuthorId does not exist!" });
    }

    // -------- Insert new book --------
    const result = await db
      .insert(booksTable)
      .values({
        id, // optional
        title,
        description,
        authorId,
      })
      .returning();

    console.log("✅ Book created:", result);

    return res
      .status(201)
      .json({ message: "Book created successfully", data: result });
  } catch (error) {
    console.error("❌ Error creating book:", error.message);
    return res.status(500).json({
      message: "Error creating book",
      error: error.message, // ✅ helpful for debugging
    });
  }
};

// exports.createBook = async (req, res) => {
//  try{
//    const { id, title, description, authorId } = req.body 
//   // -------- Basic validation --------
//   if (!title || !description || !authorId ) {
//     return res.status(400).json({ message: "Title, Description and AuthorId are required!" });
//   }

//   const authorExists = await db.select().from('authorTable').where(eq(authorTable.id, authorId)).limit(1);
//   if (authorExists.length == 0) {
//     return res.status(400).json({ message: "AuthorId does not exist!" });
//   }
//   // If an 'id' is provided in the request body, it will be used. 
//   // Otherwise, Drizzle will use the defaultRandom() UUID generation.
//   // Be aware that providing an existing ID will cause a primary key violation if not handled.
//   const result = await db.insert(booksTable).values({
//     id, 
//     title,
//     description,
//     authorId  
//   }).returning();
  
//    return res.status(201).json({message: "Books created successfully", data: result});
//   } 
//   catch (error) {
//     console.error("Error creating book:", error);
//     return res.status(500).json({message: "Error creating book"});
//   }
//  }
// --------------------------- Delete a Book by ID ---------------------------
exports.deleteBookById = async (req, res) => {
  try {
    const deleteId = req.params.id?.trim(); // 🧹 ensure no spaces in UUID

    // -------- Delete query --------
    const result = await db
      .delete(booksTable)
      .where(eq(booksTable.id, deleteId))
      .returning();

    // -------- Check if book existed --------
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Book not found!" });
    }

    console.log("✅ Book deleted:", result[0]);
    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    return res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};


// // --------------------------- delete a book by id ---------------------------
// exports. deleteBookById = async (req, res) => {
//      try{
//       const deleteId = req.params.id;

//       const res = await db.delete(booksTable).where(eq(booksTable.id, deleteId)).returning();

//       if (res.length == 0)
//       {
//         return res.status(404).json({message: "Book not found!"});
//       }
//       return res.status(200).json({message: "Book deleted successfully"});
//      } catch (error) {
   
//     console.error("Error deleting book:", error);
//     return res.status(500).json({message: "Error deleting book"});
//      }
//     }



    // ---------------------- Update a Book by ID -------------------------
exports.updateBookById = async (req, res) => {
  try {
    const updateId = req.params.id?.trim(); // 🧹 Ensure no spaces in the UUID
    const { title, description, authorId } = req.body;

    // -------- Basic validation --------
    if (!updateId) {
      return res.status(400).json({ message: "Book ID is required in URL!" });
    }

    // -------- Build update object with only provided fields --------
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (authorId !== undefined) updateData.authorId = authorId;

    // -------- Check if there's anything to update --------
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update!" });
    }

    // -------- Check if book exists --------
    const existingBook = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, updateId));

    if (existingBook.length === 0) {
      return res.status(404).json({ message: "Book not found in database!" });
    }

    // -------- Perform the update --------
    const result = await db
      .update(booksTable)
      .set(updateData)
      .where(eq(booksTable.id, updateId))
      .returning({
        id: booksTable.id,
        title: booksTable.title,
        description: booksTable.description,
        authorId: booksTable.authorId,
      });

    // -------- Handle no updated row (rare case) --------
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Book not found or not updated!" });
    }

    console.log("✅ Book updated successfully:", result[0]);

    return res.status(200).json({
      message: "Book updated successfully!",
      book: result[0],
    });
  } catch (error) {
    console.error("❌ Error updating book:", error);
    return res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
};


//   // ---------------------- update a book by id -------------------------
// exports.updateBookById = async (req, res) => {
// try{
//       const updateId = req.params.id
//     const { title, description, authorId } = req.body
//     // Build update object with only provided fields
//     const updateData = {}
//     if (title !== undefined) updateData.title = title
//     if (description !== undefined) updateData.description = description
//     if (authorId !== undefined) updateData.authorId = authorId
    
//     // Check if there's anything to update
//     if (Object.keys(updateData).length === 0) {
//         return res.status(400).json({ message: "No fields to update!" })
//     }
    
//     const result = await db
//         .update(booksTable)
//         .set(updateData)
//         .where(eq(booksTable.id, updateId))
//         .returning({
//             id: booksTable.id,
//             title: booksTable.title,
//             description: booksTable.description,
//             authorId: booksTable.authorId
//         })
    
//     if (!result || result.length === 0) {
//         return res.status(404).json({ message: "Book not found!" })
//     }
    
//     res.json({ message: "Book updated successfully!", book: result[0] })
// } catch (error) {
//     console.error("Error updating book:", error)
//     return res.status(500).json({ message: "Error updating book" })
// }
// }