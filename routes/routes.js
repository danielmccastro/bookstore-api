const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const bookController = require('../controller/bookController');
const authenticate = require('../middleware/authMiddleware');

router.get("/", (req, res) => {
    return res.json({ message: "Welcome to the bookstore API" });
})

router.post("/users", userController.registerUser);
router.put("/users/:id_user", authenticate, userController.updateUser);
router.delete("/users/:id_user", authenticate, userController.deleteUser);
router.get("/users/:id_user?", authenticate, userController.getUsers);
router.post("/login", userController.verifyLogin);

router.post("/books", authenticate, bookController.registerBook);
router.put("/books/:id_book", authenticate, bookController.updateBook);
router.delete("/books/:id_book", authenticate, bookController.deleteBook);
router.get("/books/:id_book?", bookController.getBooks);

module.exports = router;