# Uber Clone Frontend

**Live demo:** https://uber-three-pink.vercel.app  
**Backend API:** https://uber-j1yb.onrender.com

React and Vite frontend for a ride-booking application. Users can sign up, log in, search pickup/drop locations, view fare options, request rides, and track ride status. Captains can sign up, log in, share live location, accept ride requests, start rides with OTP, and finish rides.

## Tech Stack

- React 19 with Vite
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS
- GSAP
- Leaflet and React Leaflet
- Remix Icon and lucide-react

## Local Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:3000
```

For production, point `VITE_BASE_URL` to the deployed backend API.

## Application Structure

```text
frontend/
  src/
    App.jsx                  # Frontend route definitions
    main.jsx                 # React app bootstrap
    pages/                   # Route-level screens
    components/              # Reusable ride, map, and UI components
    contexts/                # User, captain, and socket context providers
  vite.config.js             # Vite config
  eslint.config.js           # ESLint config
```

## Frontend Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Start screen. |
| `/login` | Public | User login. |
| `/signup` | Public | User signup. |
| `/home` | User | User home and ride booking flow. |
| `/user/logout` | User | Logs out the current user. |
| `/riding` | User | Active user ride screen. |
| `/captain-login` | Public | Captain login. |
| `/captain-signup` | Public | Captain signup. |
| `/captain-home` | Captain | Captain dashboard and ride request flow. |
| `/captain-riding` | Captain | Active captain ride screen. |

## How This Application Is Created

This project is built as a MERN-style ride-booking app:

1. The frontend is created with Vite and React.
2. `App.jsx` defines the browser routes for users and captains.
3. Auth wrapper pages protect private screens by checking stored user/captain data and tokens.
4. Context providers keep user, captain, and socket state available across the app.
5. Axios calls use `VITE_BASE_URL` to talk to the Express backend.
6. Socket.IO connects the frontend to realtime backend events for ride matching, captain location updates, and ride status changes.
7. The backend stores users, captains, ride data, and geospatial captain locations in MongoDB.
8. OpenRouteService powers map suggestions, geocoding, distance calculation, and fare estimation.

## Backend API Endpoints

Base URL:

```text
https://uber-j1yb.onrender.com
```

Local backend URL:

```text
http://localhost:3000
```

Protected endpoints accept either `Authorization: Bearer <token>` or a `token` cookie.

### Root

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | No | Health/root response. Returns `Hello World`. |

### Users

| Method | Route | Auth | Body / Query | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/users/register` | No | `{ fullname: { firstname, lastname }, email, password }` | Register user and return `{ token, user }`. |
| `POST` | `/users/login` | No | `{ email, password }` | Login user, set token cookie, and return `{ token, user }`. |
| `GET` | `/users/profile` | User | None | Return authenticated user profile. |
| `GET` | `/users/logout` | User | None | Logout user and blacklist token. |

User validation:

- `email`: valid email
- `fullname.firstname`: minimum 3 characters
- `password`: minimum 6 characters

### Captains

| Method | Route | Auth | Body / Query | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/captains/register` | No | `{ fullname, email, password, vehicle }` | Register captain and return `{ token, captain }`. |
| `POST` | `/captains/login` | No | `{ email, password }` | Login captain, set token cookie, and return `{ token, captain }`. |
| `GET` | `/captains/profile` | Captain | None | Return authenticated captain profile. |
| `GET` | `/captains/logout` | Captain | None | Logout captain and blacklist token. |

Captain register body:

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

Captain validation:

- `vehicle.vehicleType`: one of `car`, `motorcycle`, `auto`
- `vehicle.capacity`: integer, minimum 1
- `vehicle.color` and `vehicle.plate`: minimum 3 characters

### Maps

All maps routes require user authentication.

| Method | Route | Auth | Query | Description |
| --- | --- | --- | --- | --- |
| `GET` | `/maps/get-coordinates` | User | `address=<address>` | Get coordinates for an address. |
| `GET` | `/maps/get-distance-time` | User | `origin=<origin>&destination=<destination>` | Get route distance between two addresses. |
| `GET` | `/maps/get-suggestions` | User | `input=<text>` | Get autocomplete location suggestions. |

Example coordinate response:

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

Example distance response:

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

Example suggestions response:

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

### Rides

| Method | Route | Auth | Body / Query | Description |
| --- | --- | --- | --- | --- |
| `POST` | `/rides/create` | User | `{ pickup, destination, vehicleType }` | Create a ride request. |
| `GET` | `/rides/get-fare` | User | `pickup=<pickup>&destination=<destination>` | Get fare estimates. |
| `POST` | `/rides/confirm` | Captain | `{ rideId }` | Captain accepts ride. |
| `GET` | `/rides/start-ride` | Captain | `rideId=<rideId>&otp=<otp>` | Start accepted ride with OTP. |
| `POST` | `/rides/end-ride` | Captain | `{ rideId }` | Complete an ongoing ride. |

Create ride body:

```json
{
  "pickup": "Connaught Place, Delhi",
  "destination": "India Gate, Delhi",
  "vehicleType": "car"
}
```

Fare response:

```json
{
  "auto": 75,
  "car": 118,
  "motorcycle": 55
}
```

Ride lifecycle:

```text
pending -> accepted -> ongoing -> completed
```

## Socket.IO Events

### Client to Server

| Event | Payload | Description |
| --- | --- | --- |
| `join` | `{ userId, userType }` | Registers the socket id for a user or captain. |
| `update-location-captain` | `{ userId, location: { lat, lon } }` | Updates captain location for nearby ride matching. |

### Server to Client

| Event | Receiver | Description |
| --- | --- | --- |
| `new-ride` | Nearby captains | New ride request is available. |
| `ride-confirmed` | User | Captain accepted the ride. |
| `ride-started` | User | Ride started after OTP verification. |
| `ride-ended` | User | Ride completed. |

## Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # create production build
npm run preview   # preview production build
npm run lint      # run ESLint
```
