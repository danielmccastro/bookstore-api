const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const bookController = require('../controller/bookController');

router.get("/", (req, res) => {
    return res.json({ message: "Welcome to the bookstore API" });
})

router.post("/add_user", userController.registerUser);
router.put("/update_user/:id_user", userController.verifyToken, userController.updateUser);
router.post("/delete_user/:id_user", userController.verifyToken, userController.deleteUser);
router.get("/users/:id_user?", userController.verifyToken, userController.getUsers);
router.post("/login", userController.verifyLogin);

router.post("/add_book", userController.verifyToken, bookController.registerBook);
router.put("/update_book/:id_book", userController.verifyToken, bookController.updateBook);
router.post("/delete_book/:id_book", userController.verifyToken, bookController.deleteBook);
router.get("/books/:id_book?", bookController.getBooks);

module.exports = router;