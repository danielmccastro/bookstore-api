# Bookstore API

A simple and secure RESTful API for managing users and books. Built with **Node.js**, **Express**, **Sequelize**, **JWT**, and **SQLite**.

---

## Features

- User registration and login with JWT authentication
- Secure CRUD operations for users and books
- Token-based route protection
- HTTPS support using SSL certificates
- Organized structure with RESTful routes

---

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Bcrypt
- JSON Web Token (JWT)

---

## Installation

```bash
git clone https://github.com/danielmccastro/bookstore-api.git
cd bookstore-api
npm install
```

---

## Environment Setup

### Step 1 – Create your `.env` file

Copy the example file and rename it:

```bash
cp .env.example .env
```

---

### Step 2 – Set up SSL certificates for HTTPS

Create a folder called `cert` in the project root:

```bash
mkdir cert
cd cert
```

Then generate your certificate and private key:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.cert -days 365
```

Generates a 2048-bit RSA private key and a self-signed SSL certificate valid for 365 days.

> Use `server.cert` and `server.key` in your HTTPS server configuration.

Back in your project root, you should now have:

```
/cert
  ├── server.cert
  └── server.key
```

---

## Run the API

```bash
npm start
```

The server will be available at:

```
https://localhost:3000/
```

---

## API Endpoints

### Base

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| GET    | `/`      | Welcome message |

---

### Authentication

#### POST `/login`

**Body Parameters:**

```json
{
  "name": "",
  "password": ""
}
```

| Method | Endpoint | Description             |
| ------ | -------- | ----------------------- |
| POST   | `/login` | Login and receive a JWT |

---

### Users

#### POST `/users`

**Body Parameters:**

```json
{
  "name": "",
  "email": "",
  "password": ""
}
```

#### PUT `/users/:id_user`

**Body Parameters:**

```json
{
  "name": "",
  "email": "",
  "password": ""
}
```

| Method | Endpoint           | Auth Required | Description                        |
| ------ | ------------------ | ------------- | ---------------------------------- |
| POST   | `/users`           | ❌            | Register a new user                |
| GET    | `/users/:id_user?` | ✅            | Get all users or one by ID         |
| PUT    | `/users/:id_user`  | ✅            | Update a user (only your own data) |
| DELETE | `/users/:id_user`  | ✅            | Delete a user (only your own data) |

> ⚠️ Users can only update or delete their own data. This is validated by comparing the token's `id_user` with the `:id_user` param.

---

### Books

#### POST `/books`

**Body Parameters:**

```json
{
  "title": "",
  "author": "",
  "genre": "",
  "description": "",
  "price": ""
}
```

#### PUT `/books/:id_book`

**Body Parameters:**

```json
{
  "title": "",
  "author": "",
  "genre": "",
  "description": "",
  "price": ""
}
```

| Method | Endpoint           | Auth Required | Description                |
| ------ | ------------------ | ------------- | -------------------------- |
| POST   | `/books`           | ✅            | Add a new book             |
| GET    | `/books/:id_book?` | ❌            | Get all books or one by ID |
| PUT    | `/books/:id_book`  | ✅            | Update a book by ID        |
| DELETE | `/books/:id_book`  | ✅            | Delete a book by ID        |

---

## Authorization Header

For protected routes, include the token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Example Response

### Success

```json
{
  "message": "Book updated successfully"
}
```

### Error

```json
{
  "error": "User not found"
}
```
