const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const bookController = require('../controller/bookController');
const authenticate = require('../middlware/authMiddleware');

router.get("/", (req, res) => {
    return res.json({ message: "Welcome to the bookstore API" });
})

router.post("/add_user", userController.registerUser);
router.put("/update_user", authenticate, userController.updateUser);
router.delete("/delete_user", authenticate, userController.deleteUser);
router.get("/users/:id_user?", authenticate, userController.getUsers);
router.post("/login", userController.verifyLogin);

router.post("/add_book", authenticate, bookController.registerBook);
router.put("/update_book/", authenticate, bookController.updateBook);
router.delete("/delete_book/", authenticate, bookController.deleteBook);
router.get("/books/:id_book?", bookController.getBooks);

module.exports = router;