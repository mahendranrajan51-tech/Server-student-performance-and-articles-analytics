# Student Performance & Article Analytics Dashboard

A MERN mini content platform where teachers create learning articles and track student engagement, while students read articles, save highlights, and view their reading analytics.

## Stack

- MongoDB, Express.js, React.js, Node.js
- MVC-style Express structure

## Project Structure

```text
server/
  src/config/           MongoDB connection
  src/controllers/      MVC controllers
  src/middleware/       Auth and role guards
  src/models/           Mongoose models
  src/routes/           API routes
  src/seed/             Sample data
postman_collection.json API collection
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create the server environment file:

```bash
cp server/.env
```

3. Start MongoDB locally, then seed sample data(If neccessary):

```bash
npm run seed
```

Seed accounts:

- Teacher: `teacher@example.com` / `password123`
- Student: `student@example.com` / `password123`

4. Run the Server:

```bash
npm start
```

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/articles`
- `POST /api/articles` teacher only
- `GET /api/articles/:id`
- `PUT /api/articles/:id` teacher only
- `DELETE /api/articles/:id` teacher only
- `GET /api/analytics/teacher` teacher only
- `GET /api/analytics/student` student only
- `POST /api/student/highlights` student only
- `GET /api/student/highlights` student only
- `POST /api/tracking/view` student only
- `PUT /api/tracking/duration` student only

## Notes

- The JWT is never stored in local storage. It is set by the server as an `httpOnly` cookie.
- Article content blocks support `text`, `image`, `video`, and `3d` URL/embed blocks.
- Student reading duration is tracked when leaving the article page.
