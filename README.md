# Uber Clone Backend API

**Live demo:** https://uber-three-pink.vercel.app  
**Backend API:** https://uber-j1yb.onrender.com

Express, MongoDB, JWT, OpenRouteService, and Socket.IO backend for a ride-booking application with user auth, captain auth, maps, fare calculation, ride lifecycle, and realtime ride events.

## Tech Stack

- Node.js and Express
- MongoDB with Mongoose
- JWT authentication with cookie or bearer-token support
- Socket.IO for realtime user/captain updates
- OpenRouteService for geocoding, autocomplete, and route distance
- bcrypt for password hashing
- express-validator for request validation

## Local Setup

```bash
cd Backend
npm install
npm run dev
```

Create `Backend/.env`:

```env
PORT=3000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTESERVICE_API_KEY=your_openrouteservice_api_key
```

The server defaults to `http://localhost:3000` unless `PORT` is set.

## Application Structure

```text
Backend/
  app.js                    # Express app, middleware, CORS, route mounting
  server.js                 # HTTP server and Socket.IO initialization
  socket.js                 # Socket events and socket message helper
  db/db.js                  # MongoDB connection
  routes/                   # API route definitions and validation
  controllers/              # Request/response handlers
  services/                 # Business logic and external API calls
  models/                   # Mongoose schemas and model methods
  middlewares/              # JWT auth middleware
```

## How This Application Is Created

This app follows a common MERN backend structure:

1. `server.js` creates the HTTP server and starts Socket.IO.
2. `app.js` configures Express middleware, CORS, cookies, JSON parsing, database connection, and mounted route groups.
3. `routes/*` files define endpoint paths and validate request fields.
4. `middlewares/auth.middleware.js` protects private routes by verifying JWT tokens from `Authorization: Bearer <token>` or the `token` cookie.
5. `controllers/*` files handle HTTP responses and call service functions.
6. `services/*` files contain reusable logic such as user creation, fare calculation, geocoding, and ride status changes.
7. `models/*` files define MongoDB collections for users, captains, rides, and blacklisted tokens.
8. `socket.js` connects browser clients to the server for captain location updates and realtime ride notifications.

## Authentication

Protected routes accept either:

```http
Authorization: Bearer <jwt>
```

or a cookie:

```http
Cookie: token=<jwt>
```

Login routes set the `token` cookie. Logout routes blacklist the current token.

## API Routes

### Root

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | No | Health/root response. Returns `Hello World`. |

### Users

Base route: `/users`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/users/register` | No | Register a new user. |
| `POST` | `/users/login` | No | Login an existing user. |
| `GET` | `/users/profile` | User | Return the authenticated user profile. |
| `GET` | `/users/logout` | User | Logout user and blacklist token. |

#### `POST /users/register`

Request body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "secret123"
}
```

Validation:

| Field | Rule |
| --- | --- |
| `email` | Valid email |
| `fullname.firstname` | Minimum 3 characters |
| `password` | Minimum 6 characters |

Responses:

- `201` `{ "token": "...", "user": {...} }`
- `400` `{ "errors": [...] }`
- `409` `"User with this email address already exists"`

#### `POST /users/login`

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Responses:

- `200` `{ "token": "...", "user": {...} }`
- `400` `{ "errors": [...] }`
- `401` `{ "message": " Invalid email or password" }`

#### `GET /users/profile`

Returns the authenticated user object.

Responses:

- `200` user object
- `401` unauthorized

#### `GET /users/logout`

Responses:

- `200` `{ "message": "Logged Out!" }`
- `401` `{ "message": "Unauthorized" }`

### Captains

Base route: `/captains`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/captains/register` | No | Register a captain/driver. |
| `POST` | `/captains/login` | No | Login a captain. |
| `GET` | `/captains/profile` | Captain | Return authenticated captain profile. |
| `GET` | `/captains/logout` | Captain | Logout captain and blacklist token. |

#### `POST /captains/register`

Request body:

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Driver"
  },
  "email": "alex@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "DL01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

Validation:

| Field | Rule |
| --- | --- |
| `email` | Valid email |
| `fullname.firstname` | Minimum 3 characters |
| `password` | Minimum 6 characters |
| `vehicle.color` | Minimum 3 characters |
| `vehicle.plate` | Minimum 3 characters |
| `vehicle.capacity` | Integer, minimum 1 |
| `vehicle.vehicleType` | One of `car`, `motorcycle`, `auto` |

Responses:

- `201` `{ "token": "...", "captain": {...} }`
- `400` `{ "errors": [...] }`
- `409` `"Captain with this email address already exists"`

#### `POST /captains/login`

Request body:

```json
{
  "email": "alex@example.com",
  "password": "secret123"
}
```

Responses:

- `200` `{ "token": "...", "captain": {...} }`
- `400` `{ "errors": [...] }`
- `401` `{ "message": " Invalid email or password" }`

#### `GET /captains/profile`

Returns the authenticated captain object.

Responses:

- `200` captain object
- `401` unauthorized

#### `GET /captains/logout`

Responses:

- `200` `{ "message": "logout successfully!!" }`
- `401` `{ "message": "Unauthorized" }`

### Maps

Base route: `/maps`  
All maps routes require user authentication.

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/maps/get-coordinates?address=<address>` | User | Convert address text to coordinates. |
| `GET` | `/maps/get-distance-time?origin=<origin>&destination=<destination>` | User | Calculate route distance between two addresses. |
| `GET` | `/maps/get-suggestions?input=<text>` | User | Return autocomplete location suggestions. |

#### `GET /maps/get-coordinates`

Query params:

| Param | Rule |
| --- | --- |
| `address` | String, minimum 3 characters |

Response:

```json
{
  "success": true,
  "coordinates": {
    "lat": 28.6139,
    "lon": 77.209,
    "display_name": "New Delhi, India"
  }
}
```

#### `GET /maps/get-distance-time`

Query params:

| Param | Rule |
| --- | --- |
| `origin` | String, minimum 3 characters |
| `destination` | String, minimum 3 characters |

Response:

```json
{
  "origin": {
    "lat": 28.6139,
    "lon": 77.209,
    "display_name": "New Delhi, India"
  },
  "destination": {
    "lat": 28.4595,
    "lon": 77.0266,
    "display_name": "Gurugram, Haryana, India"
  },
  "distanceInMeters": 32000,
  "distanceInKm": 32
}
```

#### `GET /maps/get-suggestions`

Query params:

| Param | Rule |
| --- | --- |
| `input` | String, minimum 2 characters |

Response:

```json
{
  "success": true,
  "data": [
    {
      "name": "Connaught Place, New Delhi, India",
      "lat": 28.6315,
      "lon": 77.2167
    }
  ]
}
```

Maps error responses:

- `400` `{ "success": false, "errors": [...] }`
- `500` `{ "success": false, "message": "..." }`

### Rides

Base route: `/rides`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/rides/create` | User | Create a ride request. |
| `GET` | `/rides/get-fare?pickup=<pickup>&destination=<destination>` | User | Get fare estimates for available vehicle types. |
| `POST` | `/rides/confirm` | Captain | Captain accepts a ride. |
| `GET` | `/rides/start-ride?rideId=<rideId>&otp=<otp>` | Captain | Start an accepted ride using OTP. |
| `POST` | `/rides/end-ride` | Captain | End an ongoing ride. |

#### `POST /rides/create`

Request body:

```json
{
  "pickup": "Connaught Place, Delhi",
  "destination": "India Gate, Delhi",
  "vehicleType": "car"
}
```

Validation:

| Field | Rule |
| --- | --- |
| `pickup` | String, minimum 3 characters |
| `destination` | String, minimum 3 characters |
| `vehicleType` | One of `auto`, `car`, `motorcycle` |

Response:

```json
{
  "ride": {
    "_id": "...",
    "user": "...",
    "pickup": "Connaught Place, Delhi",
    "destination": "India Gate, Delhi",
    "fare": 120,
    "status": "pending"
  },
  "pickupCoordinates": {
    "lat": 28.6315,
    "lon": 77.2167,
    "display_name": "Connaught Place, New Delhi, India"
  },
  "captainsInRadius": []
}
```

When created, nearby captains receive a Socket.IO `new-ride` event.

#### `GET /rides/get-fare`

Query params:

| Param | Rule |
| --- | --- |
| `pickup` | String, minimum 3 characters |
| `destination` | String, minimum 3 characters |

Response:

```json
{
  "auto": 75,
  "car": 118,
  "motorcycle": 55
}
```

Current fare formula:

- `auto`: base `30` plus `10` per km
- `car`: base `50` plus `15` per km
- `motorcycle`: base `20` plus `8` per km

#### `POST /rides/confirm`

Request body:

```json
{
  "rideId": "665f1a2b3c4d5e6f7a8b9c0d"
}
```

Response:

- `200` ride object with `status: "accepted"` and populated `user`/`captain`
- Sends `ride-confirmed` Socket.IO event to the user

#### `GET /rides/start-ride`

Query params:

| Param | Rule |
| --- | --- |
| `rideId` | Valid MongoDB ObjectId |
| `otp` | 4-character string |

Response:

- `200` ride object with `status: "ongoing"`
- Sends `ride-started` Socket.IO event to the user

#### `POST /rides/end-ride`

Request body:

```json
{
  "rideId": "665f1a2b3c4d5e6f7a8b9c0d"
}
```

Response:

- `200` ride object
- Updates status to `completed`
- Sends `ride-ended` Socket.IO event to the user

## Socket.IO Events

### Client to Server

| Event | Payload | Description |
| --- | --- | --- |
| `join` | `{ "userId": "...", "userType": "user" }` or `{ "userId": "...", "userType": "captain" }` | Saves the connected socket id on user/captain profile. |
| `update-location-captain` | `{ "userId": "...", "location": { "lat": 28.6, "lon": 77.2 } }` | Updates captain geolocation for nearby ride matching. |

### Server to Client

| Event | Receiver | Description |
| --- | --- | --- |
| `new-ride` | Nearby captains | Sent when a user creates a ride. |
| `ride-confirmed` | User | Sent when a captain confirms the ride. |
| `ride-started` | User | Sent when the captain starts the ride with OTP. |
| `ride-ended` | User | Sent when the ride is completed. |

## Scripts

```bash
npm run dev      # start with nodemon
npm start        # start with node
npm test         # placeholder test script
```
