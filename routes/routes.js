const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const bookController = require('../controller/bookController');

router.get("/", (req, res) => {
    return res.json({ message: "Welcome to the bookstore API" });
})

router.post("/add_user", userController.registerUser);
router.get("/users/:id_user?", userController.getUsers);
router.post("/login", userController.verifyLogin);

router.post("/add_book", userController.verifyToken, bookController.registerBook);
router.get("/books/:id_book?", bookController.getBooks);

module.exports = router;