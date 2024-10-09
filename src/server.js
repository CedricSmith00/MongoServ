require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
app.use(express.json());

const Book = require("./db/models/bookmodel");

// Get a single book
app.get("/getSingleBook", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required"});
        }
        
        const book = await Book.findOne({title: title});

        if (!book) {
            return res.status(404).json({message: `${title} not found`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occured", error: error.message});
    }
});

// Delete a book
app.delete("/deleteBook", async (req, res) => {
    try {
        const { title } = req.body; 

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Delete the book with the specified title
        const result = await Book.deleteOne({ title: title });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `${title} not found` });
        }

        // Success response
        res.status(200).json({ message: `${title} has been deleted` });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Could not delete",
            DBresponse: error.message
        });
    }
});

// Update genre
app.put("/updateGenre", async (req, res) => {
    try {
        const {title, newGenre } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required"});
        }

        if (!newGenre) {
            return res.status(400).json({message: "New genre is required"});
        }

        const result = await Book.updateOne(
            {title: title },
            {genre: newGenre}
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({message: `${title} not found or genre is the same`});
        }

        res.status(200).json({message: `Genre updated to ${newGenre} for ${title}`});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Could not update genre",
            DBresponse: error.message
        })
    }
});
        
       

// Update author
app.put("/updateAuthor", async (req, res) => {
    try {
        const {title, newAuthor } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required"});
        }

        if (!newAuthor) {
            return res.status(400).json({message: "New author is required"});
        }

        const result = await Book.updateOne(
            {title: title },
            {author: newAuthor}
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({message: `${title} not found or author is the same`});
        }

        res.status(200).json({message: `Author updated to ${newAuthor} for ${title}`});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Could not update author",
            DBresponse: error.message
        })
    }
});

// List all books
app.get("/listBooks", async (req, res) => {
    try {
        const books = await Book.find({}); // Retrieve all books from the database
        res.status(200).json(books); // Send the list of books as a JSON response
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            message: "Unable to retrieve book list" // Send an error message if something goes wrong
        });
    }
});

// Add a new book
app.post("/addBook", async (req, res) => {
    try {
        const result = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre
        });
        console.log(result); 
        res.status(201).json({
            message: `Book '${req.body.title}' has been added`
        });
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            message: `Book '${req.body.title}' was not added`,
            DBresponse: error.message
        });
    }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
