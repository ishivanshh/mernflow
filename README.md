# Uber Backend API

Node.js / Express backend for user management.

## Base URL

```
http://localhost:3000
```

Default port is `3000` (configurable via `PORT` in `.env`).

---

## User Registration

Register a new user account. On success, the API creates the user in the database, hashes the password, and returns a JWT auth token.

### Endpoint

```
POST /users/register
```

### Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

Send a JSON object with the following fields:

| Field                 | Type   | Required | Validation |
|-----------------------|--------|----------|------------|
| `email`               | string | Yes      | Must be a valid email address |
| `password`            | string | Yes      | Minimum 6 characters |
| `fullname.firstname`  | string | Yes      | Minimum 3 characters |
| `fullname.lastname`   | string | No       | Minimum 3 characters (if provided, enforced by Mongoose schema) |

#### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "secure123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

#### cURL Example

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "secure123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }'
```

---

### Response

#### `201 Created` — Registration successful

User was created and an auth token was generated.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

> **Note:** The `password` field is excluded from the user object in responses (`select: false` on the schema).

#### `400 Bad Request` — Validation failed

Returned when request data fails express-validator checks.

```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "First Name must be more than 3 character long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

Common validation error messages:

| Field                | Message |
|----------------------|---------|
| `email`              | `Invalid Email` |
| `fullname.firstname` | `First Name must be more than 3 character long` |
| `password`           | `Password must be greater than 3 character` |

---

### Flow

1. **Route** (`routes/user.routes.js`) — Validates `email`, `fullname.firstname`, and `password` using express-validator.
2. **Controller** (`controllers/user.controller.js`) — Checks validation results, hashes the password, and calls the service.
3. **Service** (`services/user.services.js`) — Creates the user document in MongoDB.
4. **Model** (`models/user.model.js`) — Defines the user schema, password hashing, and JWT token generation.

---

### Database Schema (User)

| Field               | Type   | Notes |
|---------------------|--------|-------|
| `fullname.firstname`| string | Required, min 3 characters |
| `fullname.lastname` | string | Optional, min 3 characters if set |
| `email`             | string | Required, unique, min 5 characters |
| `password`          | string | Required, hashed with bcrypt (10 rounds), not returned in queries |
| `socketId`          | string | Optional, used for live driver tracking |

---

### Environment Variables

| Variable     | Description |
|--------------|-------------|
| `JWT_SECRET` | Secret key used to sign authentication tokens |
| `PORT`       | Server port (default: `3000`) |
| MongoDB URI  | Database connection string (configured in `db/db.js`) |
