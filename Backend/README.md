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

## User Login

Authenticate an existing user with email and password. On success, the API verifies credentials and returns a JWT auth token.

### Endpoint

```
POST /users/login
```

### Headers

| Header         | Value              | Required |
|----------------|--------------------|----------|
| `Content-Type` | `application/json` | Yes      |

### Request Body

Send a JSON object with the following fields:

| Field      | Type   | Required | Validation |
|------------|--------|----------|------------|
| `email`    | string | Yes      | Must be a valid email address |
| `password` | string | Yes      | Minimum 6 characters |

#### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "secure123"
}
```

#### cURL Example

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "secure123"
  }'
```

---

### Response

#### `200 OK` — Login successful

Credentials were valid and an auth token was generated.

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
      "value": "bad-email",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

Common validation error messages:

| Field      | Message |
|------------|---------|
| `email`    | `Invalid Email` |
| `password` | `Password must be greater than 3 character` |

#### `401 Unauthorized` — Invalid credentials

Returned when no user exists with the given email, or the password does not match.

```json
{
  "message": " Invalid email or password"
}
```

---

### Flow

1. **Route** (`routes/user.routes.js`) — Validates `email` and `password` using express-validator.
2. **Controller** (`controllers/user.controller.js`) — Checks validation results, finds the user by email (including password via `select("+password")`), compares the password with bcrypt, and generates a token.
3. **Model** (`models/user.model.js`) — Provides `comparePassword` and `generateAuthToken` methods.

---

## Get User Profile

Fetch the authenticated user's profile. This route requires a valid JWT token, which is usually sent as the `token` cookie after login or registration.

### Endpoint

```
GET /users/profile
```

### Authentication

| Header / Cookie | Value | Required |
|-----------------|-------|----------|
| `Cookie`        | `token=<jwt>` | Yes |
| `Authorization` | `Bearer <jwt>` | Yes, if not using cookies |

### cURL Example

```bash
curl -X GET http://localhost:3000/users/profile \
  --cookie "token=YOUR_JWT_TOKEN"
```

Or with a bearer token:

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response

#### `200 OK` — Profile fetched successfully

```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

#### `401 Unauthorized` — Missing or invalid token

```json
{
  "message": "Unauthorized"
}
```

---

## User Logout

Log out the currently authenticated user. The token is cleared from the cookie and added to the blacklist so it cannot be reused.

### Endpoint

```
GET /users/logout
```

### Authentication

| Header / Cookie | Value | Required |
|-----------------|-------|----------|
| `Cookie`        | `token=<jwt>` | Yes |
| `Authorization` | `Bearer <jwt>` | Yes, if not using cookies |

### cURL Example

```bash
curl -X GET http://localhost:3000/users/logout \
  --cookie "token=YOUR_JWT_TOKEN"
```

Or with a bearer token:

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Response

#### `200 OK` — Logout successful

```json
{
  "message": "Logged Out!"
}
```

#### `401 Unauthorized` — Missing or invalid token

```json
{
  "message": "Unauthorized"
}
```

---

## Captain API

Captain routes are mounted under `/captains` and follow the same JWT flow as the user routes. Register and login return a token, while profile and logout require an authenticated captain token.

### Base Routes

| Route | Method | Auth Required | Description |
|-------|--------|---------------|-------------|
| `/captains/register` | `POST` | No | Create a new captain account |
| `/captains/login` | `POST` | No | Authenticate an existing captain |
| `/captains/profile` | `GET` | Yes | Fetch the logged-in captain profile |
| `/captains/logout` | `GET` | Yes | Blacklist the current token and clear the auth cookie |

### Captain Register

Create a new captain account with personal details and vehicle information.

#### Endpoint

```http
POST /captains/register
```

#### Request Body

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `fullname.firstname` | string | Yes | Minimum 3 characters |
| `fullname.lastname` | string | No | Optional |
| `email` | string | Yes | Must be a valid email address |
| `password` | string | Yes | Minimum 6 characters |
| `vehicle.color` | string | Yes | Minimum 3 characters |
| `vehicle.plate` | string | Yes | Minimum 3 characters |
| `vehicle.capacity` | number | Yes | Integer, minimum 3 |
| `vehicle.vehicleType` | string | Yes | Must be one of `car`, `motorcycle`, `auto` |

#### Example Request

```json
{
  "fullname": {
    "firstname": "Aman",
    "lastname": "Sharma"
  },
  "email": "aman@example.com",
  "password": "secure123",
  "vehicle": {
    "color": "White",
    "plate": "MH12AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response

##### `201 Created` — Registration successful

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0e",
    "fullname": {
      "firstname": "Aman",
      "lastname": "Sharma"
    },
    "email": "aman@example.com",
    "vehicle": {
      "color": "White",
      "plate": "MH12AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

##### `400 Bad Request` — Validation failed

Returned when the request body fails express-validator checks.

##### `409 Conflict` — Captain already exists

Returned when another captain already uses the same email address.

### Captain Login

Authenticate an existing captain with email and password. On success, the token is returned in the JSON response and also stored in a `token` cookie.

#### Endpoint

```http
POST /captains/login
```

#### Request Body

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | string | Yes | Must be a valid email address |
| `password` | string | Yes | Minimum 6 characters |

#### Example Request

```json
{
  "email": "aman@example.com",
  "password": "secure123"
}
```

#### Response

##### `200 OK` — Login successful

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0e",
    "fullname": {
      "firstname": "Aman",
      "lastname": "Sharma"
    },
    "email": "aman@example.com"
  }
}
```

##### `400 Bad Request` — Validation failed

##### `401 Unauthorized` — Invalid credentials

Returned when the email does not exist or the password does not match.

### Captain Profile

Fetch the authenticated captain profile.

#### Endpoint

```http
GET /captains/profile
```

#### Authentication

| Header / Cookie | Value | Required |
|-----------------|-------|----------|
| `Cookie` | `token=<jwt>` | Yes |
| `Authorization` | `Bearer <jwt>` | Yes, if not using cookies |

#### Example Request

```bash
curl -X GET http://localhost:3000/captains/profile \
  --cookie "token=YOUR_JWT_TOKEN"
```

Or with a bearer token:

```bash
curl -X GET http://localhost:3000/captains/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response

##### `200 OK` — Profile fetched successfully

```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0e",
  "fullname": {
    "firstname": "Aman",
    "lastname": "Sharma"
  },
  "email": "aman@example.com",
  "vehicle": {
    "color": "White",
    "plate": "MH12AB1234",
    "capacity": 4,
    "vehicleType": "car"
  },
  "status": "inactive"
}
```

##### `401 Unauthorized` — Missing or invalid token

### Captain Logout

Log out the currently authenticated captain. The token is cleared from the cookie and added to the blacklist so it cannot be reused.

#### Endpoint

```http
GET /captains/logout
```

#### Authentication

| Header / Cookie | Value | Required |
|-----------------|-------|----------|
| `Cookie` | `token=<jwt>` | Yes |
| `Authorization` | `Bearer <jwt>` | Yes, if not using cookies |

#### Example Request

```bash
curl -X GET http://localhost:3000/captains/logout \
  --cookie "token=YOUR_JWT_TOKEN"
```

Or with a bearer token:

```bash
curl -X GET http://localhost:3000/captains/logout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Response

##### `200 OK` — Logout successful

```json
{
  "message": "logout successfully!!"
}
```

##### `401 Unauthorized` — Missing or invalid token

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
