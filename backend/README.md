# TripOS Backend

Production-ready Node.js/Express API for TripOS travel planning platform.

## Stack

- Node.js + Express 5
- MongoDB + Mongoose
- JWT (access + refresh)
- Helmet, CORS, rate limiting, mongo-sanitize, xss-clean
- OpenAI, Google Maps, Amadeus, Cloudinary

## Setup

1. Copy `.env.example` to `.env`
2. Fill in all required variables
3. `npm install`
4. `npm run dev`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| POST | /api/auth/refresh | Refresh token |
| POST | /api/auth/logout | Logout |
| GET | /api/users/profile | Get profile |
| PUT | /api/users/profile | Update profile |
| POST | /api/users/avatar | Upload avatar |
| PUT | /api/users/preferences | Update preferences |
| GET | /api/trips | List trips (paginated) |
| POST | /api/trips | Create trip |
| GET | /api/trips/:id | Get trip |
| PUT | /api/trips/:id | Update trip |
| DELETE | /api/trips/:id | Soft delete trip |
| POST | /api/trips/:id/itinerary | Add day |
| POST | /api/trips/:id/itinerary/:dayIndex/activities | Add activity |
| PUT | /api/trips/:id/itinerary/:dayIndex/activities/reorder | Reorder activities |
| GET | /api/expenses?trip=:id | Get expenses |
| POST | /api/expenses | Add expense |
| PUT | /api/expenses/:id | Update expense |
| DELETE | /api/expenses/:id | Delete expense |
| POST | /api/ai/generate-itinerary | Generate itinerary |
| POST | /api/ai/save-itinerary | Generate and save trip |
| POST | /api/map/locations | Add location |
| GET | /api/map/reverse-geocode | Reverse geocode |
| GET | /api/map/place/:placeId | Place details |
| GET | /api/map/trip/:tripId | Trip map data |
| GET | /api/search/flights | Flight search |
| GET | /api/search/hotels | Hotel search |

Swagger: `/api-docs`

## Docker

```bash
docker build -t tripos-backend .
docker run -p 5000:5000 --env-file .env tripos-backend
```
