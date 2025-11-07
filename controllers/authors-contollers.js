const db = require('../db/connection');
const authorTable = require('../models/author.model');
const booksTable = require('../models/book.model');
const { sql, ilike, or ,eq} = require('drizzle-orm');


exports.getAllAuthors = async (req, res) => {
  const { search, id } = req.query;

try{
    let query = db.select().from(authorTable);

   if (id) {
    query =  query.where(eq(authorTable.id, id));
   }
   else if (search) {
    query = query.where(
        or(
          ilike(authorTable.FirstName, `%${search}%`),
          ilike(authorTable.LastName, `%${search}%`),
          ilike(authorTable.email, `%${search}%`),
          ilike(sql`CAST(${authorTable.age} AS varchar)`, `%${search}%`)
        )
      );
  }

const result = await query 
    res.status(200).json({
        success: true,
        message: "Authors retrieved successfully",
        data: result
    });
}
catch(error){
    res.status(500).json({
        success: false,
        message: "Error retrieving authors",
        error: error.message
    });
}

}

exports.createAuthor = async (req, res) => {
  try {
    const { FirstName, LastName, email, age } = req.body;

    // ------------ validation ----------------
    if (!FirstName || !email || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields (FirstName, email, age) are required.",
      });
    }

    // ------------ insert author ----------------
    db.insert(authorTable)
      .values({ FirstName, LastName, email, age })
      .returning()
      .then((data) => {
        res.status(201).json({
          success: true,
          message: "Author created successfully",
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Error creating author",
          error: error.message,
        });
      });
  } catch (error) {
    // ------------ outer try/catch ----------------
    res.status(500).json({
      success: false,
      message: "Error creating author",
      error: error.message,
    });
  }
};

exports.updateAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, email, age } = req.body;

    // -------- Build update object with only provided fields --------
    const updateData = {};
    if (FirstName !== undefined) updateData.FirstName = FirstName;
    if (LastName !== undefined) updateData.LastName = LastName;
    if (email !== undefined) updateData.email = email;
    if (age !== undefined) updateData.age = age;

    // -------- Check if there's anything to update --------
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update!",
      });
    }

    // -------- Perform update --------
    const result = await db
      .update(authorTable)
      .set(updateData)
      .where(eq(authorTable.id, id))
      .returning();

    // -------- If author not found --------
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Author not found!",
      });
    }

    // -------- Success response --------
    res.status(200).json({
      success: true,
      message: "Author updated successfully",
      data: result,
    });

  } catch (error) {
    console.error("❌ Error updating author:", error);
    res.status(500).json({
      success: false,
      message: "Error updating author",
      error: error.message,
    });
  }
};


exports.deleteAuthorById = async (req, res) => {
    const {id} = req.params


    // Delete all books associated with the author first
    await db.delete(booksTable).where(eq(booksTable.authorId, id));

    const result = await db.delete(authorTable).where(eq(authorTable.id, id)).returning()

    return res.status(200).json({message : "Author deleted! ", result: result})
    }


