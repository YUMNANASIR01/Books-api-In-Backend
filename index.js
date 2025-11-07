const express = require('express');
const { globalMiddleware } = require('./middleware/global-middle-ware');
const bookRoute = require('./routes/book.route');
const { version } = require('os');
const  authorRoute = require('./routes/author.route');

const app = express();
const port = 8000;

// ---------------- middlewares----------------------
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(globalMiddleware);

// -------------------- health check--------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message : "Book store Api",
    version: "1.0.0",
    endpoints : {
      health : "/health",
      books : "/api/v1/books",
      author : "/api/v1/authors"
    }

  })
})


// -------------------- health check api --------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// ----------------- routes----------------------
app.use("/api/v1/books",bookRoute)
app.use("/api/v1/authors", authorRoute)

// ----------------- listner----------------------
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});