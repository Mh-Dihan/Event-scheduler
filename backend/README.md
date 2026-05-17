# MeetCraft Backend

Small dependency-free Node backend for local development.

## Run

From the project root:

```powershell
npm run dev:backend
```

Or from this folder:

```powershell
npm run dev
```

## Endpoints

- `GET /api/health`
- `GET /api/profile`
- `PUT /api/profile`
- `GET /api/support-messages`
- `POST /api/support-messages`

JSON data is stored in `backend/data/`.

By default the server runs on `http://127.0.0.1:5050`.
