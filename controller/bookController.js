const Book = require('../model/bookModel');

module.exports = class BookController {

    static async registerBook(req, res) {
        try {
            const { title, author, genre, description, price } = req.body;
            const book = await Book.create({ title, author, genre, description, price });
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteBook(req, res) {
        const { id_book } = req.body;
        try {
           const book = await Book.destroy({ where: { id_book } });
           if (!book) {
               return res.status(404).json({ message: 'Book not found' });
           }
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateBook(req, res) {
        const { id_book, title, author, genre, description, price } = req.body;
        try {
            await Book.update({ title, author, genre, description, price }, { where: { id_book } });
            res.json({ message: 'Book updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getBooks(req, res) {
        const { id_book } = req.body;
        try {
            if (id_book) {
                const book = await Book.findOne({ where: { id_book } });
                if (!book) {
                    return res.status(404).json({ error: 'Book not found' });
                }
                res.json(book);
            } else {
                const books = await Book.findAll({ raw: true });
                if (books.length === 0) {
                    return res.json({ message: 'There are no books.' });
                }
                res.json(books);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}