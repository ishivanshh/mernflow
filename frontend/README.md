# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration


## Backend API Endpoints

The backend server exposes the following endpoints. The server base URL is the backend `VITE_BASE_URL` in the frontend env (defaults to `http://localhost:3000`). Most endpoints require authentication via a `Authorization: Bearer <token>` header or the `token` cookie.

- **GET /**
	- Description: Health/root
	- Response: 200 text `Hello World`

- **Users** (`/users`)
	- `POST /users/register`
		- Body: `{ fullname: { firstname, lastname }, email, password }`
		- Responses:
			- `201` `{ token, user }` (created)
			- `400` `{ errors: [...] }` (validation errors)
			- `409` `"User with this email address already exists"`

	- `POST /users/login`
		- Body: `{ email, password }`
		- Responses:
			- `200` `{ token, user }` (also sets `token` cookie)
			- `400` `{ errors: [...] }` (validation errors)
			- `401` `{ message: "Invalid email or password" }`

	- `GET /users/profile` (requires auth)
		- Response: `200` returns the authenticated `user` object
		- `401` when token missing/invalid

	- `GET /users/logout` (requires auth)
		- Response: `200` `{ message: "Logged Out!" }`
		- `401` when token missing

- **Captains** (`/captains`) — same structure as users but for drivers/captains
	- `POST /captains/register`
		- Body: `{ fullname: { firstname, lastname }, email, password, vehicle: { color, plate, capacity, vehicleType } }`
		- Responses: `201` `{ token, captain }`, `400` validation, `409` already exists

	- `POST /captains/login`
		- Body: `{ email, password }`
		- Responses: `200` `{ token, captain }`, `400`, `401`

	- `GET /captains/profile` (requires auth)
		- `200` returns `captain` object
	- `GET /captains/logout` (requires auth)
		- `200` `{ message: "logout successfully!!" }`

- **Maps** (`/maps`) — requires auth
	- `GET /maps/get-coordinates?address=<address>`
		- Response `200` `{ success: true, coordinates: { lat, lon, display_name } }`
		- `400` validation errors, `500` on external API failure

	- `GET /maps/get-distance-time?origin=<orig>&destination=<dest>`
		- Response `200` returns an object containing `origin`, `destination`, `distanceInMeters`, `distanceInKm` (e.g. `{ origin: {...}, destination: {...}, distanceInMeters: 1234, distanceInKm: 1.23 }`)
		- `400` validation errors, `500` on external API failure

	- `GET /maps/get-suggestions?input=<text>`
		- Response `200` `{ success: true, data: [ { name, lat, lon }, ... ] }`
		- `400` validation errors, `500` on external API failure

- **Rides** (`/rides`) — requires auth
	- `POST /rides/create`
		- Body: `{ pickup, destination, vehicleType }` (`vehicleType` must be one of `auto`, `car`, `motorcycle`)
		- Responses:
			- `201` returns the created `ride` object, for example:
				```json
				{
					"_id": "...",
					"user": "<userId>",
					"captain": null,
					"pickup": "Pickup address",
					"destination": "Destination address",
					"fare": 120,
					"status": "pending",
					"duration": null,
					"distance": null,
					"paymentId": null,
					"orderId": null,
					"signature": null
				}
				```
			- `400` validation errors or `{ message: "..." }` for service errors

	- `GET /rides/get-fare?pickup=<pickup>&destination=<destination>`
		- Response `201` (note: controller returns 201) with fare estimates object, e.g. `{ "auto": 30, "car": 50, "motorcycle": 20 }`
		- `400` validation errors or `400`/`500` for errors

Authentication
- Supply auth token either via `Authorization: Bearer <token>` header or the `token` cookie. Protected routes return `401` for missing/invalid tokens.

If you'd like, I can also add this API documentation to the backend README or generate an OpenAPI spec. Which would you prefer?
